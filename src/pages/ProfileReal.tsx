import React, { useState, useEffect } from 'react';
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
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

const ProfileReal = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      
      // Получаем текущего пользователя через Supabase
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setCurrentUser(user);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      toast.error('Ошибка загрузки данных пользователя');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.logout();
      toast.success('Вы вышли из системы');
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Ошибка при выходе');
    }
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
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
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
          <Card className="p-4 active:scale-[0.98] transition-transform cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Мои питомцы</h4>
                <p className="text-sm text-muted-foreground">Добавляйте и управляйте информацией о ваших любимцах</p>
              </div>
              <div className="text-xs text-blue-600 font-medium">{'Скоро →'}</div>
            </div>
          </Card>

          {/* Записи */}
          <Card className="p-4 active:scale-[0.98] transition-transform cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Записи на приём</h4>
                <p className="text-sm text-muted-foreground">Бронируйте время для визита к ветеринару</p>
              </div>
              <div className="text-xs text-blue-600 font-medium">{'Скоро →'}</div>
            </div>
          </Card>

          {/* История */}
          <Card className="p-4 active:scale-[0.98] transition-transform cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">История посещений</h4>
                <p className="text-sm text-muted-foreground">Просматривайте результаты анализов и рекомендации</p>
              </div>
              <div className="text-xs text-blue-600 font-medium">{'Скоро →'}</div>
              </div>
            </div>
          </Card>

          {/* Настройки */}
          <Card className="p-4 active:scale-[0.98] transition-transform cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Настройки профиля</h4>
                <p className="text-sm text-muted-foreground">Измените личную информацию и предпочтения</p>
              </div>
              <div className="text-xs text-blue-600 font-medium">{'Скоро →'}</div>
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

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default ProfileReal;
