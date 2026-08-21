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
  isProduction: process.env.NODE_ENV === 'production',
  /* Accept whichever name the provider auto-injects: Vercel Postgres sets
     POSTGRES_URL (or POSTGRES_URL_NON_POOLING); a manually-set DATABASE_URL
     (Neon, Supabase, etc.) still takes priority if present. */
  databaseUrl: process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING,
  jwtSecret: process.env.JWT_SECRET,
};
