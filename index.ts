import createError from "http-errors"
import logger from "morgan"
import express from "express";
import passport from "passport";
import AuthRoute from './app/routes/auth-route'
import UserRoutes from './app/routes/user-routes'
import CourseRoutes from './app/routes/course-routes'
import IndexRoute from './app/routes/index-route'
import strategy from './app/middlewares/auth'
import globalErrorHandler from './app/error-handler/global-error-handler'
import path from "path";

export default class App {
    public app: express.Application;
    public port: string | number;
    constructor(controllers, port: string | number) {
        this.app = express();
        this.port = port;
        this.configuration();
        this.initializePassport();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private configuration() {
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    private initializePassport() {
        this.app.use(passport.initialize());
        passport.use(strategy.jwtAuthStrategy);
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
    new IndexRoute(),
    new AuthRoute(),
    new UserRoutes(),
    new CourseRoutes()],
    port
);
app.listen();