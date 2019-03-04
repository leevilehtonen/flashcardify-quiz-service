import winston, { format } from "winston";
import { Logger, QueryRunner } from "typeorm";

const logger = winston.createLogger({
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint()),
  level: "info",
  defaultMeta: { service: process.env.npm_package_name },
  transports: [new winston.transports.Console()],
});

export class DBlogger implements Logger {
  public logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    logger.debug(JSON.stringify({ title: "DB - logQuery", query, parameters }));
  }
  public logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    logger.error(JSON.stringify({ title: "DB - logQuery", error, query, parameters }));
  }
  public logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    logger.warn(JSON.stringify({ title: "DB - logQuerySlow", time, query, parameters }));
  }
  public logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    logger.info(JSON.stringify({ title: "DB - logSchemaBuild", message }));
  }
  public logMigration(message: string, queryRunner?: QueryRunner) {
    logger.info(JSON.stringify({ title: "DB - logMigration", message }));
  }
  public log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner) {
    logger.log(level, message);
  }
}

export default logger;
