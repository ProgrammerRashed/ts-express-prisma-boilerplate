import { createLogger, format, transports } from "winston";
import path from 'path';
import { FormatFn } from "morgan";

export const morganErrorLogFormat: FormatFn = (tokens, req, res) => {
  return [
    "METHOD:", tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res), 'ms'
  ].join(' ');
};

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message }) => {
        const levelPadded = level.toUpperCase().padEnd(7); 
        return `${timestamp} | ${levelPadded} | ${message}`;
      })
      
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, '../logs/combined.log') }),
  ],
});

export default logger;
