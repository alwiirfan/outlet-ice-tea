import express from "express";
import roleController from "../controllers/role-controller.js";
import { verifyTokenAdmin } from "../middlewares/auth-middleware.js";
import authController from "../controllers/auth-controller.js";
import cashierController from "../controllers/cashier-controller.js";
import adminController from "../controllers/admin-controller.js";
import unitController from "../controllers/unit-controller.js";
import rawMaterialSupplierController from "../controllers/raw-material-supplier-controller.js";

const adminRouter = express.Router();

// auth cashiers
adminRouter.post(
  "/api/v1/auth/register-cashier",
  verifyTokenAdmin,
  authController.registerCashier
);

// roles
adminRouter.get("/api/v1/roles", verifyTokenAdmin, roleController.getAll);

// cashiers
adminRouter.get("/api/v1/cashiers", verifyTokenAdmin, cashierController.getAll);

// admins
adminRouter.get(
  "/api/v1/admins/:id",
  verifyTokenAdmin,
  adminController.getById
);
adminRouter.put("/api/v1/admins", verifyTokenAdmin, adminController.update);

// units
adminRouter.post("/api/v1/units", verifyTokenAdmin, unitController.create);
adminRouter.get("/api/v1/units", verifyTokenAdmin, unitController.getAll);

// raw material supplier
adminRouter.post(
  "/api/v1/raw-material-suppliers",
  verifyTokenAdmin,
  rawMaterialSupplierController.create
);
adminRouter.get(
  "/api/v1/raw-material-suppliers",
  verifyTokenAdmin,
  rawMaterialSupplierController.getAll
);
adminRouter.get(
  "/api/v1/raw-material-suppliers/:id",
  verifyTokenAdmin,
  rawMaterialSupplierController.getById
);

export { adminRouter };
