import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { SessionService } from "../services/session.service";
import { Session } from "../models/mongodb/session.entity";

export class AuthController {
    private static userService = new UserService();
    private static sessionService = new SessionService();

    public async authenticateUser(req: Request, res: Response) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Email or Password invalid" });
        }

        const user = await UserService.prototype.authenticateUser(email, password);
        if (!user) return res.status(400).json({ msg: "Email or Password invalid" });

        const session: Session = await SessionService.prototype.createSession(user.email);
        res.cookie("session", session._id, {
            httpOnly: true,
        });
        res.status(200);
        return res.json({ msg: "login Success" });
    }

    async signout(req: Request, res: Response) {
        await SessionService.prototype.clearSession(req.cookies.session);
        res.clearCookie("session");
        res.status(200);
        return res.json({ msg: "You are signed out successfully" });
    }
}
