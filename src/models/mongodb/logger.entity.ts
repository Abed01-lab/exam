import { Request } from "express";
import { Entity, Column, ObjectIdColumn, ObjectId, CreateDateColumn } from "typeorm";
import { Session } from "./session.entity";

@Entity()
export class Logger {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    remoteAddr: string | undefined;

    @Column()
    httpMethod: string;

    @Column()
    httpStatus: number;

    @Column()
    responseTimeInMs: number;

    @Column()
    reqUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    session: Session | null;
}
