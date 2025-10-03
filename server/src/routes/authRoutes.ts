import express from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Публичные маршруты
router.post('/register', register);
router.post('/login', login);

// Защищенные маршруты
router.get('/profile', authenticateToken, getProfile());
router.put('/profile', authenticateToken, updateProfile);

// Проверка токена
router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Токен действителен',
    userId: (req as any).userId
  });
});

export { router as authRoutes };
