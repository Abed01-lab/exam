import { Column, CreateDateColumn, Entity, Index, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class Session {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    email: string;

    @CreateDateColumn()
    createdAt: Date;
}
