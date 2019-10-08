import * as express from "express";
import UserController from "../controllers/user-controller"
var isAuthenticated = require('../middlewares/auth-jwt');

export default class UserRoutes {
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get('/users', isAuthenticated, UserController.getAllUsers);
        this.router.get('/users/:id', isAuthenticated, UserController.getUserById);
        this.router.post('/users/register', UserController.createUser);
    }

}
