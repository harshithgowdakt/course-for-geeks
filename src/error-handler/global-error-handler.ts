import { Request, Response, NextFunction } from "express";
import ResponseGenerator from '../common/response-generator'

export default function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err.stack)
    res.status(err.status || 500)
        .send(
            ResponseGenerator.generateErrorResponse(err.message, err.stack)
        );
}