import winston, { format } from "winston";

const logger = winston.createLogger({
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint()),
  level: "info",
  defaultMeta: { service: process.env.npm_package_name },
  transports: [new winston.transports.Console()],
});

export default logger;
