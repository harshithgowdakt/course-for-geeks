"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var auth_services_1 = __importDefault(require("../services/auth-services"));
var AuthRouter = /** @class */ (function () {
    function AuthRouter() {
        this.router = express_1["default"].Router();
        this.intializeRoutes();
    }
    AuthRouter.prototype.intializeRoutes = function () {
        this.router.post('/auth/login', function (req, res, next) {
            auth_services_1["default"](req, res, next);
        });
    };
    return AuthRouter;
}());
exports["default"] = AuthRouter;
