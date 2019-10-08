"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var course_controller_1 = __importDefault(require("../controllers/course-controller"));
var authentiction_1 = __importDefault(require("../middlewares/authentiction"));
var auth = require('../middlewares/auth');
var CourseRoutes = /** @class */ (function () {
    function CourseRoutes() {
        this.router = express_1["default"].Router();
        this.intializeRoutes();
    }
    CourseRoutes.prototype.intializeRoutes = function () {
        this.router.get('/courses', authentiction_1["default"].isAuthenticated, course_controller_1["default"].getAllCourses);
        this.router.get('/courses/:id', authentiction_1["default"].isAuthenticated, course_controller_1["default"].getCourseById);
        this.router.post('/courses', authentiction_1["default"].isAuthenticated, course_controller_1["default"].createCourse);
        this.router["delete"]('/courses/:id', authentiction_1["default"].isAuthenticated, course_controller_1["default"].deleteCourse);
        this.router.put('/courses/:id', authentiction_1["default"].isAuthenticated, course_controller_1["default"].updateCourse);
    };
    return CourseRoutes;
}());
exports["default"] = CourseRoutes;
