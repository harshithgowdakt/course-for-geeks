import * as express from "express";
import { UserController } from "../controllers/user-controller"
import { Authentication } from '../middlewares/authentiction'

export class UserRoutes {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.intializeRoutes();
    }

    private intializeRoutes() {
        this.router.get('/users', Authentication.isAuthenticated, UserController.getAllUsers);
        this.router.get('/users/:id', Authentication.isAuthenticated, UserController.getUserById);
        this.router.post('/users', UserController.createUser);
    }
}
