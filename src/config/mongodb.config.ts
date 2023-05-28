import path from "path";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const mongodbDataSource = new DataSource({
    type: "mongodb",
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT as string),
    database: process.env.MONGO_DATABASE,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    authSource: "admin",
    synchronize: true,
    entities: [path.join(__dirname, "..", "/models/mongodb/**.entity.ts")],
});
