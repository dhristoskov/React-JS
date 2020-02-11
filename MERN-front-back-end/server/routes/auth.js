const express = require('express');
const router = require('express').Router();
const authValidation = require('../middleware/authValidation');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//User Model 
const User = require('../models/User');

router.post('/',
  [
    check('email', 'Please provide an email').isEmail().not().isEmpty().isLength({ min: 6 }),
    check('password', 'Password at least 6 character long').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      //Match password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      //Sign a jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 36000
      },
        (err, token) => {
          if (err) throw err
          res.json({ token });
        }
      )

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

  })

router.get('/', authValidation, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  };
})


module.exports = router