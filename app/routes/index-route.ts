import express from "express";
var router = express.Router();

export default class IndexRoute {
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get('/', function (req, res, next) {
      res.render('index', { title: 'Express' });
    });
  }
}
