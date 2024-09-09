// src/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user?.role === 'admin') {
    return next();
  }
  res.status(403).json({ message: 'Forbidden: You cant access this domain' });
};

export const isCashier = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user?.role === 'cashier') {
    return next();
  }
  res.status(403).json({ message: 'Forbidden: You cant access this domain' });
};

export const isStockManager = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user?.role === 'stock_manager') {
    return next();
  }
  res.status(403).json({ message: 'Forbidden' });
};
