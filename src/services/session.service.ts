import { ObjectId } from "mongodb";
import { mongodbDataSource } from "../config/mongodb.config";
import { Session } from "../models/mongodb/session.entity";

export class SessionService {
    private static sessionRepo = mongodbDataSource.getRepository(Session);

    async clearSession(id: string) {
        await SessionService.sessionRepo.delete({
            _id: ObjectId.createFromHexString(id),
        });
    }

    async getSession(id: string | undefined): Promise<Session | null> {
        if (id === null || !id) return null;
        const session = await SessionService.sessionRepo.findOneBy({
            _id: ObjectId.createFromHexString(id),
        });
        if (session === null) return null;
        return session;
    }

    async createSession(email: string): Promise<Session> {
        const session = await SessionService.sessionRepo.save({
            email,
        });
        return session;
    }
}
