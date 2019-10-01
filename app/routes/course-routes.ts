import express from 'express';
import CourseHandler from '../controllers/course';
const auth = require('../middlewares/auth');
const isAuthenticated = require('../middlewares/auth-jwt');

export default class CourseRoutes {
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }
    private intializeRoutes() {
        this.router.get('/courses', isAuthenticated, CourseHandler.getAllCourses);
        this.router.get('/courses/:id', isAuthenticated, CourseHandler.getCourseById);
        this.router.post('/courses', isAuthenticated, CourseHandler.createCourse);
        this.router.delete('/courses/:id', isAuthenticated, CourseHandler.deleteCourse);
        this.router.put('/courses/:id', isAuthenticated, CourseHandler.updateCourse)
    }
}










