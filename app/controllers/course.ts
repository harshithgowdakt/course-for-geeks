const { generateSuccessResponse } = require('../common/response-generator');
const courseModel = require('../models').Course;
class CourseHandler {
    public static async  getAllCourses(req, res, next) {
        try {
            let result = await courseModel.findAll();
            res.send(generateSuccessResponse(result, 'course.list'));
        } catch (error) {
            next(error);
        }
    }

    public static async  getCourseById(req, res, next) {
        try {
            let result = await courseModel.findByPk(req.params.id);
            res.send(generateSuccessResponse(result, 'course.details'));
        } catch (error) {
            next(error);
        }
    }
    public static async createCourse(req, res, next) {
        try {
            let result = await courseModel.create(req.body);
            res.send(generateSuccessResponse(result, 'course.registration.success'));
        } catch (error) {
            next(error);
        }
    }
    public static async  deleteCourse(req, res, next) {
        try {
            let result = await courseModel.destory(req.params.id)
            res.send(generateSuccessResponse(result, 'deleted successfully'));
        } catch (error) {
            next(error);
        }
    }
    public static async updateCourse(req, res, next) {
        try {
            let result = await courseModel.update(req.params.id, req.body.name)
            res.send(generateSuccessResponse(result, 'updated successfully'));
        } catch (error) {
            next(error);
        }
    }
}

export default CourseHandler;