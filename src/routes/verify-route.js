import express from "express";
import authController from "../controllers/auth-controller.js";
import { verifyToken } from "../middlewares/auth-middleware.js";

const verifyRouter = express.Router();

verifyRouter.put(
  "/api/v1/auth/change-password",
  verifyToken,
  authController.changePassword
);
verifyRouter.delete("/api/v1/auth/logout", verifyToken, authController.logout);

export { verifyRouter };
