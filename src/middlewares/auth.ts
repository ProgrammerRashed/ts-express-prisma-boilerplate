import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../helpers/jwtHelpers";
import config from "../config";
import { StatusCodes } from "http-status-codes";
import AppError from "./AppError";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "You are unauthorized");
      }

      // 🛠️ Extract the token only
      const token = authHeader.split(" ")[1];

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.access_secret as Secret
      );

      // Setting user to body 
      req.body = verifiedUser
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