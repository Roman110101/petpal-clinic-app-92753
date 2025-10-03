import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, ArrowLeft, Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Проверяем через Supabase
      const { auth } = await import('@/services/unifiedAuthService');
      
      // Немного другая логика для Supabase
      const isValid = await auth.validateToken();
      
      if (isValid) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-lg font-semibold mb-2">Проверяем авторизацию...</h2>
          <p className="text-sm text-muted-foreground">
            Получаем данные пользователя
          </p>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary/10 rounded-full">
              <User className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="text-xl font-semibold mb-2">Требуется авторизация</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Для доступа к личному кабинету необходимо войти в систему
            </p>

            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/auth')} 
                className="w-full"
              >
                Войти в систему
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)} 
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
