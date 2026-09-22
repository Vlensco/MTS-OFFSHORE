'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          service_interest: 'General Contact Inquiry',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Submission failed:', err);
      setErrorMessage(
        err.message || 'An unexpected error occurred. Please try again or email us directly at contact@mtsoffshore.com.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Contact Hero Banner */}
      <section className="contact-page-hero">
        <div className="w-layout-blockcontainer container-one w-container">
          <div className="contact-hero-tag">GET IN TOUCH</div>
          <h1 className="contact-hero-title">Contact Us</h1>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main-section">
        <div className="w-layout-blockcontainer container-one w-container">
          <div className="contact-grid-layout">
            {/* Left Column: Office Locations & Contact Info */}
            <div className="contact-info-col">
              <div className="contact-info-tag">MTS OFFSHORE GROUP</div>
              <h2 className="contact-info-heading">
                MTS OFFSHORE Group Offers Offshore Construction Services Worldwide.
              </h2>
              <p className="contact-info-desc">
                See below our head office locations and other locations part of the MTS OFFSHORE Group.
              </p>

              {/* Office 1: Singapore */}
              <div className="contact-location-item">
                <div className="contact-icon-wrap">
                  <img
                    src="/assets/img/65d4023f0fe16f42cb1838ce_Location_Icons.svg"
                    alt="Location Pin"
                  />
                </div>
                <div>
                  <div className="contact-loc-title">Head Office - Singapore</div>
                  <div className="contact-loc-company">MTS OFFSHORE GROUP PTE LTD</div>
                  <div className="contact-loc-address">
                    51 Goldhill Plaza<br />
                    #22-03<br />
                    Singapore 308900
                  </div>
                </div>
              </div>

              {/* Office 2: Papua New Guinea */}
              <div className="contact-location-item">
                <div className="contact-icon-wrap">
                  <img
                    src="/assets/img/65d4023f0fe16f42cb1838ce_Location_Icons.svg"
                    alt="Location Pin"
                  />
                </div>
                <div>
                  <div className="contact-loc-title">Papua New Guinea</div>
                  <div className="contact-loc-company">MTS OFFSHORE PNG LIMITED</div>
                  <div className="contact-loc-address">
                    L5, MRDC Haus,<br />
                    Cnr of Musgrave Street &amp; Champion Parade<br />
                    Port Moresby, NCD 121<br />
                    Papua New Guinea
                  </div>
                </div>
              </div>

              {/* Contact Item 3: Email */}
              <div className="contact-location-item">
                <div className="contact-icon-wrap">
                  <img
                    src="/assets/img/65d4023f0fe16f42cb1838d0_Main_Icons.svg"
                    alt="Mail Icon"
                  />
                </div>
                <div>
                  <div className="contact-loc-title">Have a project in mind? Send a message.</div>
                  <a href="mailto:contact@mtsoffshore.com" className="contact-mail-link">
                    contact@mtsoffshore.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form with Decorative Offset Frame */}
            <div className="contact-form-wrapper">
              <div className="contact-form-accent-bg"></div>

              <div className="contact-form-card">
                <h3 className="contact-card-title">Contact Us</h3>
                <p className="contact-privacy-text">
                  We’re committed to protecting and respecting your privacy. From time to time, we would like to contact you about our products and services, if you consent. In order to provide you the content requested, we need to store and process your personal data.
                </p>

                {submitted ? (
                  <div className="contact-success-box">
                    <div className="contact-success-icon">✓</div>
                    <h4 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.35rem', color: '#0c3247', marginBottom: '10px' }}>
                      Message Sent Successfully
                    </h4>
                    <p style={{ color: '#64748b', fontSize: '0.94rem', lineHeight: '1.6', marginBottom: '24px' }}>
                      Thank you for contacting MTS OFFSHORE. Your inquiry has been received and our commercial engineering desk will reach out to you promptly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          message: '',
                        });
                      }}
                      className="contact-submit-btn"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form-element">
                    {errorMessage && (
                      <div
                        style={{
                          padding: '12px 16px',
                          backgroundColor: '#fef2f2',
                          border: '1px solid #fecaca',
                          color: '#b91c1c',
                          borderRadius: '4px',
                          fontSize: '0.88rem',
                          marginBottom: '18px',
                        }}
                      >
                        {errorMessage}
                      </div>
                    )}

                    {/* Row 1: Full Name & Email */}
                    <div className="contact-form-row">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                        className="contact-input-field"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        required
                        className="contact-input-field"
                      />
                    </div>

                    {/* Row 2: Phone & Company */}
                    <div className="contact-form-row">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone No (inc. Country Code)"
                        className="contact-input-field"
                      />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company"
                        className="contact-input-field"
                      />
                    </div>

                    {/* Row 3: Message */}
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message"
                      required
                      className="contact-textarea-field"
                    ></textarea>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="contact-submit-btn"
                    >
                      {loading ? 'Sending Message...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
