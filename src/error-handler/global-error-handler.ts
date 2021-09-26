import { Request, Response, NextFunction } from "express";

export function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err)
    res.status(err.status || 500).send(err.message);
}
