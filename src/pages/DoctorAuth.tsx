import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowLeft,
  Stethoscope,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

const DoctorAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email адрес';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
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
      // Проверяем демо-данные врача
      const demoDoctors = [
        { email: "doctor@more-clinic.ru", password: "doctor123", name: "Доктор Иванов", specialization: "Терапевт" },
        { email: "surgeon@more-clinic.ru", password: "surgeon123", name: "Доктор Петров", specialization: "Хирург" },
        { email: "admin@more-clinic.ru", password: "admin123", name: "Администратор", specialization: "Администратор" }
      ];

      const doctor = demoDoctors.find(d => 
        d.email === formData.email && d.password === formData.password
      );

      if (doctor) {
        // Сохраняем данные врача в localStorage
        localStorage.setItem('doctor_session', JSON.stringify({
          email: doctor.email,
          name: doctor.name,
          specialization: doctor.specialization,
          role: 'doctor'
        }));

        toast.success(`Добро пожаловать, ${doctor.name}!`);
        navigate('/doctor-dashboard');
      } else {
        toast.error('Неверный email или пароль');
        toast.info('💡 Попробуйте: doctor@more-clinic.ru / doctor123');
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
              Вход для врачей
            </h1>
            <p className="text-sm text-muted-foreground">
              Служебная панель медицинского персонала
            </p>
            
            {/* Пометка о доступе */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                🔒 Служебный доступ
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Доступ только для медицинского персонала клиники
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Form */}
      <section className="px-4">
        <Card className="p-6">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center">
              <div className="w-full h-full bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Stethoscope className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Ветеринарный центр «Море»
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Панель управления для врачей
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email field */}
            <div>
              <Label htmlFor="email" className="text-foreground text-sm mb-2 block">
                Email врача
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@more-clinic.ru"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-10 h-12 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                  required
                />
              </div>
              {errors.email && (
                <p className="text-blue-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

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
                <p className="text-blue-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 text-base font-medium mt-6 bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Вход...
                </>
              ) : (
                <>
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Войти как врач
                </>
              )}
            </Button>
          </form>
        </Card>
      </section>

      {/* Demo Credentials */}
      <section className="px-4 mt-6 mb-6">
        <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            Демо-доступ для врачей
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span><strong>Терапевт:</strong> doctor@more-clinic.ru / doctor123</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span><strong>Хирург:</strong> surgeon@more-clinic.ru / surgeon123</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span><strong>Админ:</strong> admin@more-clinic.ru / admin123</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Security Notice */}
      <section className="px-4 mb-6">
        <Card className="p-4 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <span className="font-medium text-yellow-800 dark:text-yellow-200">
              Служебная панель
            </span>
          </div>
          <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-2">
            Доступ только для авторизованного медицинского персонала. 
            Все действия логируются и контролируются.
          </p>
        </Card>
      </section>
    </div>
  );
};

export default DoctorAuth;
