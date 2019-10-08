"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express = __importStar(require("express"));
var user_controller_1 = __importDefault(require("../controllers/user-controller"));
var isAuthenticated = require('../middlewares/auth-jwt');
var UserRoutes = /** @class */ (function () {
    function UserRoutes() {
        this.router = express.Router();
        this.intializeRoutes();
    }
    UserRoutes.prototype.intializeRoutes = function () {
        this.router.get('/users', isAuthenticated, user_controller_1["default"].getAllUsers);
        this.router.get('/users/:id', isAuthenticated, user_controller_1["default"].getUserById);
        this.router.post('/users/register', user_controller_1["default"].createUser);
    };
    return UserRoutes;
}());
exports["default"] = UserRoutes;
