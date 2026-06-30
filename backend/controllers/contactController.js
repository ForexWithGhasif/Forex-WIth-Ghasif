const contactService = require('../services/contactService');

async function postContact(req, res, next) {
  try {
    const result = await contactService.submitContactMessage(req.body);
    res.status(200).json({
      success: true,
      message: "Thanks, we'll get back to you within one business day.",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { postContact };
