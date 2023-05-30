import { NextFunction, Request, Response } from "express";
import { SessionService } from "../services/session.service";

export class AuthenticationMiddleware {
    public async middleware(req: Request & any, res: Response, next: NextFunction) {
        if (req.path === "/signin" || req.path === "/signup") {
            return next();
        }
        const cookieSession: string = req.cookies.session;
        if (!cookieSession) return res.status(401).send(); // No cookie session in the request
        const session = await SessionService.prototype.getSession(cookieSession);
        if (session == null) return res.status(401).send(); // session is removed in the database or does not exist
        req.user = session; // if session is valid the attach user to server-side context
        next(); // Go to the requested resourse
    }
}
