const express = require("express");
const passport = require("passport");
const {
  register,
  defaultLogin
} = require("../controllers/userController");
const user = express.Router();
user.post("/signup", register);
user.post("/login", defaultLogin);
user.get(
  "/auth/google/login",
  passport.authenticate("google", { scope: ["email", "profile", "openid"] })
);
user.get(
  "/sessions/oauth/google",
  passport.authenticate("google", { failureRedirect: "/auth/google/login" }),
  function (req, res) {
    res.redirect("/");
  }
);
module.exports = user;
