import { Router } from "express";
import { AuthController } from "../controllers/auth-controller.js";

const authRoute = Router()
const authController = new AuthController()

authRoute.post("/auth", authController.register)

export { authRoute }