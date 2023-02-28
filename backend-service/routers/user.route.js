const express = require('express');
const { register, defaultLogin, googleLogin, googleCallback } = require('../controllers/userController');
const user = express.Router();
user.post('v1/user/signup',register);
user.post('v1/user/login',defaultLogin);
user.get('/google/login',googleLogin);
user.get('/google/callback',googleCallback)
user.gte
module.exports = user;