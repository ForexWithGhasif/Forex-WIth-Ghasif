const { sendNewsletterSubscription } = require('./emailService');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const stripNewlines = (value = '') => String(value).replace(/[\r\n]+/g, ' ').trim();

async function subscribeToNewsletter(body = {}) {
  const email = stripNewlines(body.email);

  if (!email || !EMAIL_RE.test(email)) {
    const error = new Error('A valid email is required.');
    error.status = 400;
    throw error;
  }

  try {
    await sendNewsletterSubscription({ email });
  } catch (err) {
    const error = new Error('Failed to subscribe. Please try again later.');
    error.status = 502;
    error.cause = err;
    throw error;
  }

  return { email };
}

module.exports = { subscribeToNewsletter };
