import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../services/logger.service";
import { SessionService } from "../services/session.service";

export class LoggerMiddleware {
    async logger(req: Request, res: Response, next: NextFunction) {
        const startTime: any = new Date();
        let responseTime = 0;

        res.on("finish", async () => {
            const endTime: any = new Date();
            responseTime = endTime - startTime;
            LoggerService.prototype.createLog({
                httpMethod: req.method,
                httpStatus: res.statusCode,
                remoteAddr: req.socket.remoteAddress,
                reqUrl: req.url === "/" ? req.baseUrl : req.url,
                responseTimeInMs: responseTime,
                session: await SessionService.prototype.getSession(req.cookies.session),
            });
        });

        next();
    }
}
