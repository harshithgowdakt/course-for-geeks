import express from "express";
var isAuthenticated = require('../middlewares/auth-jwt');
import CourseHandler from "../controllers/course"

class CourseRouter{
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }
    private intializeRoutes() {
        this.router.get('/courses', isAuthenticated, CourseHandler.getAllCourses);
        this.router.get('/courses/:id', isAuthenticated, CourseHandler.getAllCourses);
        this.router.post('/users',isAuthenticated,CourseHandler.getAllCourses);
        this.router.delete('/usetrs/:id', isAuthenticated,CourseHandler.getAllCourses);
        this.router.put('/:id', isAuthenticated,CourseHandler.getAllCourses)
    }
}

export default CourseRouter;









