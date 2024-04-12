import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./models/index.js";
import { logger } from "./config/logger.js";
import { cashierRouter } from "./routes/cashier-route.js";
import { adminRouter } from "./routes/admin-route.js";
import { verifyRouter } from "./routes/verify-route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(
    `${req.method} ${req.url} - ${req.ip} - ${req.headers["user-agent"]}`
  );
  next();
});

db.authenticate()
  .then(() => {
    logger.info("Connection has been established successfully.");
  })
  .catch((error) => {
    logger.error("Unable to connect to the database:", error);
  });

app.use(cookieParser());
app.use(verifyRouter);
app.use(cashierRouter);
app.use(adminRouter);

app.listen(process.env.SERVER_PORT, () => {
  logger.info(`Server is running on port ${process.env.SERVER_PORT}`);
});
