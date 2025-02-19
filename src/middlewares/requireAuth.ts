import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  console.log(authHeader);

  if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (user && (user as JwtPayload).admin !== undefined) {
      req.user = { admin: (user as JwtPayload).admin };
      next();
    } else {
      return res.status(401).json({ message: 'No admin found in token' });
    }
  });
};
