import express from "express";
import authController from "../controllers/auth-controller";

const publicRouter = express.Router();

publicRouter.post("/api/v1/login-cashier", authController.loginCashier);
publicRouter.get("/api/v1/cashiers/refresh", authController.refreshToken);

export { publicRouter };
