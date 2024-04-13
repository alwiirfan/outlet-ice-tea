import express from "express";
import { verifyTokenCashier } from "../middlewares/auth-middleware.js";
import cashierController from "../controllers/cashier-controller.js";

const cashierRouter = express.Router();

cashierRouter.get(
  "/api/v1/cashiers/:id",
  verifyTokenCashier,
  cashierController.getById
);
cashierRouter.put(
  "/api/v1/cashiers",
  verifyTokenCashier,
  cashierController.update
);

export { cashierRouter };
