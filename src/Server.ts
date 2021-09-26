import logger from "morgan"
import express from "express";
import passport from "passport";
import path from "path";
import { AuthRoute } from './routes/auth-route'
import { UserRoutes } from './routes/user-routes'
import { CourseRoutes } from './routes/course-routes'
import { IndexRoute } from './routes/index-route'
import { jwtAuthStrategy } from './middlewares/auth'
import { globalErrorHandler } from './error-handler/global-error-handler'

export class App {
    app: express.Application;
    port: string | number;

    constructor(controllers: any, port: string | number) {
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
        this.app.use(express.static(path.join(__dirname, '')));
    }

    private initializePassport() {
        this.app.use(passport.initialize());
        passport.use(jwtAuthStrategy);
    }

    private initializeControllers(controllers: any) {
        controllers.forEach((controller: any) => {
            this.app.use('/', controller.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(globalErrorHandler);
    }

    listen() {
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
