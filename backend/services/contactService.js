const { sendContactEmail } = require('./emailService');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const stripNewlines = (value = '') => String(value).replace(/[\r\n]+/g, ' ').trim();

function validate({ name, email, message }) {
  const errors = [];

  if (!name || !stripNewlines(name)) errors.push('Name is required.');
  else if (name.length > 200) errors.push('Name is too long.');

  if (!email || !EMAIL_RE.test(stripNewlines(email))) errors.push('A valid email is required.');

  if (!message || !message.trim()) errors.push('Message is required.');
  else if (message.length > 5000) errors.push('Message is too long.');

  return errors;
}

async function submitContactMessage(body = {}) {
  const { name, email, phone, topic, message } = body;
  const errors = validate({ name, email, message });

  if (errors.length) {
    const error = new Error(errors.join(' '));
    error.status = 400;
    throw error;
  }

  const payload = {
    name: stripNewlines(name),
    email: stripNewlines(email),
    phone: phone ? stripNewlines(phone) : '',
    topic: topic ? stripNewlines(topic) : '',
    message: message.trim(),
  };

  try {
    await sendContactEmail(payload);
  } catch (err) {
    const error = new Error('Failed to send your message. Please try again later.');
    error.status = 502;
    error.cause = err;
    throw error;
  }

  return { name: payload.name, email: payload.email, receivedAt: new Date().toISOString() };
}

module.exports = { submitContactMessage };
