const newsletterService = require('../services/newsletterService');

async function postNewsletter(req, res, next) {
  try {
    const result = await newsletterService.subscribeToNewsletter(req.body);
    res.status(200).json({
      success: true,
      message: "You're subscribed. Welcome aboard.",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { postNewsletter };
