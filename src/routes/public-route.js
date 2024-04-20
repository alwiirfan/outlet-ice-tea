import express from "express";
import authController from "../controllers/auth-controller.js";
import roleController from "../controllers/role-controller.js";

const publicRouter = express.Router();

publicRouter.post("/api/v1/auth/register-admin", authController.registerAdmin);
publicRouter.post("/api/v1/auth/login-admin", authController.loginAdmin);
publicRouter.get(
  "/api/v1/auth/activate-account/:token",
  authController.activateAccount
);
publicRouter.post(
  "/api/v1/auth/forget-password",
  authController.forgetPassword
);
publicRouter.get(
  "/api/v1/auth/reset-password/:id/:token",
  authController.getResetPassword
);
publicRouter.put("/api/v1/auth/reset-password", authController.resetPassword);

publicRouter.post("/api/v1/auth/login-cashier", authController.loginCashier);

publicRouter.get("/api/v1/auth/refresh", authController.refreshToken);

publicRouter.post("/api/v1/roles", roleController.create);

export { publicRouter };
