import { Request, Response, NextFunction } from 'express';

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.admin === true) {
    return next();
  } else {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
};
