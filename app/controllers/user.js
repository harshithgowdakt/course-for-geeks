"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var generateSuccessResponse = require('../common/response-generator').generateSuccessResponse;
var appConstants = require('../common/app-constants');
var userModel = require('../models').User;
var validateUser = require('../models/user-validation');
var bcrypt_1 = __importDefault(require("bcrypt"));
var UesrHandler = /** @class */ (function () {
    function UesrHandler() {
    }
    UesrHandler.getAllUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel.findAll({
                                attributes: {
                                    exclude: ['password', 'createdAt', 'updatedAt']
                                }
                            })];
                    case 1:
                        users = _a.sent();
                        res.send(generateSuccessResponse(users, 'user.list'));
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UesrHandler.getUserById = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel.findByPk(req.params.id)];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, res.status(400).send('User with given ID does not exists')];
                        res.send(generateSuccessResponse({
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }, 'user.details'));
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UesrHandler.createUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var error, isUser, hashedPassword, user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        error = validateUser(req.body).error;
                        if (error)
                            return [2 /*return*/, res.status(400).send(error.details[0].message)];
                        return [4 /*yield*/, userModel.findOne({ where: { email: req.body.email } })];
                    case 1:
                        isUser = _a.sent();
                        if (isUser)
                            return [2 /*return*/, res.status(400).send('User already regestered')];
                        return [4 /*yield*/, bcrypt_1["default"].hash(req.body.password, appConstants.saltRounds)];
                    case 2:
                        hashedPassword = _a.sent();
                        req.body.password = hashedPassword;
                        return [4 /*yield*/, userModel.create(req.body)];
                    case 3:
                        user = _a.sent();
                        res.send(generateSuccessResponse({
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }, 'registration.success'));
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UesrHandler.deleteUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel.destory(req.params.id)];
                    case 1:
                        user = _a.sent();
                        res.send(generateSuccessResponse({
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }, 'deleted.successfully'));
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UesrHandler.updateUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userModel.update(req.params.name, req.body.email)];
                    case 1:
                        user = _a.sent();
                        res.send(generateSuccessResponse({
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }, 'updated.successfully'));
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UesrHandler;
}());
exports["default"] = UesrHandler;
