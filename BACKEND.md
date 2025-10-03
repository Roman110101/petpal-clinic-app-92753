# 🚀 Backend Server Setup

## 📡 **Серверная часть успешно запущена!**

### 🔧 **Что установлено:**

- ✅ **Express сервер** на порту 3001
- ✅ **SQLite база данных** для хранения пользователей
- ✅ **JWT авторизация** с токенами
- ✅ **CORS настройки** для фронтенда
- ✅ **Валидация данных** и обработка ошибок

## 🛠 **Доступные API endpoints:**

### 📊 **Проверка статуса:**
```
GET http://localhost:3001/api/health
```

### 🔐 **Авторизация:**
```
POST http://localhost:3001/api/auth/register
Content-Type: application/json
{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Имя",
  "lastName": "Фамилия",
  "phone": "+7(999) 123-45-67"
}

POST http://localhost:3001/api/auth/login
Content-Type: application/json
{
  "email": "test@example.com", 
  "password": "password123"
}

GET http://localhost:3001/api/auth/validate
Authorization: Bearer <token>
```

## 🚀 **Команды запуска:**

### **Запуск только сервера:**
```bash
npm run server:dev
```

### **Запуск фронтенда и сервера одновременно:**
```bash
npm run dev:full
```

## 🎮 **Демо тестирование:**

### **Демо credentials для быстрого тестирования:**
- **Email:** `admin@test.com`
- **Пароль:** `demo123`
- **Режим:** Демо режим (мокированные данные)

### **Реальная регистрация:**
- Любой валидный email
- Пароль минимум 6 символов
- Полная валидация на фронтенде и бэкенде

## 📂 **Структура файлов:**

```
server/
├── simple-server.cjs     # Основной сервер (простой)
├── server.cjs            # Полный сервер с БД
└── src/                  # TypeScript версия (для будущего)
    ├── index.ts          # Основной файл сервера
    ├── models/           # Модели данных
    ├── controllers/      # Логика обработки запросов
    ├── routes/           # API маршруты
    ├── middleware/       # Промежуточное ПО
    └── database/         # Настройки БД
```

## 🔒 **Безопасность:**

- ✅ Пароли хешируются с bcryptjs
- ✅ JWT токены с истечением (7 дней)
- ✅ Валидация email и password
- ✅ CORS настройки для безопасности
- ✅ Обработка ошибок и логирование

## 📱 **Frontend интеграция:**

Сервис `authService.ts` автоматически:
- Сохраняет токены в localStorage
- Добавляет Authorization headers
- Обрабатывает ошибки сети
- Восстанавливает сессию при перезагрузке

## 🎯 **Готово к использованию!**

Сервер готов для полноценной регистрации и авторизации пользователей!
