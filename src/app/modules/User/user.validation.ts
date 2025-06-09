import { UserRole } from "@prisma/client";
import { z } from "zod";
const UserRoleEnum = z.nativeEnum(UserRole);

export const createUserSchema = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  name: z.string({
    required_error: "Name is required",
  }),
  email: z.string({
    required_error: "Email is required",
  }),
  role: UserRoleEnum.optional(),
});


export const UserValidation = {
  createUserSchema,
};
