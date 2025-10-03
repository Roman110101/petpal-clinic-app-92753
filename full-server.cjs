const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8085', 'https://petpal-clinic-app-92753.vercel.app'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

console.log('🚀 Setting up routes...');

// ===============================
// AUTHENTICATION ENDPOINTS
// ===============================

// Регистрация
app.post('/api/auth/register', async (req, res) => {
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

  // Сохраняем пользователя в память (в продакшене - в БД)
  const userId = Date.now();
  const mockUser = {
    id: userId,
    email: email.toLowerCase(),
    firstName: firstName || null,
    lastName: lastName || null,
    phone: phone || null
  };

  const mockToken = 'token-' + userId + '-' + Date.now();

  console.log('✅ User registered successfully:', email);

  res.status(201).json({
    success: true,
    message: 'Пользователь успешно зарегистрирован',
    data: { user: mockUser, token: mockToken }
  });
});

// Авторизация
app.post('/api/auth/login', (req, res) => {
  console.log('🔐 Login attempt:', req.body.email);
  
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email и пароль обязательны'
    });
  }

  // Демо проверка
  if (email === 'admin@test.com' && password === 'demo123') {
    const mockUser = {
      id: 1,
      email: email.toLowerCase(),
      firstName: 'Демо',
      lastName: 'Пользователь',
      phone: '+7 (999) 123-45-67'
    };

    const mockToken = 'token-1-' + Date.now();

    console.log('✅ Login successful:', email);

    res.status(200).json({
      success: true,
      message: 'Успешная авторизация',
      data: { user: mockUser, token: mockToken }
    });
  } else {
    console.log('❌ Login failed:', email);
    res.status(401).json({
      success: false,
      message: 'Неверный email или пароль'
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
    message: 'Токен действителен',
    userId: 1
  });
});

// ===============================
// PETS MANAGEMENT ENDPOINTS  
// ===============================

// Получить всех питомцев пользователя
app.get('/api/pets', (req, res) => {
  console.log('🐕 Get pets for user');
  
  // Демо данные питомцев
  const pets = [
    {
      id: 1,
      userId: 1,
      name: "Барсик",
      species: "cat",
      breed: "Мейн-кун",
      age: 3,
      color: "Рыжий",
      weight: 5.2,
      height: 25,
      chip: "250268007612345",
      notes: "Любит играть с мячиками",
      avatar: null
    },
    {
      id: 2,
      userId: 1,
      name: "Рекс",
      species: "dog", 
      breed: "Немецкая овчарка",
      age: 2,
      color: "Черно-подпалый",
      weight: 28.5,
      height: 45,
      chip: "250268007612346",
      notes: "Очень активный, нуждается в длительных прогулках",
      avatar: null
    }
  ];

  res.json({
    success: true,
    data: pets
  });
});

// Создать нового питомца
app.post('/api/pets', (req, res) => {
  console.log('🐕 Create new pet:', req.body.name);
  
  const { name, species, breed, age, color, weight, height, chip, notes } = req.body;

  if (!name || !species) {
    return res.status(400).json({
      success: false,
      message: 'Имя и вид питомца обязательны'
    });
  }

  const newPet = {
    id: Date.now(),
    userId: 1,
    name,
    species,
    breed: breed || null,
    age: age || null,
    color: color || null,
    weight: weight || null,
    height: height || null,
    chip: chip || null,
    notes: notes || null,
    avatar: null
  };

  res.status(201).json({
    success: true,
    message: 'Питомец успешно добавлен',
    data: newPet
  });
});

// Обновить питомца
app.put('/api/pets/:id', (req, res) => {
  console.log('🐕 Update pet:', req.params.id);
  
  const { name, species, breed, age, color, weight, height, chip, notes } = req.body;

  const updatedPet = {
    id: parseInt(req.params.id),
    userId: 1,
    name: name || "Обновленный питомец",
    species: species || "cat",
    breed: breed || null,
    age: age || null,
    color: color || null,
    weight: weight || null,
    height: height || null,
    chip: chip || null,
    notes: notes || null,
    avatar: null
  };

  res.json({
    success: true,
    message: 'Данные питомца обновлены',
    data: updatedPet
  });
});

// Удалить питомца
app.delete('/api/pets/:id', (req, res) => {
  console.log('🗑️ Delete pet:', req.params.id);
  
  res.json({
    success: true,
    message: 'Питомец удален'
  });
});

// ===============================
// APPOINTMENTS ENDPOINTS
// ===============================

// Получить записи пользователя
app.get('/api/appointments', (req, res) => {
  console.log('📅 Get appointments');
  
  const appointments = [
    {
      id: 1,
      userId: 1,
      petId: 1,
      petName: "Барсик",
      service: "Первичный прием",
      appointmentDate: "2024-01-15T10:00:00",
      status: "confirmed",
      notes: "Плановый осмотр",
      createdAt: "2024-01-10T09:00:00"
    },
    {
      id: 2,
      userId: 1,
      petId: 2,
      petName: "Рекс",
      service: "Вакцинация",
      appointmentDate: "2024-01-20T14:00:00", 
      status: "pending",
      notes: "Годовые прививки",
      createdAt: "2024-01-12T11:30:00"
    }
  ];

  res.json({
    success: true,
    data: appointments
  });
});

// Создать запись
app.post('/api/appointments', (req, res) => {
  console.log('📅 Create appointment:', req.body.service);
  
  const { petId, petName, service, appointmentDate, notes } = req.body;

  if (!petId || !service || !appointmentDate) {
    return res.status(400).json({
      success: false,
      message: 'Все поля обязательны для заполнения'
    });
  }

  const newAppointment = {
    id: Date.now(),
    userId: 1,
    petId,
    petName: petName || "Барсик",
    service,
    appointmentDate,
    status: "pending",
    notes: notes || null,
    createdAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: 'Запись на прием создана',
    data: newAppointment
  });
});

// ===============================
// HEALTH & OTHER ENDPOINTS
// ===============================

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

console.log('📝 All routes configured!');

// Обработчик ошибок
app.use((error, req, res, next) => {
  console.error('❌ Server error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: 'Something went down'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 SERVER STARTED SUCCESSFULLY!`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth: POST http://localhost:${PORT}/api/auth/login`);
  console.log(`🐕 Pets: GET/POST/PUT/DELETE http://localhost:${PORT}/api/pets`);
  console.log(`📅 Appointments: GET/POST http://localhost:${PORT}/api/appointments`);
  console.log(`📊 Demo: admin@test.com / demo123`);
});

// Обработка завершения процесса
process.on('SIGINT', () => {
  console.log('\n📁 Shutting down server...');
  process.exit(0);
});
