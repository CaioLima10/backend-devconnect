import { prisma } from "../lib/prisma.js";

class AuthServices {
  async register(name: string, email: string, password: string) {

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      }
    })

    return user
  }
}

export { AuthServices }