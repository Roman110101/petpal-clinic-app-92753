// Переменные окружения для разработки
// В продакшене эти значения должны быть установлены через .env файл

export const config = {
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'vet-more-super-secret-key-change-in-production-2024',
  DATABASE_URL: process.env.DATABASE_URL || 'sqlite:./database/vetMore.db'
};

export default config;
