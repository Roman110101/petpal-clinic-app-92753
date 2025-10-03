const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Тестовый маршрут
app.get('/api/health', (req, res) => {
  console.log('✅ Health check called');
  res.json({ 
    status: 'OK', 
    message: 'Vet Center MORE API is running!',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test', (req, res) => {
  console.log('✅ Test endpoint called');
  res.json({ 
    success: true,
    message: 'Backend server is working!'
  });
});

// Регистрация (базовая версия)
app.post('/api/auth/register', (req, res) => {
  console.log('👤 Register attempt:', req.body.email);
  
  const { email, password, firstName, lastName, phone } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email и пароль обязательны'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Пароль должен содержать минимум 6 символов'
    });
  }

  // Моделируем успешную регистрацию
  const mockUser = {
    id: 1,
    email: email.toLowerCase(),
    firstName: firstName || null,
    lastName: lastName || null,
    phone: phone || null
  };

  const mockToken = 'mock-jwt-token-' + Date.now();

  console.log('✅ User registered successfully:', email);

  res.status(201).json({
    success: true,
    message: 'Пользователь успешно зарегистрирован (demo режим)',
    data: { user: mockUser, token: mockToken }
  });
});

// Авторизация (базовая версия)
app.post('/api/auth/login', (req, res) => {
  console.log('🔐 Login attempt:', req.body.email);
  
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email и пароль обязательны'
    });
  }

  // Простая проверка для демо
  if (password === 'demo123') {
    const mockUser = {
      id: 1,
      email: email.toLowerCase(),
      firstName: 'Demo',
      lastName: 'User',
      phone: '+7 (999) 123-45-67'
    };

    const mockToken = 'mock-jwt-token-' + Date.now();

    console.log('✅ Login successful:', email);

    res.status(200).json({
      success: true,
      message: 'Успешная авторизация (demo режим)',
      data: { user: mockUser, token: mockToken }
    });
  } else {
    console.log('❌ Login failed:', email);
    res.status(401).json({
      success: false,
      message: 'Для демо используйте пароль: demo123'
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

  console.log('🔍 Token validation:', token.substring(0, 20) + '...');

  res.json({
    success: true,
    message: 'Токен действителен (demo режим)',
    userId: 1
  });
});

// Обработчик всех остальных маршрутов  
app.get('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Обработчик ошибок
app.use((error, req, res, next) => {
  console.error('❌ Server error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 SERVER STARTED!`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📡 Register: http://localhost:${PORT}/api/auth/register`);
  console.log(`📡 Login: http://localhost:${PORT}/api/auth/login`);
  console.log(`📊 Demo credentials: admin@test.com / demo123`);
});

// Обработка завершения процесса
process.on('SIGINT', () => {
  console.log('\n📁 Shutting down server...');
  process.exit(0);
});
