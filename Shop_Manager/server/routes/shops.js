const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const validation = require('../middleware/validation');

//Shop model
const Shop = require('../models/Shop');

router.get('/', validation, async (req, res) => {

    try{
        const shops = await Shop.find();
        res.json(shops);
    }catch(err){
        res.status(500).send('Server Error');
    }
});

//Create shop
router.post('/',
  [
    validation,
    [
      check('nameOfObject', 'Моля въведете има не обекта').not().isEmpty(),
      check('location', 'Моля въведете локация на обекта').not().isEmpty()
    ]
  ],
  async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const { nameOfObject, location } = req.body;
        try {
            const newShop = new Shop({
                nameOfObject,
                location
            });
            const shop = await newShop.save();
            res.json(shop);           
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

//Update shop
router.put('/:id', validation, async (req, res) => {
    const { nameOfObject, location } = req.body;

    const shopFields = { nameOfObject, location };
    
    try {
        let shop = await Shop.findById(req.params.id);
        if (!shop) {
            return res.status(404).json({ msg: 'Няма такъв търговски обект' });           
        }

        shop = await Shop.findByIdAndUpdate(req.params.id, { $set: shopFields }, { new: true });
        res.send(shop)

    }catch(err){
        res.status(500).send('Server Error');
    }
});

//Delete shop
router.delete('/:id', validation, async (req, res) => {

    try{
        let shop = await Shop.findById(req.params.id);
        if(!shop){
            return res.status(404).json({ msg: 'Няма такъв търговски обект' });
        }
        await Shop.findByIdAndRemove(req.params.id);
        res.send('Търговкия обект е изтрита успешно')
    }catch(err){
        res.status(500).send('Server Error');
    }
});

module.exports = router;