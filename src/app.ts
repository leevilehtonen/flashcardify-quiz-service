import express from "express";
import { useExpressServer } from "routing-controllers";
import expressWinston from "express-winston";
import QuizController from "./controller/QuizController";
import logger from "./utils/logger";
import * as DB from "./utils/db";
import * as Messages from "./utils/messages";

const app: express.Application = express();

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

logger.info(`Connecting to database with ${DB.connectionOptionsLog()}`);

DB.connection
  .then(() => {
    logger.info(Messages.DB_SUCCESS);
  })
  .catch(err => {
    logger.error(`${Messages.DB_FAILED}, error: ${JSON.stringify(err)}`);
  });
export default app;
