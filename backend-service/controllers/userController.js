const User = require("../models/users");
const jwt = require("jsonwebtoken");
const lodash = require("lodash");
const hashPassword = require("../utils/hash");
const passport = require('passport');
const responseModify = require("../utils/response");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: "42056636488-5pcnca03i14e5s0747qfqjbiddluf1ng.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/api/v1/user/sessions/oauth/google",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const user = await User.findById(profile.id);
        if (user) {
          return cb(null, user);
        } else {
          const new_user = new User({
            _id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          const save_user = await new_user.save();
          return cb(null, save_user);
        }
      } catch (error) {
        console.log(error);
        return cb(null, error);
      }
    }
  )
);
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

module.exports = {
  register,
  defaultLogin
};
