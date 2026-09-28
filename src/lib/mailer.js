import nodemailer from 'nodemailer';

/**
 * Send contact inquiry notification to enquiries@mtsoffshore.com
 */
export async function sendContactNotification({
  name,
  email,
  phone,
  company,
  service_interest,
  message,
}) {
  const host = process.env.SMTP_HOST || 'smtp.office365.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const receiver = process.env.CONTACT_RECEIVER_EMAIL || 'enquiries@mtsoffshore.com';

  if (!user || !pass) {
    console.warn(
      '⚠️ SMTP credentials (SMTP_USER / SMTP_PASS) not configured. Inquiry saved to DB only.'
    );
    return { sent: false, reason: 'smtp_not_configured' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for 587 (STARTTLS)
      auth: {
        user,
        pass,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
      },
    });

    const subject = `[New Website Inquiry] ${service_interest || 'General Inquiry'} - ${name}`;

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); }
        .header { background: #002b49; padding: 24px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 20px; letter-spacing: 1px; font-weight: 700; }
        .header p { margin: 6px 0 0; font-size: 13px; color: #72c0ec; }
        .content { padding: 28px; }
        .badge { display: inline-block; background: #e8f4fc; color: #0072ce; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 20px; }
        .field { margin-bottom: 16px; border-bottom: 1px solid #f0f2f5; padding-bottom: 12px; }
        .field:last-child { border-bottom: none; }
        .label { font-size: 11px; text-transform: uppercase; color: #8898aa; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 4px; }
        .value { font-size: 15px; color: #1e293b; font-weight: 500; }
        .value a { color: #0072ce; text-decoration: none; }
        .message-box { background: #f8fafc; border-left: 4px solid #0072ce; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #334155; margin-top: 8px; white-space: pre-wrap; }
        .footer { background: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>MTS OFFSHORE GROUP</h1>
          <p>Website Contact Us Notification</p>
        </div>
        <div class="content">
          <div class="badge">${service_interest || 'General Inquiry'}</div>

          <div class="field">
            <div class="label">Full Name</div>
            <div class="value">${name}</div>
          </div>

          <div class="field">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${email}">${email}</a></div>
          </div>

          ${
            phone
              ? `
          <div class="field">
            <div class="label">Phone / WhatsApp</div>
            <div class="value"><a href="tel:${phone}">${phone}</a></div>
          </div>
          `
              : ''
          }

          ${
            company
              ? `
          <div class="field">
            <div class="label">Company / Organization</div>
            <div class="value">${company}</div>
          </div>
          `
              : ''
          }

          <div class="field">
            <div class="label">Message / Project Scope</div>
            <div class="message-box">${message}</div>
          </div>
        </div>
        <div class="footer">
          This message was sent from the official MTS OFFSHORE contact form.<br>
          Direct reply to this email will respond directly to <strong>${email}</strong>.
        </div>
      </div>
    </body>
    </html>
    `;

    const info = await transporter.sendMail({
      from: `"MTS Offshore Inquiries" <${user}>`,
      to: receiver,
      replyTo: email,
      subject,
      text: `New Inquiry from ${name} (${email}, Company: ${company || 'N/A'}, Phone: ${phone || 'N/A'}):\n\nService: ${service_interest}\n\nMessage:\n${message}`,
      html: htmlContent,
    });

    console.log('✅ Contact inquiry email sent successfully:', info.messageId);
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error('❌ Failed to send contact inquiry email:', err.message);
    return { sent: false, error: err.message };
  }
}
