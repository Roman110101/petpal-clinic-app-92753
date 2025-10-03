const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'vet-more-super-secret-key-change-in-production-2024';

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://petpal-clinic-app-92753.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// База данных
const dbPath = path.join(__dirname, 'database', 'vetMore.db');
const db = new sqlite3.Database(dbPath);

// Инициализация базы данных
const initDatabase = () => {
  db.serialize(() => {
    // Таблица пользователей
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        firstName TEXT,
        lastName TEXT,
        phone TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Database initialized successfully!');
  });
};

// Инициализируем БД
initDatabase();

// Генерация JWT токена
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

// Регистрация
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    // Валидация
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email и пароль обязательны'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Некорректный email адрес'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Пароль должен содержать минимум 6 символов'
      });
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 12);

    // Создаем пользователя
    const query = `
      INSERT INTO users (email, password, firstName, lastName, phone)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(query, [
      email.toLowerCase(),
      hashedPassword,
      firstName || null,
      lastName || null,
      phone || null
    ], function(err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          return res.status(409).json({
            success: false,
            message: 'Пользователь с таким email уже существует'
          });
        }
        console.error('Registration error:', err);
        return res.status(500).json({
          success: false,
          message: 'Ошибка при регистрации пользователя'
        });
      }

      // Генерируем токен
      const token = generateToken(this.lastID);

      // Возвращаем пользователя без пароля
      const user = {
        id: this.lastID,
        email: email.toLowerCase(),
        firstName: firstName || null,
        lastName: lastName || null,
        phone: phone || null
      };

      res.status(201).json({
        success: true,
        message: 'Пользователь успешно зарегистрирован',
        data: { user, token }
      });
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при регистрации пользователя'
    });
  }
});

// Авторизация
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email и пароль обязательны'
      });
    }

    // Ищем пользователя
    const query = 'SELECT * FROM users WHERE email = ?';
    db.get(query, [email.toLowerCase()], async (err, user) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({
          success: false,
          message: 'Ошибка при авторизации'
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Неверный email или пароль'
        });
      }

      // Проверяем пароль
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Неверный email или пароль'
        });
      }

      // Генерируем токен
      const token = generateToken(user.id);

      // Возвращаем пользователя без пароля
      const userResponse = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      };

      res.status(200).json({
        success: true,
        message: 'Успешная авторизация',
        data: { user: userResponse, token }
      });
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при авторизации'
    });
  }
});

// Проверка токена
app.get('/api/auth/validate', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Токен авторизации отсутствует'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Токен авторизации истек'
        });
      }
      return res.status(403).json({
        success: false,
        message: 'Недействительный токен авторизации'
      });
    }

    res.json({
      success: true,
      message: 'Токен действителен',
      userId: decoded.userId
    });
  });
});

// Тестовый маршрут
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Vet Center MORE API is running!',
    timestamp: new Date().toISOString()
  });
});

// Обработчик всех остальных маршрутов
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    error: 'Internal server error'
  });
});

// Закрытие соединения с БД при завершении процесса
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('❌ Error closing database:', err);
    } else {
      console.log('📁 Database connection closed.');
    }
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📡 Register: http://localhost:${PORT}/api/auth/register`);
  console.log(`📡 Login: http://localhost:${PORT}/api/auth/login`);
});
