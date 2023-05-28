import { mysqlDataSource } from "../../config/mysql.config";
import { seedCourses } from "./courses.seed";
import { seedUserCourseRelationships } from "./userCourses.seed";
import { seedUsers } from "./users.seed";

async function seed() {
    try {
        const connection = await mysqlDataSource.initialize();

        await seedUsers(connection);
        console.log("Created Users");
        await seedCourses(connection);
        console.log("Created Courses");
        await seedUserCourseRelationships(connection, 5);
        console.log("Created relationships between users and courses");
        console.log("Database seeding completed successfully!");
    } catch (error) {
        console.error("Error seeding the database:", error);
    }
}

seed();
