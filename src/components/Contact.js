import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Contact = () => {
  const formInitialDetails = {
    name: '',
    email: '',
    phone: '',
    message: ''
  }

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formDetails.name || formDetails.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formDetails.name.trim().length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formDetails.email || !emailRegex.test(formDetails.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[\d\s\+\-\(\)]{10,15}$/;
    if (!formDetails.phone || !phoneRegex.test(formDetails.phone.trim())) {
      newErrors.phone = 'Phone number must be 10-15 digits';
    }

    // Message validation
    if (!formDetails.message || formDetails.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formDetails.message.trim().length > 500) {
      newErrors.message = 'Message must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    });
    // Clear error for this field when user starts typing
    if (errors[category]) {
      setErrors({
        ...errors,
        [category]: ''
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus({ success: false, message: 'Please fix the errors above' });
      return;
    }

    setButtonText("Sending...");
    setStatus({});

    try {
      let response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formDetails),
      });

      setButtonText("Send");
      let result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        setFormDetails(formInitialDetails);
        setStatus({ success: true, message: 'Message sent successfully!' });

        // Hide success overlay after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
          setStatus({});
        }, 3000);
      } else {
        setStatus({
          success: false,
          message: result.error || 'Something went wrong, please try again later.'
        });
      }
    } catch (error) {
      setButtonText("Send");
      setStatus({
        success: false,
        message: 'Network error. Please check your connection and try again.'
      });
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us" />
              }
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""} style={{ position: 'relative' }}>
                  {/* Success Overlay */}
                  {isSuccess && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      animation: 'fadeIn 0.3s ease-in-out'
                    }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        border: '4px solid white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: 'scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        position: 'relative'
                      }}>
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ margin: '0 auto' }}
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p style={{
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginTop: '20px',
                        marginBottom: '8px'
                      }}>
                        Message Sent Successfully!
                      </p>
                      <p style={{
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: '16px'
                      }}>
                        We'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {/* Form */}
                  <h2>Get In Touch</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} className="px-1">
                        <input
                          type="text"
                          value={formDetails.name}
                          placeholder="Full Name *"
                          onChange={(e) => onFormUpdate('name', e.target.value)}
                          style={{ borderColor: errors.name ? '#dc3545' : '' }}
                        />
                        {errors.name && (
                          <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                            {errors.name}
                          </p>
                        )}
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="email"
                          value={formDetails.email}
                          placeholder="Email Address *"
                          onChange={(e) => onFormUpdate('email', e.target.value)}
                          style={{ borderColor: errors.email ? '#dc3545' : '' }}
                        />
                        {errors.email && (
                          <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                            {errors.email}
                          </p>
                        )}
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="tel"
                          value={formDetails.phone}
                          placeholder="Phone Number *"
                          onChange={(e) => onFormUpdate('phone', e.target.value)}
                          style={{ borderColor: errors.phone ? '#dc3545' : '' }}
                        />
                        {errors.phone && (
                          <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                            {errors.phone}
                          </p>
                        )}
                      </Col>
                      <Col size={12} className="px-1">
                        <textarea
                          rows="6"
                          value={formDetails.message}
                          placeholder="Short Message *"
                          onChange={(e) => onFormUpdate('message', e.target.value)}
                          style={{ borderColor: errors.message ? '#dc3545' : '' }}
                        />
                        {errors.message && (
                          <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                            {errors.message}
                          </p>
                        )}
                        <button type="submit">
                          <span>{buttonText}</span>
                        </button>
                      </Col>
                      {
                        status.message &&
                        <Col>
                          <p className={status.success === false ? "danger" : "success"}>
                            {status.message}
                          </p>
                        </Col>
                      }
                    </Row>
                  </form>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
