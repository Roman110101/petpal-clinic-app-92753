import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Скроллим в начало страницы при смене маршрута
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Плавный скролл
    });
  }, [pathname]);

  return null;
};
