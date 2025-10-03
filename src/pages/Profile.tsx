import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { auth } from "@/services/unifiedAuthService";
import { supabase } from "@/lib/supabaseClient";
import { 
  User, 
  LogOut, 
  PawPrint, 
  Calendar,
  Heart,
  Settings,
  CheckCircle,
  Camera
} from "lucide-react";
import { toast } from "sonner";

const ProfileReal = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const avatarInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadUserData();
    
    // Обработчик для предотвращения ошибок при обновлении страницы
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Предотвращаем показ диалога подтверждения
      e.preventDefault();
    };

    // Обработчик для mobile refresh
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Страница снова стала видимой, перезагружаем данные
        loadUserData();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      
      // Получаем текущего пользователя через Supabase
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Auth error:', error);
        // Если ошибка авторизации, перенаправляем на логин
        navigate('/auth');
        return;
      }
      
      if (user) {
        setCurrentUser(user);
      } else {
        // Если пользователь не авторизован, перенаправляем на авторизацию
        navigate('/auth');
        return;
      }
    } catch (error: any) {
      console.error('Error loading user:', error);
      
      // Проверяем тип ошибки
      if (error?.code === 'PGRST301' || error?.message?.includes('JWT')) {
        // Ошибка токена - перенаправляем на авторизацию
        navigate('/auth');
      } else {
        // Другие ошибки - показываем сообщение
        toast.error('Ошибка загрузки данных пользователя');
        // Не перенаправляем сразу, даем пользователю возможность повторить
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.logout();
      toast.success('Вы вышли из системы');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Ошибка при выходе');
    }
  };

  const handleAvatarUpload = (file: File) => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const avatarUrl = e.target?.result as string;
      setUserAvatar(avatarUrl);
      toast.success('Аватар обновлён!');
    };
    reader.readAsDataURL(file);
  };

  const triggerAvatarInput = () => {
    avatarInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen pt-16">
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загружаем данные...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-16">
      {/* Header */}
      <PageHeader 
        title="Личный кабинет"
        subtitle={`Добро пожаловать, ${currentUser?.user_metadata?.firstName || 'Пользователь'}!`}
      >
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Выйти
        </Button>
      </PageHeader>

      {/* User Info */}
      <section className="px-4 mb-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                {userAvatar ? (
                  <img 
                    src={userAvatar} 
                    alt="Аватар пользователя"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-primary" />
                )}
              </div>
              <button 
                onClick={triggerAvatarInput}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs hover:bg-primary/80 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {currentUser?.user_metadata?.firstName} {currentUser?.user_metadata?.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
              <div className="flex items-center gap-1 mt-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600">Аккаунт подтверждён</span>
              </div>
            </div>
          </div>
          
          {currentUser?.user_metadata?.phone && (
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Телефон:</span> {currentUser.user_metadata.phone}
            </div>
          )}
        </Card>
      </section>

      {/* Features */}
      <section className="px-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Доступные функции</h3>
        <div className="grid gap-4">
          
          {/* Питомцы */}
          <Card className="p-4 active:scale-[0.98] transition-transform cursor-pointer" onClick={() => navigate('/my-pets')}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Мои питомцы</h4>
                <p className="text-sm text-muted-foreground">Добавляйте и управляйте информацией о ваших любимцах</p>
              </div>
              <div className="text-xs text-green-600 font-medium">{'✅ Доступно →'}</div>
            </div>
          </Card>

          {/* Записи */}
          <Card className="p-4 active:scale-[0.98] transition-transform cursor-pointer" onClick={() => navigate('/appointment')}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Записи на приём</h4>
                <p className="text-sm text-muted-foreground">Выберите врача, дату и время для записи</p>
                <div className="mt-2 flex gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Выбор врача</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Дата и время</span>
                  </span>
                </div>
              </div>
              <div className="text-xs text-green-600 font-medium">{'✅ Активно →'}</div>
            </div>
          </Card>

          {/* История */}
          <Card className="p-4 active:scale-[0.98] transition-transform cursor-pointer" onClick={() => navigate('/visit-history')}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">История посещений</h4>
                <p className="text-sm text-muted-foreground">Просматривайте результаты анализов и рекомендации</p>
              </div>
              <div className="text-xs text-green-600 font-medium">{'✅ Активно →'}</div>
            </div>
          </Card>

          {/* Настройки */}
          <Card className="p-4 active:scale-[0.98] transition-transform cursor-pointer" onClick={() => navigate('/settings')}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Настройки профиля</h4>
                <p className="text-sm text-muted-foreground">Измените личную информацию и предпочтения</p>
              </div>
              <div className="text-xs text-green-600 font-medium">{'✅ Активно →'}</div>
            </div>
          </Card>
        </div>
      </section>

      {/* Status */}
      <section className="px-4 mb-6">
        <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800 dark:text-green-200">
              Ваш аккаунт успешно создан и готов к использованию!
            </span>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300 mt-2">
            Теперь вы можете использовать все функции личного кабинета. Скоро здесь появятся карточки питомцев, система записи и история визитов.
          </p>
        </Card>
      </section>

      {/* Hidden file input for avatar upload */}
      <input 
        type="file" 
        ref={avatarInputRef} 
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleAvatarUpload(e.target.files[0]);
          }
        }} 
        className="hidden" 
        accept="image/*"
      />

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default ProfileReal;
