import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";
const config = require('../config/env-config');

export default class Authentication {

    public static isAuthenticated(req: Request, res: Response, next: NextFunction) {
        const token = req.header('Authorization');
        if (!token) return res.status(401).send('Acess denied. no token provided');

        try {
            const decoded = jwt.verify(token, config.jwt.secretOrKey);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(400).send('Invalid token..');
        }
    }
}
