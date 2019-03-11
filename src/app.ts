import express from "express";
import { useExpressServer } from "routing-controllers";
import expressWinston from "express-winston";
import QuizController from "./controller/QuizController";
import logger from "./utils/logger";
import * as DB from "./utils/db";
import * as Messages from "./utils/messages";

const app: express.Application = express();

const setup = async () => {
  try {
    // Setup DB connections
    logger.info(`Connecting to database with ${DB.connectionOptionsLog()}`);
    await DB.connect();
    logger.info(Messages.DB_SUCCESS);
    await DB.populateMockdata();
  } catch (error) {
    logger.error(JSON.stringify({ title: Messages.DB_FAILED, error }));
  }

  try {
    // Setup API
    app.use((req, res, next) => {
      setTimeout(() => {
        next();
      }, 1000);
    });
    app.use(expressWinston.logger({ winstonInstance: logger }));
    useExpressServer(app, {
      routePrefix: "/api",
      cors: true,
      controllers: [QuizController],
    });
    app.use(expressWinston.errorLogger({ winstonInstance: logger }));
    app.listen(process.env.SERVICE_PORT, () => {
      return logger.info(`${Messages.APP_RUNNING} ${process.env.SERVICE_PORT}`);
    });
  } catch (error) {
    logger.error(JSON.stringify({ title: Messages.APP_FAILED, error }));
  }
};

setup();

export default app;
