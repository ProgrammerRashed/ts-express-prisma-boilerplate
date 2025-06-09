import logger from "@helpers/logger";
import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "./AppError";
import { ZodError } from "zod";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = "Something went wrong!";
  let errorDetails: any = {};


  console.log("error for app", err)
  // ✅ Handle AppError (custom error class)
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorDetails = err.stack;
  }


  // Inside globalErrorHandler
  else if (err instanceof ZodError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = "Validation error";
    errorDetails = err.issues.map(issue => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  }

  // ✅ Handle Prisma validation error (e.g., wrong data types)
  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = "Validation error";
    errorDetails = err.message;
  }

  // ✅ Handle known Prisma request errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2000":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Input value is too long for the column type.";
        break;
      case "P2001":
        statusCode = StatusCodes.UNAUTHORIZED;
        message = "Record not found for the specified condition.";
        break;
      case "P2002":
        statusCode = StatusCodes.CONFLICT;
        message = "Unique constraint failed (duplicate key).";
        break;
      case "P2003":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Foreign key constraint failed.";
        break;
      case "P2004":
        statusCode = StatusCodes.FORBIDDEN;
        message = "A constraint failed on the database.";
        break;
      case "P2005":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Invalid value for column.";
        break;
      case "P2006":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Missing required value for field.";
        break;
      case "P2007":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Data validation error.";
        break;
      case "P2008":
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        message = "Failed to parse query.";
        break;
      case "P2010":
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        message = "Raw query failed.";
        break;
      case "P2011":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Null constraint violation.";
        break;
      case "P2012":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Missing required argument.";
        break;
      case "P2013":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Missing required arguments for relation.";
        break;
      case "P2014":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Invalid relation.";
        break;
      case "P2015":
        statusCode = StatusCodes.UNAUTHORIZED;
        message = "Related record not found.";
        break;
      case "P2016":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Query interpretation error.";
        break;
      case "P2025":
        statusCode = StatusCodes.UNAUTHORIZED;
        message = "Record not found.";
        break;
      case "P2023":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Inconsistent query parameters.";
        break;
      case "P2022":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Column not found in database.";
        break;
      default:
        message = "Database error";
        break;
    }

    errorDetails = {
      code: err.code,
      meta: err.meta,
    };
  }

  // ✅ Log the error
  logger.error(`❌ ${err.message}`, {
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
    body: req.body,
  });

  // ✅ Send a clean response
  res.status(statusCode).json({
    success,
    message,
    error: process.env.NODE_ENV === "production" ? undefined : errorDetails,
  });
};

export default globalErrorHandler;
