import express from "express"
import AuthController from '../controllers/auth-controller'

export default class AuthRoute {
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post('/auth/login', AuthController.login);
  }
}


