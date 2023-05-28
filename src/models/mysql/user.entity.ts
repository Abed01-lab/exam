import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Course } from "./coures.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => Course, (course) => course.users, { cascade: true, eager: true })
    @JoinTable()
    courses: Course[];
}
