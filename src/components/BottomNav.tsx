import { NavLink, useLocation } from "react-router-dom";
import { Home, Calendar, Stethoscope, MapPin, Video } from "lucide-react";
import { useEffect } from "react";

export const BottomNav = () => {
  const location = useLocation();
  
  // Закрываем мобильное меню при изменении маршрута
  useEffect(() => {
    // Ищем открытое мобильное меню и закрываем его
    const mobileMenu = document.querySelector('.mobile-menu-aside') as HTMLElement;
    if (mobileMenu && mobileMenu.style.transform === 'translateX(0px)') {
      // Эмулируем клик по кнопке закрытия
      const closeButton = mobileMenu.querySelector('button[aria-label="Закрыть меню"]') as HTMLButtonElement;
      if (closeButton) {
        closeButton.click();
      }
    }
  }, [location.pathname]);
  
  // Навигация всегда видна
  const shouldHide = false;
  const navItems = [
    { to: "/", icon: Home, label: "Главная", color: "text-blue-500" },
    { to: "/services", icon: Stethoscope, label: "Услуги", color: "text-green-500" },
    { to: "/telemedicine", icon: Video, label: "Видео", color: "text-cyan-500" },
    { to: "/branches", icon: MapPin, label: "Филиалы", color: "text-primary" },
    { to: "/appointment", icon: Calendar, label: "Запись", color: "text-purple-500" },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-[9999] transition-transform duration-300 ${shouldHide ? 'translate-y-full' : 'translate-y-0'}`} style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex justify-around items-center h-16 max-w-md md:max-w-none mx-auto px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-6 h-6 mb-1 ${isActive ? "scale-110 text-primary" : item.color}`} />
                <span className={`text-sm font-medium ${isActive ? "" : "text-muted-foreground"}`}>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
