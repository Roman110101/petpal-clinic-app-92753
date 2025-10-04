import https from 'https';
import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Создаем самоподписанный сертификат для разработки

let serverOptions = {};

try {
  // Пытаемся найти существующие сертификаты
  if (fs.existsSync('./cert.pem') && fs.existsSync('./key.pem')) {
    serverOptions = {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem')
    };
    console.log('✅ Используем существующие сертификаты');
  } else {
    console.log('🔐 Создаем самоподписанный сертификат для разработки...');
    
    // Создаем самоподписанный сертификат
    execSync('openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=RU/ST=Moscow/L=Moscow/O=Dev/CN=localhost"', { stdio: 'inherit' });
    
    serverOptions = {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem')
    };
    
    console.log('✅ Сертификат создан успешно');
  }
} catch (error) {
  console.warn('⚠️ Не удалось создать сертификат, запускаем без HTTPS');
  console.warn('⚠️ Для работы камеры требуется HTTPS!');
}

// Настройка CORS для всех запросов
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Обслуживаем статические файлы из dist
app.use(express.static(path.join(__dirname, 'dist')));

// Обслуживаем все остальные запросы через index.html (для SPA)
app.get('*', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } catch (error) {
    res.status(404).send('File not found');
  }
});

const PORT = process.env.PORT || 8443;

if (serverOptions.key && serverOptions.cert) {
  // Запускаем HTTPS сервер
  const server = https.createServer(serverOptions, app);
  
  server.listen(PORT, () => {
    console.log(`🚀 HTTPS сервер запущен на https://localhost:${PORT}`);
    console.log(`📹 Камера должна работать по этому адресу!`);
    console.log(`⚠️  Браузер может показать предупреждение о безопасности - это нормально для самоподписанного сертификата`);
    console.log(`💡 Нажмите "Продолжить" или "Advanced -> Proceed to localhost` + `"`);
  });
} else {
  // Fallback на HTTP (камера не будет работать)
  app.listen(PORT, () => {
    console.log(`🚀 HTTP сервер запущен на http://localhost:${PORT}`);
    console.log(`⚠️  ВНИМАНИЕ: Камера НЕ будет работать по HTTP!`);
    console.log(`💡 Для работы камеры требуется HTTPS`);
  });
}
