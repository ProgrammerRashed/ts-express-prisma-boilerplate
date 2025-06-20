import {logger} from "@helpers/logger";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  logger.warn(`⚠️ 404 - API NOT FOUND - Path: ${req.originalUrl} - Method: ${req.method}`);

  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "API not found!",
    error: {
      path: req.originalUrl,
      message: "You are trying to access wrong route!",
    },
  });
};

export default notFoundHandler;
