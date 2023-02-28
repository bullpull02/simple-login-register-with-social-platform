const User = require("../models/users");
const jwt = require("jsonwebtoken");
const lodash = require("lodash");
const hashPassword = require("../utils/hash");

const { OAuth2Client } = require("google-auth-library");
const uuid = require("uuid");
const client = new OAuth2Client("your-client-id");
const redirectUri = "http://localhost:8000/google/callback";
const register = async (req, res) => {
  try {
    const userEach = await User.findOne({ email: req.body.email });
    if (userEach) {
      return res.json({ status: "NOT found", message: "user already exists" });
    } else {
      const user = await new User(
        lodash.pick(req.body, ["name", "email", "password", "pic"])
      );
      let hashedpass = await hashPassword(user.password);
      user.password = hashedpass;
      const finalUser = await user.save();
      res.json({ success: "ok", user: finalUser });
    }
  } catch (error) {
    return error;
  }
};

const defaultLogin = async (req, res) => {
  const retrieved_user = await User.findOne({
    newemail: req.body.email,
    newPass: req.body.password,
  });
  if (retrieved_user) {
    const token = jwt.sign(
      {
        name: retrieved_user.name,
        email: retrieved_user.newemail,
      },
      process.env.secret_key_administration
    );
    return res.json({
      status: "ok",
      token: token,
      user: retrieved_user,
    });
  } else {
    return res.json({ status: "error", retrieved_user: false });
  }
};
const googleLogin = async () => {
  const state = uuid.v4();
  const url = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: "email profile openid",
    state,
    redirect_uri: redirectUri,
  });

  res.redirect(url);
};
const googleCallback = async () => {
  const { code, state } = req.query;
  const { tokens } = await client.getToken(code);

  // Verify the state to prevent CSRF attacks
  if (state !== req.session.state) {
    res.status(401).send("Invalid state parameter");
    return;
  }
  req.session.tokens = tokens;
};
module.exports = { register, defaultLogin , googleLogin,googleCallback};
