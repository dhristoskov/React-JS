const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation, loginValidation } =  require('../validations/UserValidation');

router.post('/register', async (req, res) => {
     
    const { error } = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }   
    
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist){
        return res.status(400).send('Email exist!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const newUser = await user.save()
        res.send('Done!')
    }catch(error){
        res.status(400).send(error);
    };
});

router.post('/login', async (req, res) => {

     const { error } = loginValidation(req.body);
     if(error){
        return res.status(400).send(error.details[0].message);
     }  
     const user = await User.findOne({name: req.body.name});
     if(!user){
        return res.status(400).send('Name does not exist!');
     }    
     const validPassword = await bcrypt.compare(req.body.password, user.password);
     if(!validPassword){
        return res.status(400).send('Invalid password!');
     } 

     const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN);
     res.header('auth-token', token).send(token);
});

module.exports = router;