import type { Request, Response } from "express";
import { AuthServices } from "../services/auth-services.js";
import type { AuthRequest } from "../types/auth.js";

const authServices = new AuthServices()

class AuthController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body

    try {
      const user = await authServices.register(name, email, password)
      res.status(201).json(user)
    } catch (error) {
      res.status(400).json("Usuario já foi cadastrado!")
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body

    try {
      const user = await authServices.login(email, password)
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json("Senha ou email invalido!")
    }
  }

  async getMe(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id

      if (!userId) {
        return res.status(400).json({ error: "Usuário não autenticado!" })
      }
      const user = await authServices.getMe(userId)

      res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ error: "Erro interno no servidor." })
    }
  }
}

export { AuthController }