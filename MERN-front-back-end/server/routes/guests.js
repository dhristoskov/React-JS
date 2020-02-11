const express = require('express')
const authValidation = require('../middleware/authValidation');
const { check, validationResult } = require('express-validator');

const router = require('express').Router();

const Guest = require('../models/Guests');

router.get('/', authValidation, async (req, res) => {
  try {
    const guests = await Guest.find({ user: req.user.id })
    res.json(guests)
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

router.post('/',
  [
    authValidation,
    [
      check('first_name', 'Please provide a name').not().isEmpty().isLength({ min: 4 }),
      check('last_name', 'Please provide a name').not().isEmpty().isLength({ min: 4 }),
      check('email', 'Please provide an email').not().isEmpty().isEmail().isLength({ min: 8 }),
      check('phone', 'Please provide the phone').not().isEmpty().isLength({ min: 6 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { first_name, last_name, email, phone, diet, isconfirmed } = req.body

    try {
      const newGuest = new Guest({
        user: req.user.id,
        first_name,
        last_name,
        email,
        phone,
        diet,
        isconfirmed
      })
      const guest = await newGuest.save()

      res.json(guest)

    } catch (err) {
      res.status(500).send('server error')
    }
  })

router.put('/:id', authValidation, async (req, res) => {
  const { first_name, last_name, email, phone, diet, isconfirmed} = req.body

  const guestFields = { first_name, last_name, email, phone, diet, isconfirmed };

  try {
    let guest = await Guest.findById(req.params.id)
    if (!guest) return res.status(404).json({ msg: 'Guest not found' })

    if (guest.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorised' })
    }
    guest = await Guest.findByIdAndUpdate(req.params.id, { $set: guestFields }, { new: true })
    res.send(guest)
  } catch (err) {
    console.errors(err.message)
    res.status(500).send('Server Error')
  }
})

router.delete('/:id', authValidation, async (req, res) => {
  try {
    let guest = await Guest.findById(req.params.id)
    if (!guest) return res.status(404).json({ msg: 'Guest not found' })

    if (guest.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorised' })
    }
    await Guest.findByIdAndRemove(req.params.id)
    res.send('Guest Removed successfully')
  } catch (err) {
    console.errors(err.message).json('Server Error')
  }
})

module.exports = router