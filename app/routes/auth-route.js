"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var auth_controller_1 = __importDefault(require("../controllers/auth-controller"));
var AuthRoute = /** @class */ (function () {
    function AuthRoute() {
        this.router = express_1["default"].Router();
        this.intializeRoutes();
    }
    AuthRoute.prototype.intializeRoutes = function () {
        this.router.post('/auth/login', auth_controller_1["default"].login);
    };
    return AuthRoute;
}());
exports["default"] = AuthRoute;
