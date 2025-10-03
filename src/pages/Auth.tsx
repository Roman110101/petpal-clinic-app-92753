import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { auth as authService, checkServerHealth, RegisterData, LoginData } from "@/services/unifiedAuthService";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowLeft,
  PawPrint,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<'unknown' | 'online' | 'offline'>('unknown');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();

  // Проверяем статус сервера при загрузке компонента
  const checkServerStatus = async () => {
    try {
      const isOnline = await checkServerHealth();
      setServerStatus(isOnline ? 'online' : 'offline');
    } catch (error) {
      setServerStatus('offline');
    }
  };

  // Вызываем проверку при первой загрузке
  React.useEffect(() => {
    checkServerStatus();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email адрес';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    // Registration specific validations
    if (!isLogin) {
      // Password confirmation
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Подтвердите пароль';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают';
      }

      // Name validation
      if (!formData.firstName?.trim()) {
        newErrors.firstName = 'Имя обязательно';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Вход
        const loginData: LoginData = {
          email: formData.email,
          password: formData.password
        };

        const result = await authService.login(loginData);
        
        console.log('Login result:', result); // Для диагностики
        
        if (result.success) {
          toast.success('Успешный вход в систему!');
          navigate('/profile');
        } else {
          console.error('Login failed:', result);
          toast.error(result.message || 'Ошибка при входе');
          if (result.message?.includes('email')) {
            toast.info('💡 Возможно нужно подтвердить email перед входом');
          }
        }
      } else {
        // Регистрация
        const registerData: RegisterData = {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone
        };

        const result = await authService.register(registerData);
        
        console.log('Registration result:', result); // Для диагностики
        
        if (result.success) {
          toast.success('🎉 Регистрация прошла успешно!');
          
          // Показываем кнопку для перехода на почту
          toast.custom((t) => (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border max-w-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Подтвердите email!
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Мы отправили письмо на <strong>{formData.email}</strong>
                  </p>
                  <button
                    onClick={() => {
                      // Определяем домен почты и открываем
                      const emailDomain = formData.email.split('@')[1];
                      
                      // Специальные инструкции для разных почтовых сервисов
                      const emailInstructions = {
                        'gmail.com': { 
                          url: 'https://gmail.com',
                          note: 'Проверьте папку "Входящие" или "Спам"'
                        },
                        'yandex.ru': { 
                          url: 'https://mail.yandex.ru',
                          note: '✅ Проверьте папку "Рассылки" в Яндекс почте - письма приходят туда!'
                        },
                        'mail.ru': { 
                          url: 'https://mail.ru',
                          note: 'Проверьте папку "Входящие" или "Спам"'
                        },
                        'yahoo.com': { 
                          url: 'https://mail.yahoo.com',
                          note: 'Проверьте папку "Входящие", может попасть в "Спам"'
                        },
                        'outlook.com': { 
                          url: 'https://outlook.com',
                          note: 'Проверьте все папки, включая "Спам"'
                        },
                        'hotmail.com': { 
                          url: 'https://hotmail.com',
                          note: 'Проверьте все папки, включая "Спам"'
                        }
                      };
                      
                      const instruction = emailInstructions[emailDomain as keyof typeof emailInstructions];
                      if (instruction) {
                        window.open(instruction.url, '_blank');
                        toast.dismiss(t);
                        toast.success('✅ Почта открыта!');
                        toast.info(instruction.note);
                      } else {
                        toast.info('Откройте свой почтовый ящик вручную');
                        toast.info('📧 Проверьте папку "Спам" - письма часто попадают туда');
                      }
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    📧 Открыть почту
                  </button>
                  {/* Дополнительная кнопка для проблемных доменов */}
                  {formData.email.includes('yandex.') && (
                    <button
                      onClick={async () => {
                        try {
                          const registerData = {
                            email: formData.email,
                            password: 'temp123', // временный пароль
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            phone: formData.phone
                          };
                          
                          await authService.register(registerData);
                          toast.info('📧 Повторное письмо отправлено на Яндекс');
                          toast.info('⚠️ Если письмо не приходит, попробуйте Gmail');
                        } catch (error) {
                          toast.error('Ошибка при повторной отправке');
                        }
                      }}
                      className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      🔄 Отправить повторно для Яндекс
                    </button>
                  )}
                  
                  <button
                    onClick={() => toast.dismiss(t)}
                    className="w-full mt-2 text-gray-500 hover:text-gray-700 text-sm py-1 transition-colors"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          ), { duration: 10000 });
          
          setIsLogin(true); // Переключаемся на форму входа
          setFormData({
            firstName: "",
            lastName: "",
            email: formData.email, // Сохраняем email для удобства
            phone: "",
            password: "",
            confirmPassword: ""
          });
        } else {
          console.error('Registration failed:', result);
          toast.error(result.message || 'Ошибка при регистрации');
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error('Произошла ошибка при авторизации');
    } finally {
      setIsLoading(false);
    }
  };

    const handleInputChange = (field: string, value: string) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
      
      // Очищаем ошибку для этого поля при изменении
      if (errors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: ''
        }));
      }
    };

  return (
    <div className="bg-background min-h-screen pt-16 ios-scroll-fix">
      {/* Header */}
      <div className="px-4 mt-6">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="w-10 h-10 p-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isLogin ? 'Вход' : 'Регистрация'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLogin ? 'Войдите в личный кабинет' : 'Создайте аккаунт для вашего питомца'}
            </p>
          </div>
        </div>
      </div>

      {/* Auth Form */}
      <section className="px-4">
        <Card className="p-6">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center">
              <img 
                src="/new-logo.png" 
                alt="Логотип клиники Море" 
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Ветеринарный центр «Море»
            </h2>
          </div>

          {/* Server Status Indicator */}
          <div className="mb-4 p-3 rounded-lg text-sm flex items-center gap-2">
            {serverStatus === 'online' ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-700">Сервер онлайн - авторизация доступна</span>
              </>
            ) : serverStatus === 'offline' ? (
              <>
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-700">Сервер недоступен - демо режим</span>
              </>
            ) : (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                <span className="text-blue-700">Проверяем подключение...</span>
              </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name fields (only for registration) */}
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="firstName" className="text-foreground text-sm mb-2 block">
                    Имя
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Введите ваше имя"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`pl-10 h-12 ${errors.firstName ? 'border-red-500 focus:border-red-500' : ''}`}
                      required={!isLogin}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-foreground text-sm mb-2 block">
                    Фамилия (необязательно)
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Введите вашу фамилию"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email field */}
            <div>
              <Label htmlFor="email" className="text-foreground text-sm mb-2 block">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-10 h-12 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone field (only for registration) */}
            {!isLogin && (
              <div>
                <Label htmlFor="phone" className="text-foreground text-sm mb-2 block">
                  Телефон
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10 h-12"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Password field */}
            <div>
              <Label htmlFor="password" className="text-foreground text-sm mb-2 block">
                Пароль
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Введите пароль"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`pl-10 pr-10 h-12 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
              {!isLogin && (
                <div className="text-xs text-muted-foreground mt-1">
                  <p>После регистрации проверьте email для подтверждения</p>
                  <p className="text-blue-600 font-medium mt-1">
                    💡 Совет: Если используете Яндекс, проверьте папку "Рассылки"
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password field (only for registration) */}
            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword" className="text-foreground text-sm mb-2 block">
                  Подтвердите пароль
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Повторите пароль"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`pl-10 h-12 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''}`}
                    required={!isLogin}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isLoading || serverStatus === 'offline'}
              className="w-full h-12 text-base font-medium mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {isLogin ? 'Вход...' : 'Регистрация...'}
                </>
              ) : (
                isLogin ? 'Войти' : 'Зарегистрироваться'
              )}
            </Button>
          </form>

          {/* Toggle Login/Register */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-primary font-medium hover:underline"
              >
                {isLogin ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </p>
          </div>

          {/* Forgot Password (only for login) */}
          {isLogin && (
            <div className="text-center mt-4">
              <button className="text-sm text-primary hover:underline">
                Забыли пароль?
              </button>
            </div>
          )}
        </Card>
      </section>

      {/* Benefits */}
      <section className="px-4 mt-6 mb-6">
        <Card className="p-4 bg-primary/5 border-primary/20">
          <h3 className="font-semibold text-foreground mb-3">Преимущества личного кабинета:</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span>История всех визитов и процедур</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span>Напоминания о прививках и осмотрах</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span>Онлайн запись к врачам</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <span>Персональные рекомендации</span>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Auth;
