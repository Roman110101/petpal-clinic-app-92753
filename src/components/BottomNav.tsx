import { NavLink } from "react-router-dom";
import { Home, Calendar, Stethoscope, MapPin } from "lucide-react";

export const BottomNav = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Главная" },
    { to: "/services", icon: Stethoscope, label: "Услуги" },
    { to: "/branches", icon: MapPin, label: "Филиалы" },
    { to: "/appointment", icon: Calendar, label: "Запись" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-[0_-4px_20px_-4px_hsl(var(--primary)_/_0.1)] z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
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
                <item.icon className={`w-6 h-6 mb-1 ${isActive ? "scale-110" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
