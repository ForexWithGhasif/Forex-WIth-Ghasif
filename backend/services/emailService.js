const { resend, contactEmail } = require('../config/env');

/* Resend's HTTP API (plain fetch, no SDK) instead of SMTP — Vercel's
   serverless functions don't reliably support raw SMTP socket connections,
   which is why the previous nodemailer/Gmail setup worked locally but
   failed in production. An HTTPS API call has no such issue. */

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendViaResend({ replyTo, subject, text, html }) {
  if (!resend.apiKey) {
    const error = new Error('Email sending is not configured on the server.');
    error.status = 500;
    throw error;
  }
  if (!contactEmail) {
    const error = new Error('No destination contact email is configured on the server.');
    error.status = 500;
    throw error;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resend.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Forex With Ghasif Website <${resend.from}>`,
      to: contactEmail,
      reply_to: replyTo,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('Resend API error:', res.status, detail);
    const error = new Error('Failed to send email.');
    error.status = 502;
    throw error;
  }
}

async function sendContactEmail({ name, email, phone, topic, message }) {
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

  await sendViaResend({
    replyTo: `${name} <${email}>`,
    subject: `New contact form enquiry — ${topic || 'General'}`,
    text: textLines.join('\n'),
    html: htmlRows.join(''),
  });
}

async function sendNewsletterSubscription({ email }) {
  await sendViaResend({
    replyTo: email,
    subject: 'New newsletter subscriber',
    text: `New newsletter subscription request:\nEmail: ${email}`,
    html: `<p><strong>New newsletter subscription request</strong></p><p>Email: ${escapeHtml(email)}</p>`,
  });
}

module.exports = { sendContactEmail, sendNewsletterSubscription };
