import { mysqlDataSource } from "../config/mysql.config";
import { Session } from "../models/mongodb/session.entity";
import { Course } from "../models/mysql/coures.entity";
import { User } from "../models/mysql/user.entity";

export class CourseService {
    private static courseRepo = mysqlDataSource.getRepository(Course);
    private static userRepo = mysqlDataSource.getRepository(User);

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

    async getTop10PopularCourses(): Promise<Course[]> {
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

    async courseEnrollment(sessionUser: Session, courseId: number) {
        const queryRunner = mysqlDataSource.createQueryRunner();
        const user = await CourseService.userRepo.findOneBy({
            email: sessionUser.email,
        });
        const course = await CourseService.courseRepo.findOneBy({
            id: courseId,
        });
        if (user === null || course === null) return null;

        course.enrollmentCount++;
        user.courses.push(course);
        await queryRunner.startTransaction();
        try {
            await CourseService.courseRepo.save(course);
            await CourseService.userRepo.save(user);
        } catch (err: unknown) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}
