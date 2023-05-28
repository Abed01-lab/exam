import { Repository } from "typeorm";
import { mongodbDataSource } from "../config/mongodb.config";
import { User } from "../models/mysql/user.entity";
import { mysqlDataSource } from "../config/mysql.config";

export class UserService {
    private static userRepo: Repository<User> = mysqlDataSource.getRepository(User);

    constructor() {}

    public async createUser(email: string, password: string): Promise<User | null> {
        if ((await UserService.userRepo.findOneBy({ email })) !== null) return null;
        const user = UserService.userRepo.save({
            email,
            password,
        });

        return user;
    }

    public async userExists(email: string): Promise<Boolean> {
        if (await UserService.userRepo.findOneBy({ email })) return true;
        return false;
    }

    public async authenticateUser(email: string, password: string): Promise<User | null> {
        const user: User | null = await UserService.userRepo.findOneBy({ email, password });
        if (user) return user;
        return null;
    }

    public async getAllUsers(): Promise<User[]> {
        return await UserService.userRepo.find({});
    }

    async getUserByEmail(email: string) {
        return await UserService.userRepo.findOneBy({ email });
    }
}
