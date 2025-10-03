import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'vet-more-secret-key-2024';

export interface AuthRequest extends Request {
  userId?: number;
}

// Middleware для проверки токена авторизации
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Токен авторизации отсутствует'
    });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        res.status(401).json({
          success: false,
          message: 'Токен авторизации истек'
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Недействительный токен авторизации'
        });
      }
      return;
    }

    req.userId = decoded.userId;
    next();
  });
};

// Опциональная авторизация (для публичных маршрутов с пользовательскими данными)
export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    next();
    return;
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      next(); // Продолжаем без авторизации
    } else {
      req.userId = decoded.userId;
      next();
    }
  });
};
