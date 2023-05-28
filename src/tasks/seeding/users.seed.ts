import { User } from "../../models/mysql/user.entity";
import { faker } from "@faker-js/faker";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const seedUsers = async (connection: DataSource) => {
    const userRepo = connection.getRepository(User);

    userRepo.save({
        email: process.env.DEV_USERNAME,
        password: process.env.DEV_PASSWORD,
    });

    for (let index = 0; index < 100; index++) {
        userRepo.save({
            email: faker.internet.email(),
            password: faker.internet.userName(),
        });
    }
};
