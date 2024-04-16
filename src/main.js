import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDatabase } from "./models/index.js";
import { logger, loggerInfo } from "./configs/logger.js";
import { cashierRouter } from "./routes/cashier-route.js";
import { adminRouter } from "./routes/admin-route.js";
import { verifyRouter } from "./routes/verify-route.js";
import { publicRouter } from "./routes/public-route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggerInfo);

connectDatabase();

app.use(cookieParser());
app.use(publicRouter, verifyRouter, cashierRouter, adminRouter);

app.listen(process.env.SERVER_PORT, () => {
  logger.info(`Server is running on port ${process.env.SERVER_PORT}`);
});
