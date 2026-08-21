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
  /* Accept whichever name the provider auto-injects. A manually-set
     DATABASE_URL takes priority; otherwise check the Vercel Postgres names
     (POSTGRES_URL / POSTGRES_URL_NON_POOLING) and the Supabase-via-Vercel
     integration's names once its custom prefix ("DATABASE") is applied to
     every variable it creates, giving DATABASE_POSTGRES_URL. */
  databaseUrl:
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_POSTGRES_URL ||
    process.env.DATABASE_POSTGRES_URL_NON_POOLING,
  jwtSecret: process.env.JWT_SECRET,
};
