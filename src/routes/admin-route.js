import express from "express";
import roleController from "../controllers/role-controller.js";
import { verifyTokenAdmin } from "../middlewares/auth-middleware.js";
import authController from "../controllers/auth-controller.js";
import cashierController from "../controllers/cashier-controller.js";

const adminRouter = express.Router();

adminRouter.post("/api/v1/register-cashier", authController.registerCashier);

adminRouter.post("/api/v1/roles", roleController.create);

adminRouter.get("/api/v1/cashiers", cashierController.getAll);

export { adminRouter };
