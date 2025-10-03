import { useRef, useState, useEffect } from 'react';
import { Menu, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { UserMenu } from './UserMenu';

interface MenuRef {
  openMenu: () => void;
  closeMenu: () => void;
  openPriceList: (from?: "header" | "home") => void;
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const mobileMenuRef = useRef<MenuRef>(null);

  // Делаем ref доступным глобально для использования в других компонентах
  useEffect(() => {
    (window as any).mobileMenuRef = mobileMenuRef;
  }, []);
  const navigate = useNavigate();

  // Отслеживание скролла для скрытия/показа хедера
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Если скроллим вниз и прошли больше 100px - скрываем хедер
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } 
      // Если скроллим вверх - показываем хедер
      else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleMenuClick = () => {
    if (mobileMenuRef.current) {
      if (isMenuOpen) {
        mobileMenuRef.current.closeMenu();
      } else {
        mobileMenuRef.current.openMenu();
      }
    }
  };

  const headerTranslateClass = (isMenuOpen || isHeaderVisible) ? 'translate-y-0' : '-translate-y-full';

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 transition-transform duration-200 ease-in-out ${headerTranslateClass}`}>
      {/* Blur фон с линией */}
      <div className="bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="w-full h-16 relative max-w-md md:max-w-none mx-auto flex items-center justify-between px-4">
          {/* Переключатель темы слева */}
          <div className="w-10 h-10 flex items-center justify-center bg-card border border-border rounded-lg shadow-sm">
            <ThemeToggle />
          </div>

          {/* Иконки справа */}
          <div className="flex items-center gap-2">
            {/* Меню пользователя - показывает авторизованного пользователя или кнопку входа */}
            <UserMenu onOpenAuth={() => navigate('/auth')} />

            {/* Иконка меню */}
            <button
              onClick={handleMenuClick}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-900/30 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-900/50 transition-colors"
              aria-label="Открыть меню"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      <MobileMenu 
        ref={mobileMenuRef} 
        onClose={() => setIsMenuOpen(false)}
        onMenuStateChange={(isOpen: boolean) => {
          setIsMenuOpen(isOpen);
        }}
      />
    </header>
  );
};
