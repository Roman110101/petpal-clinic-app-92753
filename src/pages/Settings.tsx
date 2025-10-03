import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/PageHeader";
import { AuthGuard } from "@/components/AuthGuard";
import { supabase } from "@/lib/supabaseClient";
import { 
  User, 
  Bell, 
  Shield, 
  Palette,
  Smartphone,
  Globe,
  Save,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    notifications: true,
    darkMode: false,
    language: 'ru'
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setCurrentUser(user);
        setFormData({
          firstName: user.user_metadata?.firstName || '',
          lastName: user.user_metadata?.lastName || '',
          phone: user.user_metadata?.phone || '',
          email: user.email || '',
          notifications: true,
          darkMode: false,
          language: 'ru'
        });
      }
    } catch (error) {
      console.error('Error loading user:', error);
      toast.error('Ошибка загрузки данных пользователя');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Здесь можно добавить обновление профиля через Supabase
      toast.success('Настройки сохранены!');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Ошибка при сохранении настроек');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen pt-16">
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загружаем настройки...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="bg-background min-h-screen pt-16">
        {/* Header */}
        <PageHeader 
          title="Настройки"
          subtitle="Управление профилем и предпочтениями"
        />

        {/* Content */}
        <div className="px-4 mt-6 space-y-6">
          
          {/* Profile Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Личная информация</h3>
                <p className="text-sm text-muted-foreground">Основные данные профиля</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Введите имя"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Введите фамилию"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground mt-1">Email нельзя изменить</p>
              </div>

              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Уведомления</h3>
                <p className="text-sm text-muted-foreground">Настройки оповещений</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h4 className="font-medium">Напоминания о прививках</h4>
                  <p className="text-sm text-muted-foreground">Уведомления о сроках вакцинации</p>
                </div>
                <Button
                  variant={formData.notifications ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, notifications: !prev.notifications }))}
                >
                  {formData.notifications ? "Включено" : "Выключено"}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h4 className="font-medium">Напоминания о записях</h4>
                  <p className="text-sm text-muted-foreground">Оповещения о предстоящих визитах</p>
                </div>
                <Button
                  variant="default"
                  size="sm"
                >
                  Включено
                </Button>
              </div>
            </div>
          </Card>

          {/* Appearance Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Palette className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Внешний вид</h3>
                <p className="text-sm text-muted-foreground">Тема и язык интерфейса</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="language">Язык интерфейса</Label>
                <select
                  id="language"
                  value={formData.language}
                  onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h4 className="font-medium">Тёмная тема</h4>
                  <p className="text-sm text-muted-foreground">Переключается автоматически</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">Авто</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Безопасность</h3>
                <p className="text-sm text-muted-foreground">Защита аккаунта</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800 dark:text-green-200">Email подтверждён</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Ваш email адрес подтверждён и защищён
                </p>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800 dark:text-yellow-200">Двухфакторная аутентификация</span>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                  Рекомендуем включить для дополнительной защиты
                </p>
                <Button variant="outline" size="sm" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                  Включить 2FA
                </Button>
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="pb-6">
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Сохранение...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить настройки
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-20"></div>
      </div>
    </AuthGuard>
  );
};

export default Settings;
