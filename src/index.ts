import express, { Application } from "express";
import { mongodbDataSource } from "./config/mongodb.config";
import "reflect-metadata";
import { userRouter } from "./routes/user.routes";
import cookieParser from "cookie-parser";
import { AuthenticationMiddleware } from "./middleware/auth.middleware";
import { AuthController } from "./controllers/auth.controller";
import { UserController } from "./controllers/user.controller";
import { mysqlDataSource } from "./config/mysql.config";
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { courseRouter } from "./routes/course.routes";

mongodbDataSource
    .initialize()
    .then(() => {
        console.log("Mongodb connection initialized!");
    })
    .catch((err) => {
        console.error("Error during MONGODB initialization:", err);
    });
mysqlDataSource
    .initialize()
    .then(() => {
        console.log("Mysql connection initialized!");
    })
    .catch((err) => {
        console.error("Error during MYSQL initialization:", err);
    });

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(LoggerMiddleware.prototype.logger);
app.use(AuthenticationMiddleware.prototype.middleware);
app.post("/signin", AuthController.prototype.authenticateUser);
app.get("/signout", AuthController.prototype.signout);
app.post("/signup", UserController.prototype.createUser);
app.use("/user", userRouter);
app.use("/course", courseRouter);

app.listen(8080, () => {
    console.log("Server is ready and listining on localhost:8080");
});
