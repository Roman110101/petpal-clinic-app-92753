import { authService } from './authService';
import { supabaseAuthService } from './supabaseAuthService';

// Проверяем доступность Supabase
const useSupabase = !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Auth Service:', useSupabase ? 'Supabase' : 'Local Server');

// Экспортируем нужнный сервис авторизации
export const auth = useSupabase ? supabaseAuthService : authService;

// Проверка статуса сервера/подключения
export const checkServerHealth = async (): Promise<boolean> => {
  if (useSupabase) {
    try {
      // Для Supabase проверяем подключение через простой запрос
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/`, {
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  } else {
    // Для локального сервера
    return authService.checkServerHealth();
  }
};

// Экспортируем типы
export type { User, LoginData, RegisterData } from './authService';

// Экспортируем дополнительные методы Supabase если доступны
export const onAuthStateChange = useSupabase ? supabaseAuthService.onAuthStateChange.bind(supabaseAuthService) : undefined;
