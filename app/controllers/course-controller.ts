const { generateSuccessResponse } = require('../common/response-generator');
const courseModel = require('../models').Course;
import Validation from '../validation/validation.js'

export default class CourseController {
    public static async  getAllCourses(req, res, next) {
        try {
            let courses = await courseModel.findAll();
            res.send(generateSuccessResponse(courses, 'course.list'));
        } catch (error) {
            next(error);
        }
    }

    public static async  getCourseById(req, res, next) {
        try {
            let course = await courseModel.findByPk(req.params.id);
            if (!course) return res.status(400).send('Course with given ID does not exists');

            res.send(generateSuccessResponse(course, 'course.details'));
        } catch (error) {
            next(error);
        }
    }
    public static async createCourse(req, res, next) {
        try {
            const { error } = Validation.validateCourse(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            let course = await courseModel.create(req.body);
            res.send(generateSuccessResponse(course, 'course.registration.success'));
        } catch (error) {
            next(error);
        }
    }
    public static async  deleteCourse(req, res, next) {
        try {
            let course = await courseModel.findByPk(req.params.id);
            if (!course) return res.status(400).send('Course with given ID does not exists');

            course = await courseModel.destroy({ where: { id: req.params.id } })
            res.send(generateSuccessResponse(course, 'deleted.successfully'));
        } catch (error) {
            next(error);
        }
    }
    
    public static async updateCourse(req, res, next) {
        try {
            let course = await courseModel.findByPk(req.params.id);
            if (!course) return res.status(400).send('Course with given ID does not exists');
            
            const { error } = Validation.validateCourse(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            let isUpdate = await courseModel.update({ name: req.body.name }, { where: { id: req.params.id } });
            res.send(generateSuccessResponse(isUpdate, 'updated.successfully'));
        } catch (error) {
            next(error);
        }
    }
}
