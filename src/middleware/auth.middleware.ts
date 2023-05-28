import { NextFunction, Request, Response, Router } from "express";
import { SessionService } from "../services/session.service";
import { log } from "console";

export class AuthenticationMiddleware {
    public async middleware(req: Request, res: Response, next: NextFunction) {
        if (req.path === "/signin" || req.path === "/signup") {
            return next();
        }
        const cookieSession: string = req.cookies.session;
        if (!cookieSession) return res.status(401).send();
        if (!(await SessionService.prototype.validateSession(cookieSession)))
            return res.status(401).send();
        next();
    }
}
