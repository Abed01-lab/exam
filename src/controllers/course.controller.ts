import { Request, Response } from "express";
import { CourseService } from "../services/course.service";

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

    async courseEnrollment(req: Request & any, res: Response) {
        const courseId = req.params.id;

        try {
            await CourseService.prototype.courseEnrollment(req.user, parseInt(courseId));
            res.status(201).json({ msg: "User enrolled successfully" });
        } catch (err: unknown) {
            res.status(500).json({ msg: err });
        }
    }
}
