const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asycnHandler = require("express-async-handler");

const registerUser = asycnHandler(async (req, res) => {
  const { firstname, lastname, email, password, emailVerified, image } =
    req.body;
  try {
    const presetuser = await User.findOne({ email: email });
    const user = {
      firstname,
      lastname,
      email,
      password,
      image,
    };
    if (presetuser)
      res.send({ error_message: "User already exist with this Email" });
    else {
      const newUser = await User.create(user);
      //   if (newUser) {
      //     const token = await Prisma.token.create({
      //       data: {
      //         token: crypto.randomBytes(20).toString("hex"),
      //         userId: newUser.id,
      //       },
      //     });
      //     mailer(
      //       newUser.email,
      //       `${process.env.EMAIL_VERIFICATION_URL}?token=${token.token}&id=${newUser.id}`
      //     );

      //   }
      res.send({
        newuser: {
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email,
          image: newUser.image,
          JwtToken: jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET),
        },

        message: "User registered successfully",
      });
    }
  } catch (err) {
    console.log("error", err);
    res.send({ err: err });
  }
});
const loginUser = asycnHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    console.log("user", user);
    if (!user) res.send({ error_message: "User not found" });
    // else if (!user.emailVerified)
    //   res.send({ error_message: "Please verify your email For login" });
    else {
      if (user && !(await user.matchPassword(password))) {
        res.send({ error_message: "Invalid password" });
      } else {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        console.log("token", token, "userid", user._id);
        const update_user = await User.findOneAndUpdate(
          { email: email },
          { jwtToken: token },
          { new: true }
        );

        res.send({ message: "User found", user: update_user });
      }
    }
  } catch (err) {
    console.log("error", err);
    res.send({ err: err });
  }
});

module.exports = { registerUser, loginUser };
