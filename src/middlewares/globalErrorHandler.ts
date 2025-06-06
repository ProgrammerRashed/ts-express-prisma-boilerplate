import logger from "@helpers/logger";
import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

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

  // Handle Prisma validation error (e.g., wrong data types)
  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = "Validation error";
    errorDetails = err.message;
  }

  // Handle known Prisma request errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2000":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Input value is too long for the column type.";
        errorDetails = err.meta;
        break;
      case "P2001":
        statusCode = StatusCodes.UNAUTHORIZED;
        message = "Record not found for the specified condition.";
        errorDetails = err.meta;
        break;
      case "P2002":
        statusCode = StatusCodes.CONFLICT;
        message = "Unique constraint failed (duplicate key).";
        errorDetails = err.meta;
        break;
      case "P2003":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Foreign key constraint failed.";
        errorDetails = err.meta;
        break;
      case "P2004":
        statusCode = StatusCodes.FORBIDDEN;
        message = "A constraint failed on the database.";
        errorDetails = err.meta;
        break;
      case "P2005":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Invalid value for column.";
        errorDetails = err.meta;
        break;
      case "P2006":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Missing required value for field.";
        errorDetails = err.meta;
        break;
      case "P2007":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Data validation error.";
        errorDetails = err.meta;
        break;
      case "P2008":
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        message = "Failed to parse query.";
        errorDetails = err.meta;
        break;
      case "P2010":
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        message = "Raw query failed.";
        errorDetails = err.meta;
        break;
      case "P2011":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Null constraint violation.";
        errorDetails = err.meta;
        break;
      case "P2012":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Missing required argument.";
        errorDetails = err.meta;
        break;
      case "P2013":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Missing required arguments for relation.";
        errorDetails = err.meta;
        break;
      case "P2014":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Invalid relation.";
        errorDetails = err.meta;
        break;
      case "P2015":
        statusCode = StatusCodes.UNAUTHORIZED;
        message = "Related record not found.";
        errorDetails = err.meta;
        break;
      case "P2016":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Query interpretation error.";
        errorDetails = err.meta;
        break;
      case "P2025":
        statusCode = StatusCodes.UNAUTHORIZED;
        message = "Record not found.";
        errorDetails = err.meta;
        break;
      case "P2023":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Inconsistent query parameters.";
        errorDetails = err.meta;
        break;
      case "P2022":
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Column not found in database.";
        errorDetails = err.meta;
        break;
      default:
        message = "Database error";
        errorDetails = {
          code: err.code,
          meta: err.meta,
        };
        break;
    }
  }

  // Log full error for internal debugging
  logger.error(`❌ ${err.message}`, {
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
    body: req.body,
  });

  // Send client-safe response
  res.status(statusCode).json({
    success,
    message,
    error: process.env.NODE_ENV === "production" ? undefined : errorDetails,
  });
};

export default globalErrorHandler;
