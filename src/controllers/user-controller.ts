
import bcrypt from 'bcrypt';
import { Validation } from '../validation/validation'
import { saltRounds } from '../common/app-constants'
import { Request, Response, NextFunction } from 'express';

const userModel = require('../models').User;

export class UserController {
    static async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            let users = await userModel.findAll({
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            });
            res.json(users);
        } catch (error) {
            next(error)
        }
    }

    static async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            let user = await userModel.findByPk(req.params.id);
            if (!user) return res.status(400).send('User with given ID does not exists');

            res.json({
                id: user.id,
                name: user.name,
                email: user.email
            });
        } catch (error) {
            next(error);
        }
    }

    static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { error } = Validation.validateUser(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            let isUser = await userModel.findOne({ where: { email: req.body.email } });
            if (isUser) return res.status(400).send('User already regestered');

            let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password = hashedPassword;

            let user = await userModel.create(req.body);
            res.json({
                id: user.id,
                name: user.name,
                email: user.email
            });
        } catch (error) {
            next(error);
        }
    }
}

