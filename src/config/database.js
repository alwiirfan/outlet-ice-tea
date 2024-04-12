import { Sequelize } from "sequelize";
import { logger } from "../config/logger.js";
import "dotenv/config";

export const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging:
      process.env.NODE_ENV === "development"
        ? (message) => logger.info(message)
        : false,
  }
);

export default db;
