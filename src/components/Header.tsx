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

                   {/* Скрытая кнопка для доступа к кабинету врача */}
                   <button
                     onClick={() => navigate('/doctor-auth')}
                     className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-lg shadow-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                     aria-label="Кабинет врача"
                     title="Кабинет врача (скрытый доступ)"
                   >
                     <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                   </button>

                   {/* Скрытая кнопка для доступа к кабинету директора */}
                   <button
                     onClick={() => navigate('/director-cabinet')}
                     className="w-10 h-10 flex items-center justify-center bg-purple-100 dark:bg-purple-900 rounded-lg shadow-sm hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                     aria-label="Кабинет директора"
                     title="Кабинет директора (скрытый доступ)"
                   >
                     <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                     </svg>
                   </button>

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
