const Joi = require('joi');
module.exports = function validateCourse(course) {
    const schema = {
        name: Joi.string().min(1).max(50).required(),
    };
    return Joi.validate(course, schema);
}