const express = require('express');
const auth = require('../middleware/authValidation');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const Guest = require('../models/Guests');

router.get('/', auth, async (req, res) => {
  try {
    const guests = await Guest.find({ user: req.user.id })
    res.json(guests)
  } catch (err) {
    console.err(err.message)
    res.status(500).send('Server Error')
  }
})

router.post('/',
  [
    auth,
    [
      check('name', 'Please provide the name').not().isEmpty(),
      check('secondName', 'Please provide the Last Name').not().isEmpty(),
      check('phone', 'Please provide the phone').not().isEmpty().isNumeric(),
      check('email', 'Please provide the email').not().isEmpty().isEmail(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, secondName, phone, email, diet, isconfirmed } = req.body

    try {
      const newGuest = new Guest({
        user: req.user.id,
        name,
        secondName,
        phone,
        email,
        diet,
        isconfirmed
      })
      const guest = await newGuest.save()

      res.json(guest)

    } catch (err) {

      console.error(err.message)
      res.status(500).send('Server Error')
    }
  })

router.put('/:id', auth, async (req, res) => {
  const { name, secondName, phone, email, diet, isconfirmed } = req.body

  const guestFields = { name, secondName, phone, email, diet, isconfirmed };

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

router.delete('/:id', auth, async (req, res) => {
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