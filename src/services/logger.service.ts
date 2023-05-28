import { Repository } from "typeorm";
import { mongodbDataSource } from "../config/mongodb.config";
import { Logger } from "../models/mongodb/logger.entity";
import { Request } from "express";
import { LoggerType } from "../types/logger.type";

export class LoggerService {
    private static loggerRepo: Repository<Logger> = mongodbDataSource.getRepository(Logger);

    public async createLog({
        httpMethod,
        httpStatus,
        remoteAddr,
        reqUrl,
        responseTimeInMs,
        session,
    }: LoggerType) {
        await LoggerService.loggerRepo.save({
            httpMethod,
            httpStatus,
            remoteAddr,
            reqUrl,
            responseTimeInMs,
            session,
        });
    }
}
