const express = require("express");
const router = express.Router();
const { verifyEmail, check } = require("../controllers/email");

router.get("/verify-email", (req, res) => {
  verifyEmail(req, res);
});

module.exports = router;
