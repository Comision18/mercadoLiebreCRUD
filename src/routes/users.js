// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {register, processRegister, login, processLogin} = require('../controllers/usersController');

router
    .get('/register',register)
    .post('/register', processRegister)
    .get('/login',login)
    .post('/login', processLogin)

module.exports = router;
