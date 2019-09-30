"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var isAuthenticated = require('../middlewares/auth-jwt');
var course_1 = __importDefault(require("../controllers/course"));
var CourseRouter = /** @class */ (function () {
    function CourseRouter() {
        this.router = express_1["default"].Router();
        this.intializeRoutes();
    }
    CourseRouter.prototype.intializeRoutes = function () {
        this.router.get('/courses', isAuthenticated, course_1["default"].getAllCourses);
        this.router.get('/courses/:id', isAuthenticated, course_1["default"].getAllCourses);
        this.router.post('/users', isAuthenticated, course_1["default"].getAllCourses);
        this.router["delete"]('/usetrs/:id', isAuthenticated, course_1["default"].getAllCourses);
        this.router.put('/:id', isAuthenticated, course_1["default"].getAllCourses);
    };
    return CourseRouter;
}());
exports["default"] = CourseRouter;
