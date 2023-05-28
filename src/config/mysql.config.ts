import path from "path";
import { DataSource } from "typeorm";

export const mysqlDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT as string),
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    synchronize: true,
    entities: [path.join(__dirname, "..", "/models/mysql/**.entity.ts")],
    cache: {
        type: "redis",
        options: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        },
    },
});
