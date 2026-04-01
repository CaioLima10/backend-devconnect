import { Router } from "express";
import { authRoute } from "./auth-route.js";

const route = Router()

route.use(authRoute)

export { route }