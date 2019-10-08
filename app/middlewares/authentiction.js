"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var jwt = __importStar(require("jsonwebtoken"));
var config = require('../config/env-config');
var Authentication = /** @class */ (function () {
    function Authentication() {
    }
    Authentication.isAuthenticated = function (req, res, next) {
        var token = req.header('Authorization');
        if (!token)
            return res.status(401).send('Acess denied. no token provided');
        try {
            var decoded = jwt.verify(token, config.jwt.secretOrKey);
            req.user = decoded;
            next();
        }
        catch (err) {
            res.status(400).send('Invalid token..');
        }
    };
    return Authentication;
}());
exports["default"] = Authentication;
