const express = require('express');
const { register, defaultLogin } = require('../controllers/userController');
const user = express.Router();
user.post('/signup',register);
user.post('/login',defaultLogin);
module.exports = user;