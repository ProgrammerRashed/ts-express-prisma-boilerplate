import { NextFunction, Request, Response } from "express";

import { AnyZodObject, z } from "zod";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedBody = await schema.parseAsync(req.body);
      req.body = parsedBody; 
      return next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;