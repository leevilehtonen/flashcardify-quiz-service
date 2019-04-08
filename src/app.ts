import express from "express";
import { useExpressServer } from "routing-controllers";
import expressWinston from "express-winston";
import QuizController from "./controller/QuizController";
import logger from "./utils/logger";
import * as DB from "./utils/db";
import * as Messages from "./utils/messages";

export const app: express.Application = express();

export const setup = async () => {
  let db;
  try {
    // Setup DB connections
    logger.info(`Connecting to database with ${DB.connectionOptionsLog()}`);
    db = await DB.connect();
    logger.info(Messages.DB_SUCCESS);
  } catch (error) {
    logger.error(JSON.stringify({ title: Messages.DB_FAILED, error }));
  }
  let server;
  try {
    app.use(expressWinston.logger({ winstonInstance: logger }));
    useExpressServer(app, {
      routePrefix: "/api",
      cors: true,
      controllers: [QuizController],
    });
    app.use(expressWinston.errorLogger({ winstonInstance: logger }));
    server = app.listen(process.env.SERVICE_PORT, () => {
      return logger.info(`${Messages.APP_RUNNING} ${process.env.SERVICE_PORT}`);
    });
  } catch (error) {
    logger.error(JSON.stringify({ title: Messages.APP_FAILED, error }));
  }
  return { db, server };
};
