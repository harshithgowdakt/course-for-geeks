import express from "express";
import login from '../services/auth-services';

class AuthController {
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {
    this.router.post('/auth/login', function (req, res, next) {
      login(req, res, next)
    });
  }
}

export default AuthController;
