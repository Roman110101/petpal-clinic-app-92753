import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Функция для определения MIME типа
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

// Простой HTTP/HTTPS сервер
const requestHandler = (req, res) => {
  // CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  let filePath = path.join(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url);
  
  // Проверяем, что файл находится в dist директории (безопасность)
  if (!filePath.startsWith(path.join(__dirname, 'dist'))) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  
  // Если файл не найден, возвращаем index.html (для SPA)
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'dist', 'index.html');
  }
  
  try {
    const data = fs.readFileSync(filePath);
    const mimeType = getMimeType(filePath);
    
    res.writeHead(200, {
      'Content-Type': mimeType,
      'Content-Length': data.length
    });
    res.end(data);
  } catch (error) {
    res.writeHead(404);
    res.end('File not found');
  }
};

const PORT = process.env.PORT || 8443;

if (serverOptions.key && serverOptions.cert) {
  // Запускаем HTTPS сервер
  const server = https.createServer(serverOptions, requestHandler);
  
  server.listen(PORT, () => {
    console.log(`🚀 HTTPS сервер запущен на https://localhost:${PORT}`);
    console.log(`📹 Камера должна работать по этому адресу!`);
    console.log(`⚠️  Браузер может показать предупреждение о безопасности - это нормально для самоподписанного сертификата`);
    console.log(`💡 Нажмите "Продолжить" или "Advanced -> Proceed to localhost` + `"`);
  });
} else {
  console.log('❌ Не удалось запустить HTTPS сервер');
  process.exit(1);
}
