import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel, CreateUserData, LoginData } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'vet-more-secret-key-2024';
const JWT_EXPIRES_IN = '7d';

// Генерация JWT токена
const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Регистрация пользователя
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName, phone }: CreateUserData = req.body;

    // Валидация обязательных полей
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email и пароль обязательны'
      });
      return;
    }

    // Простая валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Некорректный email адрес'
      });
      return;
    }

    // Валидация пароля (минимум 6 символов)
    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: 'Пароль должен содержать минимум 6 символов'
      });
      return;
    }

    // Создаем пользователя
    const user = await UserModel.createUser({
      email,
      password,
      firstName,
      lastName,
      phone
    });

    // Генерируем токен
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      message: 'Пользователь успешно зарегистрирован',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone
        },
        token
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.message === 'Пользователь с таким email уже существует') {
      res.status(409).json({
        success: false,
        message: 'Пользователь с таким email уже существует'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Ошибка при регистрации пользователя'
      });
    }
  }
};

// Авторизация пользователя
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: LoginData = req.body;

    // Валидация обязательных полей
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email и пароль обязательны'
      });
      return;
    }

    // Проверяем пароль
    const user = await UserModel.validatePassword(email, password);

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Неверный email или пароль'
      });
      return;
    }

    // Генерируем токен
    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: 'Успешная авторизация',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone
        },
        token
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при авторизации'
    });
  }
};

// Получение текущего пользователя
export const getProfile = () => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId; // Из middleware
      
      const user = await UserModel.getUserById(userId);
      
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Пользователь не найден'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: { user }
      });
    } catch (error: any) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Ошибка при получении профиля'
      });
    }
  };
};

// Обновление профиля
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const { firstName, lastName, phone, email, password } = req.body;

    const updateData: any = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (phone !== undefined) updateData.phone = phone;
    if (email !== undefined) updateData.email = email;
    if (password !== undefined) updateData.password = password;

    const user = await UserModel.updateUser(userId, updateData);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'Пользователь не найден'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Профиль успешно обновлен',
      data: { user }
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при обновлении профиля'
    });
  }
};
