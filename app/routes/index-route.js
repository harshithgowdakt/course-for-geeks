"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
var IndexRoute = /** @class */ (function () {
    function IndexRoute() {
        this.router = express_1["default"].Router();
        this.intializeRoutes();
    }
    IndexRoute.prototype.intializeRoutes = function () {
        this.router.get('/', function (req, res, next) {
            res.render('index', { title: 'Express' });
        });
    };
    return IndexRoute;
}());
exports["default"] = IndexRoute;
