import jwt from "jsonwebtoken";
import type { UserPayload } from "../types/auth.js";

const SECRET = process.env.JWT_SECRET || ""


function generateToken(user: UserPayload) {
  return jwt.sign({
    id: user.id,
    email: user.email,
    name: user.name
  }, SECRET, { expiresIn: "1h" })
}


function verifyToken(token: string): UserPayload {
  return jwt.verify(token, SECRET) as UserPayload
}


export { generateToken, verifyToken }
