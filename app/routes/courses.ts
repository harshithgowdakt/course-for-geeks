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
        this.router.get('/courses/:id', isAuthenticated, CourseHandler.getCourseById);
        this.router.post('/courses',isAuthenticated,CourseHandler.createCourse);
        this.router.delete('/courses/:id', isAuthenticated,CourseHandler.deleteCourse);
        this.router.put('/courses/:id', isAuthenticated,CourseHandler.updateCourse)
    }
}

export default CourseRouter;









