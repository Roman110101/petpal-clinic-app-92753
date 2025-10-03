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
                     className="w-10 h-10 flex items-center justify-center bg-red-100 dark:bg-red-900 rounded-lg shadow-sm hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                     aria-label="Кабинет врача"
                     title="Кабинет врача (скрытый доступ)"
                   >
                     <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                     </svg>
                   </button>

                   {/* Скрытая кнопка для доступа к кабинету директора */}
                   <button
                     onClick={() => navigate('/director-cabinet')}
                     className="w-10 h-10 flex items-center justify-center bg-yellow-100 dark:bg-yellow-900 rounded-lg shadow-sm hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
                     aria-label="Кабинет директора"
                     title="Кабинет директора (скрытый доступ)"
                   >
                     <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
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
