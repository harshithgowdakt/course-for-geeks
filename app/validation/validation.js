"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var Validation = /** @class */ (function () {
    function Validation() {
    }
    Validation.validateCourse = function (course) {
        var schema = {
            name: joi_1["default"].string().min(1).max(50).required()
        };
        return joi_1["default"].validate(course, schema);
    };
    Validation.validateUser = function (user) {
        var schema = {
            name: joi_1["default"].string().min(5).max(50).required(),
            email: joi_1["default"].string().min(5).max(255).required().email(),
            password: joi_1["default"].string().min(5).max(255).required()
        };
        return joi_1["default"].validate(user, schema);
    };
    return Validation;
}());
exports["default"] = Validation;
