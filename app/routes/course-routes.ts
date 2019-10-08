import express from 'express';
import CourseController from '../controllers/course-controller';
const auth = require('../middlewares/auth');
const isAuthenticated = require('../middlewares/auth-jwt');

export default class CourseRoutes {
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }
    private intializeRoutes() {
        this.router.get('/courses', isAuthenticated, CourseController.getAllCourses);
        this.router.get('/courses/:id', isAuthenticated, CourseController.getCourseById);
        this.router.post('/courses', isAuthenticated, CourseController.createCourse);
        this.router.delete('/courses/:id', isAuthenticated, CourseController.deleteCourse);
        this.router.put('/courses/:id', isAuthenticated, CourseController.updateCourse)
    }
}










