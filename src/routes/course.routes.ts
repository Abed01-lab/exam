import { Router } from "express";
import { CourseController } from "../controllers/course.controller";

export const courseRouter = Router();
courseRouter.get("/", CourseController.prototype.getAllCourses);
courseRouter.get("/search", CourseController.prototype.fullTextSearch);
courseRouter.get("/top10", CourseController.prototype.getTop10PopularCourses);
