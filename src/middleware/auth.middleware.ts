import { NextFunction, Request, Response } from "express";
import { SessionService } from "../services/session.service";

export class AuthenticationMiddleware {
    public async middleware(req: Request & any, res: Response, next: NextFunction) {
        if (req.path === "/signin" || req.path === "/signup") {
            return next();
        }
        const cookieSession: string = req.cookies.session;
        if (!cookieSession) return res.status(401).send();
        const session = await SessionService.prototype.getSession(cookieSession);
        if (session == null) return res.status(401).send();
        req.user = session;
        next();
    }
}
