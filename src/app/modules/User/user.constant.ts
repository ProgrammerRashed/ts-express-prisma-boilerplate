export const userSearchAbleFields: string[] = ["email"];
import { UserRole } from "@prisma/client";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export const userFilterableFields: string[] = [
  "email",
  "role",
  "status",
  "searchTerm",
];
export interface RequestWithUser extends Request {
  user?: JwtPayload;
}


export const safeUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};


export type TAuthUser = {
  email: string;
  role: UserRole;
} | null;
