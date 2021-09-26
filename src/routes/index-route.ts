import express from "express";

export class IndexRoute {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.intializeRoutes();
    }

    private intializeRoutes() {
        this.router.get('/', function (req, res, next) {
            res.render('index', { title: 'Express' });
        });
    }
}
