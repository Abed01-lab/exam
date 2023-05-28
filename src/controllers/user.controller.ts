import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { SessionService } from "../services/session.service";

export class UserController {
    private static userService: UserService = new UserService();

    public async createUser(req: Request, res: Response) {
        const user = await UserService.prototype.createUser(req.body.email, req.body.password);
        if (!user) return res.status(400).json({ msg: "User already exists" });
        const session = await SessionService.prototype.createSession(user.email);
        res.cookie("session", session._id, {
            httpOnly: true,
        });
        return res.json(user);
    }

    public async getAllUsers(req: Request, res: Response) {
        const users = await UserService.prototype.getAllUsers();
        return res.json(users);
    }

    async getUser(req: Request & any, res: Response) {
        return res.status(200).json(await UserService.prototype.getUserByEmail(req.user.email));
    }
}
