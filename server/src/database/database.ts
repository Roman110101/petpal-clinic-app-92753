import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';

const dbPath = path.join(__dirname, '../../database/vetMore.db');

export const db = new sqlite3.Database(dbPath);

// Создаем промисы для асинхронной работы
export const dbRun = promisify(db.run.bind(db));
export const dbGet = promisify(db.get.bind(db));
export const dbAll = promisify(db.all.bind(db));

export const initDatabase = async () => {
  try {
    // Создаем таблицу пользователей
    await dbRun(`
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

    // Создаем таблицу питомцев
    await dbRun(`
      CREATE TABLE IF NOT EXISTS pets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        name TEXT NOT NULL,
        species TEXT CHECK(species IN ('dog', 'cat', 'bird', 'hamster', 'other')),
        breed TEXT,
        age INTEGER,
        color TEXT,
        weight REAL,
        height REAL,
        chip TEXT,
        notes TEXT,
        avatar TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
      )
    `);

    // Создаем таблицу записей на прием
    await dbRun(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        petId INTEGER,
        service TEXT NOT NULL,
        appointmentDate DATETIME NOT NULL,
        status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'cancelled', 'completed')),
        notes TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (petId) REFERENCES pets (id) ON DELETE SET NULL
      )
    `);

    // Создаем таблицу прививок
    await dbRun(`
      CREATE TABLE IF NOT EXISTS vaccinations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        petId INTEGER NOT NULL,
        vaccinationName TEXT NOT NULL,
        vaccinationDate DATE NOT NULL,
        nextDueDate DATE,
        veterinarian TEXT,
        notes TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (petId) REFERENCES pets (id) ON DELETE CASCADE
      )
    `);

    // Создаем таблицу истории посещений
    await dbRun(`
      CREATE TABLE IF NOT EXISTS visitHistory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        petId INTEGER NOT NULL,
        visitDate DATE NOT NULL,
        diagnosis TEXT,
        treatment TEXT,
        veterinarian TEXT,
        cost REAL,
        notes TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (petId) REFERENCES pets (id) ON DELETE CASCADE
      )
    `);

    console.log('✅ Database tables created successfully!');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
};

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
