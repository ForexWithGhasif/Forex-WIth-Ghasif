require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || '*',
  resend: {
    apiKey: process.env.RESEND_API_KEY,
    /* Resend's own sandbox sender — works without verifying a domain first.
       Once a domain is verified on Resend, point this at an address on it
       (e.g. contact@yourdomain.com) via the env var, no code change needed. */
    from: process.env.RESEND_FROM || 'onboarding@resend.dev',
  },
  contactEmail: process.env.CONTACT_EMAIL,
};
