import { ResponseGenerator } from '../common/response-generator'
import { Validation } from '../validation/validation.js'
import { Request,Response, NextFunction } from 'express';

const courseModel = require('../models').Course;

export class CourseController {
    static async getAllCourses(req: Request, res: Response, next: NextFunction) {
        try {
            let courses = await courseModel.findAll();
            res.send(ResponseGenerator.generateSuccessResponse(courses, 'course.list'));
        } catch (error) {
            next(error);
        }
    }

    static async getCourseById(req: Request, res: Response, next: NextFunction) {
        try {
            let course = await courseModel.findByPk(req.params.id);
            if (!course) return res.status(400).send('Course with given ID does not exists');

            res.send(ResponseGenerator.generateSuccessResponse(course, 'course.details'));
        } catch (error) {
            next(error);
        }
    }
    static async createCourse(req: Request, res: Response, next: NextFunction) {
        try {
            const { error } = Validation.validateCourse(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            let course = await courseModel.create(req.body);
            res.send(ResponseGenerator.generateSuccessResponse(course, 'course.registration.success'));
        } catch (error) {
            next(error);
        }
    }
    static async deleteCourse(req: Request, res: Response, next: NextFunction) {
        try {
            let course = await courseModel.findByPk(req.params.id);
            if (!course) return res.status(400).send('Course with given ID does not exists');

            course = await courseModel.destroy({ where: { id: req.params.id } })
            res.send(ResponseGenerator.generateSuccessResponse(course, 'deleted.successfully'));
        } catch (error) {
            next(error);
        }
    }
    
    static async updateCourse(req: Request, res: Response, next: NextFunction) {
        try {
            let course = await courseModel.findByPk(req.params.id);
            if (!course) return res.status(400).send('Course with given ID does not exists');
            
            const { error } = Validation.validateCourse(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            let isUpdate = await courseModel.update({ name: req.body.name }, { where: { id: req.params.id } });
            res.send(ResponseGenerator.generateSuccessResponse(isUpdate, 'updated.successfully'));
        } catch (error) {
            next(error);
        }
    }
}
