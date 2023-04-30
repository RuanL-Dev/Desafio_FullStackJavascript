const Joi = require("joi");
var createError = require("http-errors");

const paymentSchema = Joi.object({
  name: Joi.string().min(3).max(200).required(),
  cardNumber: Joi.string().creditCard().required(),
  currency: Joi.string().valid("BRL", "EUR", "GBP", "USD").required(),
  amount: Joi.number().positive().required(),
});

function createBadRequestError(joiErrors) {
  return createError(400, extractJoiErrorMessages(joiErrors));
}

function extractJoiErrorMessages(joiErrors) {
  return joiErrors.details.map((detail) => detail.message).join("; ");
}

module.exports = { paymentSchema, createBadRequestError };
