import * as express from "express";
import UserHandler from "../controllers/user"
var isAuthenticated = require('../middlewares/auth-jwt');

export default class UserRoutes {
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get('/users', isAuthenticated, UserHandler.getAllUsers);
        this.router.get('/users/:id', isAuthenticated, UserHandler.getUserById);
        this.router.post('/users/register', UserHandler.createUser);
    }

}
