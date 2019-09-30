const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/env-config');
const userModel = require('../models').User;
const Joi = require('joi');

module.exports = async function (req, res, next) {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await userModel.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send('Invalid user');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    var payload = { id: user.id };
    var token = jwt.sign(payload, config.jwt.secretOrKey);
    console.log(config.jwt.secretOrKey);

    res.header('x-auth-token', token).send({
        id: user.id,
        name: user.name,
        email: user.email
    });
}

function validate(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
  }
  