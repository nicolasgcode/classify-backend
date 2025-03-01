import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Access the token from cookies
  const token = req.cookies.auth_token;

  // Check if token exists
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      if (decoded && decoded.admin !== undefined) {
        req.user = { admin: decoded.admin };
        next();
      } else {
        return res.status(401).json({ message: 'No admin found in token' });
      }
    }
  );
};
