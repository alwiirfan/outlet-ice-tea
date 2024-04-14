import express from "express";
import roleController from "../controllers/role-controller.js";
import { verifyTokenAdmin } from "../middlewares/auth-middleware.js";
import authController from "../controllers/auth-controller.js";
import cashierController from "../controllers/cashier-controller.js";
import adminController from "../controllers/admin-controller.js";

const adminRouter = express.Router();

adminRouter.post(
  "/api/v1/register-cashier",
  verifyTokenAdmin,
  authController.registerCashier
);

adminRouter.post("/api/v1/roles", verifyTokenAdmin, roleController.create);
adminRouter.get("/api/v1/roles", verifyTokenAdmin, roleController.getAll);

adminRouter.get("/api/v1/cashiers", verifyTokenAdmin, cashierController.getAll);

adminRouter.get(
  "/api/v1/admins/:id",
  verifyTokenAdmin,
  adminController.getById
);
adminRouter.put("/api/v1/admins", verifyTokenAdmin, adminController.update);

export { adminRouter };
