import { User } from "../../models/mysql/user.entity";
import { faker } from "@faker-js/faker";
import { DataSource, Repository } from "typeorm";
import { Course } from "../../models/mysql/coures.entity";

export const seedUserCourseRelationships = async (
    connection: DataSource,
    maxRelationShip: number
) => {
    const userRepo = connection.getRepository(User);
    const courseRepo = connection.getRepository(Course);
    for (let index = 1; index < 101; index++) {
        const user = await userRepo.findOneBy({ id: index });
        if (user !== null) {
            await addCoursesToUser(user, maxRelationShip, courseRepo);
            await userRepo.save(user);
        }
    }
};

async function addCoursesToUser(
    user: User,
    maxRelationShip: number,
    courseRepo: Repository<Course>
) {
    const courses = [] as Course[];
    for (let index = 0; index < maxRelationShip; index++) {
        const course = await courseRepo.findOneBy({
            id: Number(faker.number.int({ min: 1, max: 100000 })),
        });
        if (course !== null) courses.push(course);
    }
    user.courses = courses;
}
