import type { NextFunction, Response } from "express";
import { verifyToken } from "../utils/jwt.js";
import type { AuthRequest } from "../types/auth.js";

function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "token não fornecido!" })
  }

  const token = authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "token invalido!" })
  }

  try {
    const decoded = verifyToken(token)

    req.user = decoded

    return next()

  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado!" });

  }
}

export { authMiddleware }