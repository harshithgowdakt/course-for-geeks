import createError from "http-errors"
import cookieParser from "cookie-parser"
import logger from "morgan"
import express from "express";
import passport from "passport";
import AuthRouter from './app/routes/auth-route'
import UserRouter from './app/routes/user'
import CourseRouter from './app/routes/courses'
import IndexRouter from './app/routes/index'
import globalErrorHandler from './app/error-handler/global-error-handler'
import * as path from "path";


export default class App {
    public app: express.Application;
    public port: string | number;
    constructor(controllers, port: string | number) {
        this.app = express();
        this.port = port;
        this.configuration();
        this.initializeControllers(controllers)
        this.initializeErrorHandling();
    }

    private configuration() {
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(passport.initialize());
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(function (req, res, next) {
            next(createError(404));
        });
        this.app.use(globalErrorHandler);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${port}`);
        });
    }
}

const port = process.env.PORT || 3000;
const app = new App([
    new UserRouter(),
    new IndexRouter(),
    new AuthRouter(),
    new CourseRouter()],
    port
);
app.listen();