import express from "express";
import { verifyTokenCashier } from "../middlewares/auth-middleware.js";
import authController from "../controllers/auth-controller.js";
import cashierController from "../controllers/cashier-controller.js";

const cashierRouter = express.Router();

cashierRouter.post("/api/v1/login-cashier", authController.loginCashier);
cashierRouter.get(
  "/api/v1/cashiers/refresh",
  authController.refreshCashierToken
);

cashierRouter.post(
  "/api/v1/cashiers",
  verifyTokenCashier,
  authController.loginCashier
);

cashierRouter.get(
  "/api/v1/cashiers/:id",
  verifyTokenCashier,
  cashierController.getById
);

export { cashierRouter };
