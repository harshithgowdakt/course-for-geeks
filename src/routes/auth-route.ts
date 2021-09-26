import express from "express"
import { AuthController } from '../controllers/auth-controller'

export class AuthRoute {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.intializeRoutes();
    }

    private intializeRoutes() {
        this.router.post('/auth/login', AuthController.login);
    }
}


