import { Response } from "express";
import logger from "@helpers/logger";

const SendResponse = <T>(res: Response, jsonData: {
  statusCode: number,
  success: boolean,
  message: string,
  meta?: {
    page: number,
    limit: number,
    total: number
  },
  data: T | null | undefined
}) => {
  const { statusCode, success, message, meta, data } = jsonData;
  logger.info(`↩️ Response Sent | ${statusCode} | ${success ? 'SUCCESS' : 'FAILURE'} | ${message}`);
  res.status(statusCode).json({
    success,
    message,
    meta: meta || null,
    data: data || null
  });
};

export default SendResponse;
