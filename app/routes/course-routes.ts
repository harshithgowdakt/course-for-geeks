import express from 'express';
import CourseController from '../controllers/course-controller';
import Authentication from '../middlewares/authentiction'
const auth = require('../middlewares/auth');

export default class CourseRoutes {
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }
    private intializeRoutes() {
        this.router.get('/courses',  Authentication.isAuthenticated, CourseController.getAllCourses);
        this.router.get('/courses/:id', Authentication.isAuthenticated, CourseController.getCourseById);
        this.router.post('/courses', Authentication.isAuthenticated, CourseController.createCourse);
        this.router.delete('/courses/:id', Authentication.isAuthenticated, CourseController.deleteCourse);
        this.router.put('/courses/:id', Authentication.isAuthenticated, CourseController.updateCourse)
    }
}










