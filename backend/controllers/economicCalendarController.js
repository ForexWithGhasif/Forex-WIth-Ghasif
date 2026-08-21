const { getLiveEconomicCalendar } = require('../services/economicCalendarService');

async function getEconomicCalendar(req, res, next) {
  try {
    const { events, source, fetchedAt } = await getLiveEconomicCalendar();
    res.status(200).json({ success: true, data: events, source, fetchedAt });
  } catch (err) {
    next(err);
  }
}

module.exports = { getEconomicCalendar };
