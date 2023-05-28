import { faker } from "@faker-js/faker";
import { DataSource, Repository } from "typeorm";
import { Course } from "../../models/mysql/coures.entity";

export const seedCourses = async (connection: DataSource) => {
    const userRepo = connection.getRepository(Course);
    for (let index = 0; index < 10; index++) {
        newFunction(userRepo);
    }
};
function newFunction(userRepo: Repository<Course>) {
    const course = [];
    for (let index = 0; index < 10000; index++) {
        course.push({
            name: faker.company.catchPhrase(),
            description: faker.lorem.paragraph(),
            enrollmentCount: faker.number.int({ min: 12, max: 2973 }),
        });
    }
    userRepo.insert(course);
}
