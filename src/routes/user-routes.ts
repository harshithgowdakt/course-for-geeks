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
        this.router.get('/internal/api/v1/users', Authentication.isAuthenticated, UserController.getAllUsers);
        this.router.get('/internal/api/v1/users/:id', Authentication.isAuthenticated, UserController.getUserById);
        this.router.post('/internal/api/v1/users', UserController.createUser);
    }
}
