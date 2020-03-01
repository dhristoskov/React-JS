const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

//user Model 
const User = require('../models/User');
require('dotenv').config();

router.post('/',
  [
    check('name', 'Моля въведете име').not().isEmpty().isLength({ min: 4 }),
    check('email', 'Моля въведете адрес на ел. поща').isEmail().not().isEmpty().isLength({ min: 6 }),
    check('password', 'Моля въведете парола мин. 6 символа').isLength({ min: 6 })

  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      //Check if this user already exits
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ error: [{ msg: 'Потребителят вече съществува' }] })
      }
      user = new User({
        name,
        email,
        password
      })

      //Password encryption
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

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
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  })

module.exports = router
