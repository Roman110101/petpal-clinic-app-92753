const API_BASE_URL = 'http://localhost:3001/api';

export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

class AuthService {
  private token: string | null = null;
  private user: User | null = null;

  constructor() {
    // Восстанавливаем token и user из localStorage при инициализации
    this.token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        this.user = JSON.parse(savedUser);
      } catch (error) {
        console.error('Ошибка при восстановлении пользователя:', error);
        localStorage.removeItem('user');
      }
    }
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    // Добавляем Authorization header если есть token
    if (this.token) {
      defaultHeaders['Authorization'] = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка запроса');
      }

      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.success && response.data) {
        this.token = response.data.token;
        this.user = response.data.user;
        
        // Сохраняем в localStorage
        localStorage.setItem('authToken', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
      }

      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Ошибка при регистрации');
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.success && response.data) {
        this.token = response.data.token;
        this.user = response.data.user;
        
        // Сохраняем в localStorage
        localStorage.setItem('authToken', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
      }

      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Ошибка при авторизации');
    }
  }

  async validateToken(): Promise<boolean> {
    if (!this.token) {
      return false;
    }

    try {
      const response = await this.request('/auth/validate');
      return response.success;
    } catch (error) {
      console.error('Token validation failed:', error);
      // Если токен недействителен, очищаем данные
      this.logout();
      return false;
    }
  }

  logout(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  // Геттеры
  get currentUser(): User | null {
    return this.user;
  }

  get isAuthenticated(): boolean {
    return !!this.token && !!this.user;
  }

  get authToken(): string | null {
    return this.token;
  }

  // Метод для проверки состояния сервера
  async checkServerHealth(): Promise<boolean> {
    try {
      const response = await this.request('/health');
      return response.status === 'OK';
    } catch (error) {
      console.error('Server health check failed:', error);
      return false;
    }
  }
}

// Создаем единственный экземпляр сервиса
export const authService = new AuthService();

// Экспортируем типы
export type { AuthResponse, LoginData, RegisterData };
