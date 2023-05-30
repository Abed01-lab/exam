import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Index } from "typeorm";
import { Course } from "./coures.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => Course, (course) => course.users, { cascade: true, eager: true })
    @JoinTable()
    courses: Course[];
}
