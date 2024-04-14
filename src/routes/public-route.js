import express from "express";
import authController from "../controllers/auth-controller.js";

const publicRouter = express.Router();

publicRouter.post("/api/v1/register-admin", authController.registerAdmin);
publicRouter.post("/api/v1/login-admin", authController.loginAdmin);

publicRouter.post("/api/v1/login-cashier", authController.loginCashier);

publicRouter.get("/api/v1/refresh", authController.refreshToken);

export { publicRouter };
