const Joi = require('@hapi/joi');

const registerValidation = (data) => {

    const registerSchema = Joi.object({
        name: Joi.string().min(4).max(255).required().not().empty(),
        email: Joi.string().min(8).max(255).required().email().not().empty(),
        password: Joi.string().min(6).max(255).required().not().empty()
    });

    const validate = registerSchema.validate(data);
    return validate;
}

const loginValidation = (data) => {

    const loginSchema = Joi.object({
        name: Joi.string().min(4).max(255).required().not().empty(),
        password: Joi.string().min(6).max(255).required().not().empty()
    });

    const validate = loginSchema.validate(data);
    return validate;
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;