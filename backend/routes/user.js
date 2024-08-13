const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user");
router.post("/register", (req, res) => {
  registerUser(req, res);
});

router.post("/login", (req, res) => {
  loginUser(req, res);
});

module.exports = router;
