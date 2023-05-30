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
                httpMethod: req.method, // request method
                httpStatus: res.statusCode, // response Status Code
                remoteAddr: req.socket.remoteAddress, // Where the request is from
                reqUrl: req.url === "/" ? req.baseUrl : req.url, // the requested URL
                responseTimeInMs: responseTime, // Resolve time in ms
                session: await SessionService.prototype.getSession(req.cookies.session),
            });
        });

        next();
    }
}
