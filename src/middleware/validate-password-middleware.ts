import type { NextFunction, Request, Response } from "express";

function validatePasswordMiddleware(req: Request, res: Response, next: NextFunction) {
  const { password } = req.body

  const regexUppercaseLetter = /^[A-Z]/
  const regexLowerCaseLetter = /[a-z]/
  const regexSpecialLetter = /[\W_]/
  const regexNumberLetter = /\d/

  if (!password) {
    return res.status(400).json({ error: "Senha é obrigatória" });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Senha precisa ter no mínimo 8 caracteres" })
  }

  if (!regexUppercaseLetter.test(password)) {
    return res.status(400).json({ json: "Primeira letra deve ser maiúscula" })
  }

  if (!regexLowerCaseLetter.test(password)) {
    return res.status(400).json({ json: "Precisa ter letra minúscula" })
  }

  if (!regexSpecialLetter.test(password)) {
    return res.status(400).json({ json: "Precisa ter caracter especial" })
  }

  if (!regexNumberLetter.test(password)) {
    return res.status(400).json({ json: "Precisa ter numero!" })
  }

  next()
}

export { validatePasswordMiddleware }