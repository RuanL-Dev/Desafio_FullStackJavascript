var express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.send({ service: "backend", ok: true });
});

module.exports = router;
