const express = require("express");
const { paymentSchema, createBadRequestError } = require("./validators");
const router = express.Router();

const PAYMENT_API_KEY = process.env.PAYMENT_API_KEY;
const PAYMENT_API_PORT = process.env.PAYMENT_API_PORT || 3002;

router.get("/", function (req, res) {
  res.send({ service: "backend:api", ok: true });
});

router.get("/payments", function (req, res) {
  fetch(`http://localhost:${PAYMENT_API_PORT}/api/payments`, {
    headers: {
      "X-API-Key": PAYMENT_API_KEY,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/payments", function (req, res, next) {
  const { error } = paymentSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return next(createBadRequestError(error));
  }

  fetch(`http://localhost:${PAYMENT_API_PORT}/api/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": PAYMENT_API_KEY,
    },
    body: JSON.stringify(req.body),
  })
    .then((response) => response.json())
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
