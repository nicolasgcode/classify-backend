import { Request, Response, NextFunction } from 'express';

/**
 * A generic function to sanitize input based on provided keys.
 *
 * @param fields - Array of fields that need to be sanitized
 */

// middlewares/sanitizeInput.ts

export function sanitizeInput(fields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    req.body.sanitizedInput = {};

    fields.forEach((field) => {
      const value = req.body[field];

      if (value !== undefined && value !== null) {
        if (typeof value === 'string') {
          req.body.sanitizedInput[field] = value.trim();
        } else if (Array.isArray(value)) {
          req.body.sanitizedInput[field] = value.map((item) => {
            if (typeof item === 'string' && !isNaN(Number(item))) {
              return Number(item);
            }
            return item;
          });
        } else if (typeof value === 'number') {
          req.body.sanitizedInput[field] = value;
        }
      }
    });

    // Remove any undefined or empty values
    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (!req.body.sanitizedInput[key]) {
        delete req.body.sanitizedInput[key];
      }
    });

    next();
  };
}
