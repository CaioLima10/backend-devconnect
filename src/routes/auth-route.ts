import { Router } from "express";
import { AuthController } from "../controllers/auth-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { validatePasswordMiddleware } from "../middleware/validate-password-middleware.js";

const authRoute = Router()
const authController = new AuthController()

authRoute.post("/register", validatePasswordMiddleware, authController.register)
authRoute.post("/login", authController.login)
authRoute.get("/me", authMiddleware, authController.getMe)

export { authRoute }