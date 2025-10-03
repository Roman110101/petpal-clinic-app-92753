import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  User, 
  LogOut, 
  ChevronDown,
  Settings,
  Heart
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

interface UserMenuProps {
  onOpenAuth: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onOpenAuth }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentUser(null);
      toast.success('Вы вышли из системы');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Ошибка при выходе');
    }
  };

  const openProfile = () => {
    setIsMenuOpen(false);
    navigate('/profile');
  };

  const openAppointment = () => {
    setIsMenuOpen(false);
    navigate('/appointment');
  };

  if (isLoading) {
    return (
      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
    );
  }

  if (!currentUser) {
    return (
      <button
        onClick={onOpenAuth}
        className="w-10 h-10 flex items-center justify-center bg-primary/20 dark:bg-primary/30 rounded-lg shadow-sm hover:bg-primary/30 dark:hover:bg-primary/40 transition-colors"
        aria-label="Вход в систему"
      >
        <User className="w-5 h-5 text-primary dark:text-primary" />
      </button>
    );
  }

  // Функция получения инициалов
  const getInitials = (firstName?: string, lastName?: string) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    } else if (firstName) {
      return firstName[0].toUpperCase();
    } else {
      return currentUser.email?.[0].toUpperCase() || 'П';
    }
  };

  const initials = getInitials(
    currentUser.user_metadata?.firstName,
    currentUser.user_metadata?.lastName
  );

  return (
    <div className="relative">
      {/* Кнопка пользователя */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-2 bg-primary/15 dark:bg-primary/25 rounded-lg px-3 py-2 hover:bg-primary/25 dark:hover:bg-primary/35 transition-colors"
        aria-label="Меню пользователя"
      >
        {/* Аватар с инициалами */}
        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
          {initials}
        </div>
        
        {/* Имя */}
        <span className="text-sm font-medium text-primary hidden sm:block max-w-20 truncate">
          {currentUser.user_metadata?.firstName || 'Пользователь'}
        </span>
        
        {/* Стрелка */}
        <ChevronDown 
          className={`w-3 h-3 text-primary transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Выпадающее меню */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <Card className="p-2 min-w-48 shadow-lg border">
            <div className="space-y-1">
              {/* Информация о пользователе */}
              <div className="px-3 py-2 border-b border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                    {initials}
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {currentUser.user_metadata?.firstName} {currentUser.user_metadata?.lastName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {currentUser.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Кнопки меню */}
              <button
                onClick={openProfile}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
              >
                <User className="w-4 h-4" />
                Личный кабинет
              </button>

              <button
                onClick={openAppointment}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
              >
                <Heart className="w-4 h-4" />
                Запись на приём
              </button>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/settings');
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
              >
                <Settings className="w-4 h-4" />
                Настройки
              </button>

              {/* Разделитель */}
              <div className="border-t border-border/50 my-1"></div>

              {/* Выход */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Выйти
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Оверлей для закрытия меню */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};
