"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var course_1 = __importDefault(require("../controllers/course"));
var auth = require('../middlewares/auth');
var isAuthenticated = require('../middlewares/auth-jwt');
var CourseRouter = /** @class */ (function () {
    function CourseRouter() {
        this.router = express_1["default"].Router();
        this.intializeRoutes();
    }
    CourseRouter.prototype.intializeRoutes = function () {
        this.router.get('/courses', isAuthenticated, course_1["default"].getAllCourses);
        this.router.get('/courses/:id', isAuthenticated, course_1["default"].getCourseById);
        this.router.post('/courses', isAuthenticated, course_1["default"].createCourse);
        this.router["delete"]('/courses/:id', isAuthenticated, course_1["default"].deleteCourse);
        this.router.put('/courses/:id', isAuthenticated, course_1["default"].updateCourse);
    };
    return CourseRouter;
}());
exports["default"] = CourseRouter;
