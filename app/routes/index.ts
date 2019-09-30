import express from "express";
var router = express.Router();

class IndexRouter {
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

export default IndexRouter;