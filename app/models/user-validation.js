const Joi = require('joi');
module.exports = function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
  
    };
    return Joi.validate(user, schema);
  }
  