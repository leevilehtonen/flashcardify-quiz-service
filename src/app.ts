import express from "express";
import { useExpressServer } from "routing-controllers";
import expressWinston from "express-winston";
import QuizController from "./controller/QuizController";
import logger from "./utils/logger";
import * as Messages from "./utils/messages";

const app: express.Application = express();

app.use(expressWinston.logger({ winstonInstance: logger }));
useExpressServer(app, {
  routePrefix: "/api",
  cors: true,
  controllers: [QuizController],
});
app.use(expressWinston.errorLogger({ winstonInstance: logger }));
app.listen(process.env.PORT, () => logger.info(`${Messages.APP_RUNNING} ${process.env.PORT}`));

export default app;
