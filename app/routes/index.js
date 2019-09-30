"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = express_1["default"].Router();
var IndexController = /** @class */ (function () {
    function IndexController() {
        this.router = express_1["default"].Router();
        this.intializeRoutes();
    }
    IndexController.prototype.intializeRoutes = function () {
        this.router.get('/', function (req, res, next) {
            res.render('index', { title: 'Express' });
        });
    };
    return IndexController;
}());
exports["default"] = IndexController;
