import Joi from 'joi'

export default class Validation {
    public static validateCourse(course: string) {
        const schema = {
            name: Joi.string().min(1).max(50).required(),
        };
        return Joi.validate(course, schema);
    }

    public static validateUser(user: { name: string, email: string, password: string }) {
        const schema = {
            name: Joi.string().min(5).max(50).required(),
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(255).required(),
      
        };
        return Joi.validate(user, schema);
      }
}
