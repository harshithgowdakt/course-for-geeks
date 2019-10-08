import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import Joi from 'joi'
const config = require('../config/env-config')
const userModel = require('../models').User;

export default class AuthController {

    public static async login(req, res, next) {
        const { error } = AuthController.validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await userModel.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(400).send('Invalid user');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        var payload = { id: user.id };
        var token = jwt.sign(payload, config.jwt.secretOrKey);

        res.header('x-auth-token', token).send({
            id: user.id,
            name: user.name,
            email: user.email
        });
    }

    private static validateUser(user) {
        const schema = {
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(255).required()
        };
        return Joi.validate(user, schema);
    }
}



