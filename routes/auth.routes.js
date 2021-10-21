const { Router } = require('express');
const router = require("express").Router();
const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

router.get("/signup", (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  // console.log("The form data: ", req.body);
 
  const { username, email, password } = req.body;
 
  bcryptjs
    .genSalt(saltRounds)
    .then(salt => {
        return bcryptjs.hash(password, salt)
    })
    .then(hashedPassword => {
        return User.create({
            username,
            email,
            passwordHash: hashedPassword
        });
    })
    .then(() => {
        res.redirect('/userProfile');
    })
    .catch(error => next(error));
});

router.get('/userProfile', (req, res) => res.render('users/user-profile'));

module.exports = router;
