import { ConnectionOptions, createConnection, Connection } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.NODE_ENV === "development" ? true : false,
  entities: process.env.NODE_ENV === "development" ? ["../entity/*.ts"] : ["../entity/*.js"],
};
export const connectionOptionsLog = (): string => {
  const { password, ...rest } = connectionOptions;
  return JSON.stringify(rest);
};

export const connection: Promise<Connection> = createConnection(connectionOptions);
