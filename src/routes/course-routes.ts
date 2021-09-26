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
        this.router.post('/internal/api/v1/courses', Authentication.isAuthenticated, CourseController.createCourse);
        this.router.get('/internal/api/v1/courses', Authentication.isAuthenticated, CourseController.getAllCourses);
        this.router.get('/internal/api/v1/courses/:id', Authentication.isAuthenticated, CourseController.getCourseById);
        this.router.put('/internal/api/v1/courses/:id', Authentication.isAuthenticated, CourseController.updateCourse)
        this.router.delete('/internal/api/v1/courses/:id', Authentication.isAuthenticated, CourseController.deleteCourse);
    }
}










