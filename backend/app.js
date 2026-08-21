const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { clientOrigin } = require('./config/env');
const healthRoutes = require('./routes/healthRoutes');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const marketDataRoutes = require('./routes/marketDataRoutes');
const marketHistoryRoutes = require('./routes/marketHistoryRoutes');
const economicCalendarRoutes = require('./routes/economicCalendarRoutes');
const authRoutes = require('./routes/authRoutes');
const tradeRoutes = require('./routes/tradeRoutes');
const tradingAccountRoutes = require('./routes/tradingAccountRoutes');
const tradingPlanRoutes = require('./routes/tradingPlanRoutes');

const app = express();

/* Running behind Vercel's own proxy, which sets X-Forwarded-For — without
   this, express-rate-limit can't safely trust that header and throws
   ERR_ERL_UNEXPECTED_X_FORWARDED_FOR on every request. */
app.set('trust proxy', 1);

/* credentials:true is required for the client-area session cookie to survive
   a cross-origin request (e.g. the local dev frontend on :5510 calling this
   backend on :5000) — with `origin:true` the cors package reflects back the
   request's actual Origin rather than sending a literal "*", which is what
   makes it valid to combine with credentials at all. */
app.use(cors({ origin: clientOrigin === '*' ? true : clientOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/health', healthRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/market-prices', marketDataRoutes);
app.use('/api/market-history', marketHistoryRoutes);
app.use('/api/economic-calendar', economicCalendarRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/trading-accounts', tradingAccountRoutes);
app.use('/api/trading-plans', tradingPlanRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error' });
});

module.exports = app;
