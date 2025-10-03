import { supabase } from '@/lib/supabaseClient';

export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
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

class SupabaseAuthService {
  private user: User | null = null;

  constructor() {
    // Восстанавливаем пользователя из Supabase сессии
    this.initSession();
  }

  private async initSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        this.user = this.transformUser(session.user);
      }
    } catch (error) {
      console.error('Ошибка при восстановлении сессии:', error);
    }
  }

  private transformUser(supabaseUser: any): User {
    return {
      id: parseInt(supabaseUser.id),
      email: supabaseUser.email,
      firstName: supabaseUser.user_metadata?.firstName || null,
      lastName: supabaseUser.user_metadata?.lastName || null,
      phone: supabaseUser.user_metadata?.phone || null,
    };
  }

  async register(data: RegisterData): Promise<{ success: boolean; message: string; data?: { user: User; token: any } }> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
          }
        }
      });

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      if (authData.user) {
        this.user = this.transformUser(authData.user);
        return {
          success: true,
          message: 'Пользователь успешно зарегистрирован',
          data: {
            user: this.user,
            token: authData.session
          }
        };
      }

      return {
        success: false,
        message: 'Ошибка при регистрации'
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.message || 'Ошибка при регистрации'
      };
    }
  }

  async login(data: LoginData): Promise<{ success: boolean; message: string; data?: { user: User; token: any } }> {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        return {
          success: false,
          message: 'Неверный email или пароль'
        };
      }

      if (authData.user) {
        this.user = this.transformUser(authData.user);
        return {
          success: true,
          message: 'Успешная авторизация',
          data: {
            user: this.user,
            token: authData.session
          }
        };
      }

      return {
        success: false,
        message: 'Ошибка при авторизации'
      };
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message || 'Ошибка при авторизации'
      };
    }
  }

  async validateToken(): Promise<boolean> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      return !error && !!session;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  }

  logout(): void {
    supabase.auth.signOut();
    this.user = null;
  }

  // Геттеры
  get currentUser(): User | null {
    return this.user;
  }

  get isAuthenticated(): boolean {
    return !!this.user;
  }

  get authToken(): any {
    return supabase.auth.getSession();
  }

  // Подписка на изменения авторизации
  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      this.user = session?.user ? this.transformUser(session.user) : null;
      callback(this.user);
    });
  }

  // Метод для проверки состояния сервера
  async checkServerHealth(): Promise<boolean> {
    try {
      const { data, error } = await supabase.from('health').select('status').limit(1);
      return !error;
    } catch (error) {
      console.error('Supabase health check failed:', error);
      return false;
    }
  }
}

// Создаем единственный экземпляр сервиса
export const supabaseAuthService = new SupabaseAuthService();

// Экспортируем типы
export type { LoginData, RegisterData };
