const nodemailer = require('nodemailer');

const isPlaceholder = (value = '') => {
  const v = String(value).toLowerCase();
  return (
    !v ||
    v.includes('your-smtp-user') ||
    v.includes('your-mailtrap-username') ||
    v.includes('your-smtp-password') ||
    v.includes('your-mailtrap-password') ||
    v.includes('changeme')
  );
};

const emailEnabled = () =>
  !isPlaceholder(process.env.SMTP_USER) &&
  !isPlaceholder(process.env.SMTP_PASS) &&
  !isPlaceholder(process.env.SMTP_HOST);

const getFromAddress = () => {
  const fromEmail = process.env.FROM_EMAIL || 'noreply@detailingwebstudio.com';
  const fromName = process.env.FROM_NAME || 'Detailing Web Studio';
  return `"${fromName}" <${fromEmail}>`;
};

const getAdminRecipient = () =>
  process.env.LEAD_NOTIFY_EMAIL || process.env.ADMIN_EMAIL || 'admin@detailingwebstudio.com';

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    requireTLS: String(process.env.SMTP_REQUIRE_TLS || 'true') === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const sendLeadNotification = async (lead) => {
  if (!emailEnabled()) {
    console.log('Lead submitted (email not configured):', lead.email);
    return;
  }

  const transporter = createTransporter();

  const mailOptions = {
    from: getFromAddress(),
    to: getAdminRecipient(),
    subject: `New Demo Lead: ${lead.name} - ${lead.businessName || 'No Business Name'}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #0b1322; color: #eef4ff; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #0f1b30; border-radius: 12px; padding: 30px; }
          h1 { color: #3ca8ff; margin-bottom: 20px; }
          .field { margin-bottom: 15px; }
          .label { color: #9cafcc; font-size: 12px; text-transform: uppercase; }
          .value { font-size: 16px; margin-top: 4px; }
          .badge { display: inline-block; background: #3ca8ff; color: #051220; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>New Demo Lead</h1>
          <div class="field"><div class="label">Name</div><div class="value">${escapeHtml(lead.name)}</div></div>
          <div class="field"><div class="label">Business</div><div class="value">${escapeHtml(lead.businessName || 'Not provided')}</div></div>
          <div class="field"><div class="label">Email</div><div class="value">${escapeHtml(lead.email)}</div></div>
          <div class="field"><div class="label">Phone</div><div class="value">${escapeHtml(lead.phone || 'Not provided')}</div></div>
          <div class="field"><div class="label">Website</div><div class="value">${escapeHtml(lead.website || 'Not provided')}</div></div>
          <div class="field"><div class="label">Preferred Package</div><div class="value">${escapeHtml(lead.preferredPackage || 'Not specified')}</div></div>
          <div class="field"><div class="label">Revenue Range</div><div class="value">${escapeHtml(lead.revenue || 'Not specified')}</div></div>
          <div class="field"><div class="label">Services</div><div class="value">${escapeHtml(lead.services || 'Not provided')}</div></div>
          <div class="field"><div class="label">Goal</div><div class="value">${escapeHtml(lead.goal || 'Not provided')}</div></div>
          <div class="field"><div class="label">Budget</div><div class="value">${escapeHtml(lead.budget || 'Not specified')}</div></div>
          <div class="field"><div class="label">Requested Scheduling Link</div><div class="value">${lead.scheduleCall ? 'Yes' : 'No'}</div></div>
          <div class="field"><div class="label">Source</div><div class="value"><span class="badge">${escapeHtml(lead.source)}</span></div></div>
        </div>
      </body>
      </html>
    `
  };

  await transporter.sendMail(mailOptions);
};

const sendConfirmationEmail = async (lead) => {
  if (!emailEnabled()) return;

  const transporter = createTransporter();

  const mailOptions = {
    from: getFromAddress(),
    to: lead.email,
    subject: 'Thank you for your interest - Detailing Web Studio',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #0b1322; color: #eef4ff; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #0f1b30; border-radius: 12px; padding: 30px; }
          h1 { color: #3ca8ff; }
          .btn { display: inline-block; background: linear-gradient(135deg, #3ca8ff, #7f8bff); color: #051220; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-weight: bold; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Thank you, ${escapeHtml(lead.name)}!</h1>
          <p>We've received your inquiry and our team is reviewing your details.</p>
          <p>We'll be in touch within 24-48 business hours to discuss your project.</p>
          <a href="${process.env.CALENDLY_URL || '#'}" class="btn">Schedule a Call</a>
          <p style="margin-top: 30px; color: #9cafcc; font-size: 14px;">
            Best regards,<br>
            The Detailing Web Studio Team
          </p>
        </div>
      </body>
      </html>
    `
  };

  await transporter.sendMail(mailOptions);
};

const sendContactNotification = async (data) => {
  if (!emailEnabled()) {
    console.log('Contact form submitted (email not configured):', data.email);
    return;
  }

  const transporter = createTransporter();

  const mailOptions = {
    from: getFromAddress(),
    to: getAdminRecipient(),
    subject: `New Contact: ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone || 'Not provided')}</p>
      <p><strong>Business:</strong> ${escapeHtml(data.business_name || 'Not provided')}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message)}</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

const sendAutoResponse = async ({ name, email }) => {
  if (!emailEnabled()) return;

  const transporter = createTransporter();

  const mailOptions = {
    from: getFromAddress(),
    to: email,
    subject: 'We received your message - Detailing Web Studio',
    html: `
      <h2>Hi ${escapeHtml(name)}!</h2>
      <p>Thank you for reaching out. We've received your message and will get back to you within 24-48 hours.</p>
      <p>In the meantime, feel free to check out our portfolio and recent work examples.</p>
      <p>Best regards,<br>Detailing Web Studio</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendLeadNotification,
  sendConfirmationEmail,
  sendContactNotification,
  sendAutoResponse
};