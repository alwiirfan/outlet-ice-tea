import { createLogger, format, transports } from "winston";

const { combine, timestamp, prettyPrint } = format;

export const logger = createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [new transports.Console()],
});

// logger info function for console when running main server
export const loggerInfo = (req, res, next) => {
  logger.info(
    `${req.method} ${req.url} - ${req.ip} - ${req.headers["user-agent"]}`
  );
  next();
};
