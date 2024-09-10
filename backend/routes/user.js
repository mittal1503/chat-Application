const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user");
const {authenticate} = require("../middlware/authMiddleware")

router.post("/register", registerUser);
router.post("/login",loginUser);

module.exports = router;
