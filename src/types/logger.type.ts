import { Logger } from "typeorm";
import { Session } from "../models/mongodb/session.entity";

export interface LoggerType {
    remoteAddr: string | undefined;
    httpMethod: string;
    httpStatus: number;
    responseTimeInMs: number;
    reqUrl: string;
    session: Session | null;
}
