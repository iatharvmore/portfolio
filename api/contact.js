import nodemailer from "nodemailer";
import { google } from 'googleapis';

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle OPTIONS for CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
    }

    // Parse body
    let body = {};
    try {
        if (typeof req.body === 'string') {
            body = JSON.parse(req.body);
        } else if (req.body && typeof req.body === 'object') {
            body = req.body;
        }
    } catch (e) {
        return res.status(400).json({
            success: false,
            error: 'Invalid JSON body'
        });
    }

    const { name, email, phone, message } = body;

    // Server-side validation
    if (!name || !email || !phone || !message) {
        return res.status(400).json({
            success: false,
            error: 'All fields are required'
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid email address'
        });
    }

    // Validate name length
    if (name.trim().length < 2 || name.trim().length > 100) {
        return res.status(400).json({
            success: false,
            error: 'Name must be between 2 and 100 characters'
        });
    }

    // Validate message length
    if (message.trim().length < 10 || message.trim().length > 500) {
        return res.status(400).json({
            success: false,
            error: 'Message must be between 10 and 500 characters'
        });
    }

    let emailSuccess = false;
    let sheetsSuccess = false;
    let emailError = null;
    let sheetsError = null;

    // Send Email
    if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
                subject: `New Contact Form Submission - ${name}`,
                html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333; border-bottom: 3px solid #667eea; padding-bottom: 10px;">New Contact Form Submission</h2>
              <div style="margin: 20px 0;">
                <p style="margin: 10px 0;"><strong style="color: #667eea;">Name:</strong> ${name}</p>
                <p style="margin: 10px 0;"><strong style="color: #667eea;">Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p style="margin: 10px 0;"><strong style="color: #667eea;">Phone:</strong> ${phone}</p>
                <p style="margin: 10px 0;"><strong style="color: #667eea;">Message:</strong></p>
                <div style="background-color: #f8f8f8; padding: 15px; border-left: 4px solid #667eea; margin-top: 10px; white-space: pre-wrap;">${message}</div>
              </div>
              <p style="margin-top: 30px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 15px;">
                Received at: ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        `,
            });
            emailSuccess = true;
            console.log("✓ Email sent successfully");
        } catch (error) {
            emailError = error.message;
            console.error("Email error:", error.message);
        }
    }

    // Log to Google Sheets
    if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
        try {
            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: process.env.GOOGLE_CLIENT_EMAIL,
                    // Vercel stores env vars with literal \n, convert to actual newlines
                    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });

            const sheets = google.sheets({ version: 'v4', auth });

            await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.GOOGLE_SHEET_ID,
                range: 'Sheet1!A:E',
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: [[
                        new Date().toISOString(),
                        name,
                        email,
                        phone,
                        message
                    ]],
                },
            });
            sheetsSuccess = true;
            console.log("✓ Logged to Google Sheets");
        } catch (error) {
            sheetsError = error.message;
            console.error("Sheets error:", error.message);
        }
    }

    // Determine response
    if (emailSuccess || sheetsSuccess) {
        return res.status(200).json({
            success: true,
            message: 'Form submitted successfully!',
            details: {
                email: emailSuccess,
                sheets: sheetsSuccess
            }
        });
    } else {
        return res.status(500).json({
            success: false,
            error: 'Failed to process form. Please try again later.',
            details: {
                emailError,
                sheetsError
            }
        });
    }
}
