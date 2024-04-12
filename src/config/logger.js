import { createLogger, format, transports } from "winston";
const { combine, timestamp, prettyPrint } = format;

export const logger = createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [new transports.Console()],
});
