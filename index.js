"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_errors_1 = __importDefault(require("http-errors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var auth_route_1 = __importDefault(require("./app/routes/auth-route"));
var user_1 = __importDefault(require("./app/routes/user"));
var courses_1 = __importDefault(require("./app/routes/courses"));
var index_1 = __importDefault(require("./app/routes/index"));
var auth_1 = __importDefault(require("./app/middlewares/auth"));
var global_error_handler_1 = __importDefault(require("./app/error-handler/global-error-handler"));
var path_1 = __importDefault(require("path"));
var App = /** @class */ (function () {
    function App(controllers, port) {
        this.app = express_1["default"]();
        this.port = port;
        this.configuration();
        this.initializePassport();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    App.prototype.configuration = function () {
        this.app.set('views', path_1["default"].join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');
        this.app.use(morgan_1["default"]('dev'));
        this.app.use(express_1["default"].json());
        this.app.use(express_1["default"].urlencoded({ extended: false }));
        this.app.use(cookie_parser_1["default"]());
        this.app.use(express_1["default"].static(path_1["default"].join(__dirname, 'public')));
    };
    App.prototype.initializePassport = function () {
        this.app.use(passport_1["default"].initialize());
        passport_1["default"].use(auth_1["default"].jwtAuthStrategy);
    };
    App.prototype.initializeControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use('/', controller.router);
        });
    };
    App.prototype.initializeErrorHandling = function () {
        this.app.use(function (req, res, next) {
            next(http_errors_1["default"](404));
        });
        this.app.use(global_error_handler_1["default"]);
    };
    App.prototype.listen = function () {
        this.app.listen(this.port, function () {
            console.log("App listening on the port " + port);
        });
    };
    return App;
}());
exports["default"] = App;
var port = process.env.PORT || 3000;
var app = new App([
    new user_1["default"](),
    new index_1["default"](),
    new auth_route_1["default"](),
    new courses_1["default"]()
], port);
app.listen();
