const User = require("../models/users");
const jwt = require("jsonwebtoken");
const lodash = require("lodash");
const hashPassword = require('../utils/hash')

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
    console.log(error);
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
module.exports = { register, defaultLogin };