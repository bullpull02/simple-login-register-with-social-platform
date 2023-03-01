const User = require("../models/users");
const jwt = require("jsonwebtoken");
const lodash = require("lodash");
const hashPassword = require("../utils/hash");
const passport = require('passport');
const responseModify = require("../utils/response");
const { google, discord } = require("../config/cred");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const DiscordStrategy = require('passport-discord').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: google.client_id,
      clientSecret: google.client_secret,
      callbackURL: google.callback_url,
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
passport.use(new DiscordStrategy({
    clientID: discord.client_id,
    clientSecret: discord.client_secret,
    callbackURL: discord.callback_url,
    scope: ['identify', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Find or create the user based on their Discord ID
        const existingUser = await User.findOne({ _id: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        } else {
            const newUser = new User({
                _id: profile.id,
                name: profile.username,
                email: profile.email
            });
            const savedUser = await newUser.save();
            return done(null, savedUser);
        }
    } catch (error) {
        return done(error);
    }
}));
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
