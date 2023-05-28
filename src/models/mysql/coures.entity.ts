import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToMany } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ fulltext: true })
    @Column()
    name: string;

    @Column({ type: "text" })
    description: string;

    @Column()
    enrollmentCount: number;

    @ManyToMany(() => User, (user) => user.courses)
    users: User[];
}
