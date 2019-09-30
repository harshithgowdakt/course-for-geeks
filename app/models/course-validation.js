const Joi = require('joi');
module.exports = function validateUser(course) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
    };
    return Joi.validate(course, schema);
}