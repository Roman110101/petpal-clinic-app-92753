import { dbGet, dbRun, dbAll } from '../database/database';
import bcrypt from 'bcryptjs';

export interface User {
  id: number;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export class UserModel {
  // Создание нового пользователя
  static async createUser(userData: CreateUserData): Promise<User> {
    try {
      // Хешируем пароль
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      const query = `
        INSERT INTO users (email, password, firstName, lastName, phone)
        VALUES (?, ?, ?, ?, ?)
      `;

      const result = await dbRun(query, [
        userData.email.toLowerCase(),
        hashedPassword,
        userData.firstName || null,
        userData.lastName || null,
        userData.phone || null
      ]);

      // Получаем созданного пользователя (без пароля)
      const user = await this.getUserById((result as any).lastID);
      return user!;
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        throw new Error('Пользователь с таким email уже существует');
      }
      throw error;
    }
  }

  // Получение пользователя по ID
  static async getUserById(id: number): Promise<User | null> {
    try {
      const query = 'SELECT id, email, firstName, lastName, phone, createdAt, updatedAt FROM users WHERE id = ?';
      const user = await dbGet(query, [id]) as User;
      return user || null;
    } catch {
      return null;
    }
  }

  // Получение пользователя по email
  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const query = 'SELECT * FROM users WHERE email = ?';
      const user = await dbGet(query, [email.toLowerCase()]) as User;
      return user || null;
    } catch {
      return null;
    }
  }

  // Проверка пароля
  static async validatePassword(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) return null;

      const isValidPassword = await bcrypt.compare(password, user.password!);
      if (!isValidPassword) return null;

      // Возвращаем пользователя без пароля
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    } catch {
      return null;
    }
  }

  // Обновление пользователя
  static async updateUser(id: number, updateData: Partial<CreateUserData>): Promise<User | null> {
    try {
      const updates: string[] = [];
      const values: any[] = [];

      if (updateData.firstName !== undefined) {
        updates.push('firstName = ?');
        values.push(updateData.firstName);
      }
      if (updateData.lastName !== undefined) {
        updates.push('lastName = ?');
        values.push(updateData.lastName);
      }
      if (updateData.phone !== undefined) {
        updates.push('phone = ?');
        values.push(updateData.phone);
      }
      if (updateData.email !== undefined) {
        updates.push('email = ?');
        values.push(updateData.email.toLowerCase());
      }
      if (updateData.password !== undefined) {
        updates.push('password = ?');
        const hashedPassword = await bcrypt.hash(updateData.password, 12);
        values.push(hashedPassword);
      }

      if (updates.length === 0) {
        return await this.getUserById(id);
      }

      updates.push('updatedAt = CURRENT_TIMESTAMP');
      values.push(id);

      const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
      await dbRun(query, values);

      return await this.getUserById(id);
    } catch {
      return null;
    }
  }

  // Получение всех пользователей (для админки)
  static async getAllUsers(): Promise<User[]> {
    try {
      const query = 'SELECT id, email, firstName, lastName, phone, createdAt, updatedAt FROM users ORDER BY createdAt DESC';
      const users = await dbAll(query) as User[];
      return users || [];
    } catch {
      return [];
    }
  }

  // Удаление пользователя
  static async deleteUser(id: number): Promise<boolean> {
    try {
      const query = 'DELETE FROM users WHERE id = ?';
      await dbRun(query, [id]);
      return true;
    } catch {
      return false;
    }
  }
}
