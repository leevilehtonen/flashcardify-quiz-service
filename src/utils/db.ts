import { ConnectionOptions, createConnection, Connection, getRepository, getConnection } from "typeorm";
import { Quiz } from "../entity/Quiz";

import { Flashcard } from "../entity/Flashcard";
import { DBlogger } from "./logger";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.NODE_ENV === "development" ? true : false,
  entities: process.env.NODE_ENV === "development" ? ["src/entity/**/*.ts"] : ["src/entity/**/*.js"],
  logging: true,
  logger: new DBlogger(),
};
export const connectionOptionsLog = (): string => {
  const { password, ...rest } = connectionOptions;
  return JSON.stringify(rest);
};

export const populateMockdata = async () => {
  const MOCK_DATA = require("../../MOCK_DATA.json");
  const connection = getConnection();
  await connection.query("TRUNCATE TABLE quiz RESTART IDENTITY CASCADE;");
  const quizReporsitory = getRepository(Quiz);
  await Promise.all(MOCK_DATA.map((item: object) => quizReporsitory.save(item)));
};

export const connect = (): Promise<Connection> => createConnection(connectionOptions);
