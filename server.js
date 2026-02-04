require('dotenv').config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const { google } = require('googleapis');

// Server used to send emails
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

// Email transporter configuration
const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log("Email configuration error:", error);
  } else {
    console.log("✓ Email service ready");
  }
});

// Google Sheets configuration
let sheetsAuth = null;
let sheets = null;

if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
  try {
    sheetsAuth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    sheets = google.sheets({ version: 'v4', auth: sheetsAuth });
    console.log("✓ Google Sheets service ready");
  } catch (error) {
    console.log("Google Sheets configuration error:", error.message);
  }
} else {
  console.log("⚠ Google Sheets not configured (missing environment variables)");
}

// Helper function to log to Google Sheets
async function logToGoogleSheets(name, email, phone, message) {
  if (!sheets || !process.env.GOOGLE_SHEET_ID) {
    console.log("Skipping Google Sheets logging (not configured)");
    return { success: false, error: "Not configured" };
  }

  try {
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
    console.log("✓ Logged to Google Sheets");
    return { success: true };
  } catch (error) {
    console.error("Google Sheets logging error:", error.message);
    return { success: false, error: error.message };
  }
}

// Contact form route
router.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

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

  // Send email
  const mail = {
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
  };

  try {
    await contactEmail.sendMail(mail);
    emailSuccess = true;
    console.log("✓ Email sent successfully");
  } catch (error) {
    emailError = error.message;
    console.error("Email sending error:", error.message);
  }

  // Log to Google Sheets
  const sheetsResult = await logToGoogleSheets(name, email, phone, message);
  sheetsSuccess = sheetsResult.success;
  sheetsError = sheetsResult.error;

  // Determine response
  if (emailSuccess || sheetsSuccess) {
    // At least one succeeded
    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully!',
      details: {
        email: emailSuccess,
        sheets: sheetsSuccess
      }
    });
  } else {
    // Both failed
    return res.status(500).json({
      success: false,
      error: 'Failed to process form. Please try again later.',
      details: {
        emailError,
        sheetsError
      }
    });
  }
});
