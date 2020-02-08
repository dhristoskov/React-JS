const router = require('express').Router();
const veryfy = require('./AuthValidation');

router.get('/', veryfy, (req, res) => {
    res.json({
        recipe:{
            title: 'Ceto Dinner',
            cookingTime: 'around 20 minutes'
        }
    });
});

module.exports = router;