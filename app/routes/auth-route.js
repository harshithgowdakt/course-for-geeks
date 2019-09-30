"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var auth_services_1 = __importDefault(require("../services/auth-services"));
var AuthController = /** @class */ (function () {
    function AuthController() {
        this.router = express_1["default"].Router();
        this.intializeRoutes();
    }
    AuthController.prototype.intializeRoutes = function () {
        this.router.post('/auth/login', function (req, res, next) {
            auth_services_1["default"](req, res, next);
        });
    };
    return AuthController;
}());
exports["default"] = AuthController;
