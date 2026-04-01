import type { Request, Response } from "express";
import { AuthServices } from "../services/auth-services.js";

const authServices = new AuthServices()

class AuthController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body

    try {
      const user = await authServices.register(name, email, password)
      res.status(201).json(user)
    } catch (error) {
      res.status(400).json("Usuario não cadastrado!")
    }
  }
}

export { AuthController }