import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt.js";

class AuthServices {
  async register(name: string, email: string, password: string) {

    const existsUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (existsUser) {
      throw new Error("Usuario já esta cadastrado!")
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    })

    return user
  }

  async login(email: string, password: string) {

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) {
      throw new Error("Usuario não foi cadastrado!")
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      throw new Error("Senha ou email invalido!")
    }

    const { password: _, ...userWithoutPassword } = user

    const token = generateToken(user)

    return { user: userWithoutPassword, token }
  }

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true
      }
    })

    if (!user) {
      throw new Error("Usuario não encontrado!")
    }

    return user
  }

}

export { AuthServices }