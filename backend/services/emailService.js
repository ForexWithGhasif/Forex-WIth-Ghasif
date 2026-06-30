const nodemailer = require('nodemailer');
const { smtp, contactEmail } = require('../config/env');

let transporter = null;

function getTransporter() {
  if (!smtp.host || !smtp.user || !smtp.pass) {
    const error = new Error('SMTP is not configured on the server.');
    error.status = 500;
    throw error;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: { user: smtp.user, pass: smtp.pass },
    });
  }

  return transporter;
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendContactEmail({ name, email, phone, topic, message }) {
  const recipient = contactEmail || smtp.user;

  const textLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    topic ? `Topic: ${topic}` : null,
    '',
    message,
  ].filter(Boolean);

  const htmlRows = [
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : '',
    topic ? `<p><strong>Topic:</strong> ${escapeHtml(topic)}</p>` : '',
    `<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>`,
  ].filter(Boolean);

  await getTransporter().sendMail({
    from: `"Forex With Ghasif Website" <${smtp.user}>`,
    to: recipient,
    replyTo: `"${name}" <${email}>`,
    subject: `New contact form enquiry — ${topic || 'General'}`,
    text: textLines.join('\n'),
    html: htmlRows.join(''),
  });
}

module.exports = { sendContactEmail };
