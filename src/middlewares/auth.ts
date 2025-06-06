import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../helpers/jwtHelpers";
import config from "../config";
import { StatusCodes } from "http-status-codes";
import AppError from "./AppError";

const auth = (...roles: string[]) => {
  return async (req: Request & {user?: any}, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Your are unauthorized");
      }
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.access_secret as Secret
      );

      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new AppError(StatusCodes.FORBIDDEN, "Access denied. Forbidden.");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;