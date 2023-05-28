import { Request, Response } from "express";
import { CourseService } from "../services/course.service";
import { ok } from "assert";

export class CourseController {
    async getAllCourses(req: Request, res: Response) {
        return res.json(await CourseService.prototype.getAllCourses());
    }

    async fullTextSearch(req: Request, res: Response) {
        const searchTerm = req.query.q as string;
        return res.status(200).json(await CourseService.prototype.fullTextSearch(searchTerm));
    }

    async getTop10PopularCourses(req: Request, res: Response) {
        return res.status(200).json(await CourseService.prototype.getTop10PopularCourses());
    }
}
