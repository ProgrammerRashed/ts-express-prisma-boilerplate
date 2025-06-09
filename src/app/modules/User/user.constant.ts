export const userSearchAbleFields: string[] = ["email"];
import { UserRole } from "@prisma/client";

export const userFilterableFields: string[] = [
  "email",
  "role",
  "status",
  "searchTerm",
];



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
