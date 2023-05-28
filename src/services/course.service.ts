import { mysqlDataSource } from "../config/mysql.config";
import { Course } from "../models/mysql/coures.entity";

export class CourseService {
    private static courseRepo = mysqlDataSource.getRepository(Course);

    async getAllCourses(): Promise<Course[]> {
        return await CourseService.courseRepo.find({
            relations: {
                users: true,
            },
        });
    }

    async fullTextSearch(searchTerm: string): Promise<Course[]> {
        return await CourseService.courseRepo
            .createQueryBuilder()
            .where("MATCH(name) AGAINST(:searchTerm)", { searchTerm })
            .getMany();
    }

    async getTop10PopularCourses() {
        return await CourseService.courseRepo
            .createQueryBuilder("course")
            .leftJoinAndSelect("course.users", "user")
            .select("course")
            .addSelect("COUNT(user.id)", "userCount")
            .groupBy("course.id")
            .orderBy("userCount", "DESC")
            .limit(10)
            .cache(10000)
            .getMany();
    }
}
