import type { Request } from "express";

export interface UserPayload {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}