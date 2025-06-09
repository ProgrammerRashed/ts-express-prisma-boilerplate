import express from "express";

import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";
import { UserRole } from "@prisma/client";
import auth from "@middleware/auth";
import validateRequest from "@middleware/validationRequest";
const router = express.Router();

router.get(
  "/all-users",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  UserController.getAllUserFromDB
);

router.get(
  "/specific/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  UserController.getSingleUserFromDB
);

router.get(
  "/me",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  UserController.myProfile
);

router.post(
  "/create-user",
  validateRequest(UserValidation.createUser),
  UserController.createUser
);

router.patch(
  "/update-my-profile",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  UserController.updateMyProfile
);

export const UserRoutes = router;
