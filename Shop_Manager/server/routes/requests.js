const express = require('express');
const router = express.Router();
const validation = require('../middleware/validation');
const { check, validationResult } = require('express-validator');

//Request Model
const Request = require('../models/Request');

//List of all requests
router.get('/', validation, async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    res.status(500).send('Server Error');
  }
})

//Make a new request
router.post('/',
  [
    validation,
    [
      check('name', 'Моля въведете поръчка').not().isEmpty(),
      check('quantity', 'Моля въведете количество').not().isEmpty().isNumeric()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, quantity, shopName, isItConfirmed } = req.body

    try {
      const newRequest = new Request({
        name,
        quantity,
        shopName,
        isItConfirmed
      })
      const request = await newRequest.save();

      res.json(request);

    } catch (err) {
      res.status(500).send('Server Error');
    }
  });

//Update request
router.put('/:id', validation, async (req, res) => {
  const { name, quantity, shopName, isItConfirmed } = req.body;

  const requestFields = { name, quantity, shopName, isItConfirmed };

  try {
    let request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ msg: 'Няма такъва заявка' });
  
    request = await Request.findByIdAndUpdate(req.params.id, { $set: requestFields }, { new: true });
    res.send(request)
  } catch (err) {

    res.status(500).send('Server Error');
  }
});

//Delete request
router.delete('/:id', validation, async (req, res) => {
  try {
    let request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ msg: 'Няма такъва заявка' });

    await Request.findByIdAndRemove(req.params.id);
    res.send('Заявката е изтрита успешно');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router