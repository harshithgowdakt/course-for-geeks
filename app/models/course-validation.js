const Joi = require('joi');
module.exports = function validateUser(course) {
    const schema = {
        name: Joi.string().min(1).max(50).required(),
    };
    return Joi.validate(course, schema);
}