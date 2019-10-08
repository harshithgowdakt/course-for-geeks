const { generateSuccessResponse } = require('../common/response-generator');
const appConstants = require('../common/app-constants');
const userModel = require('../models').User;
import Validation from '../validation/validation.js'
import bcrypt from 'bcrypt';
import { Request,Response, NextFunction } from 'express';

export default class UesrController {
    public static async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            let users = await userModel.findAll({
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            });
            res.send(generateSuccessResponse(users, 'user.list'));
        } catch (error) {
            next(error)
        }
    }

    public static async  getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            let user = await userModel.findByPk(req.params.id);
            if (!user) return res.status(400).send('User with given ID does not exists');

            res.send(generateSuccessResponse({
                id: user.id,
                name: user.name,
                email: user.email
            }, 'user.details'));
        } catch (error) {
            next(error);
        }
    }

    public static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { error } = Validation.validateUser(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            let isUser = await userModel.findOne({ where: { email: req.body.email } });
            if (isUser) return res.status(400).send('User already regestered');

            let hashedPassword = await bcrypt.hash(req.body.password, appConstants.saltRounds);
            req.body.password = hashedPassword;

            let user = await userModel.create(req.body);
            res.send(generateSuccessResponse({
                id: user.id,
                name: user.name,
                email: user.email
            }, 'registration.success'));
        } catch (error) {
            next(error);
        }
    }
}
