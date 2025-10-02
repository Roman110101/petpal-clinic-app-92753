import { BranchCard } from "@/components/BranchCard";
import { MapPin } from "lucide-react";

const Branches = () => {
  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Header */}
      <header className="bg-[var(--gradient-hero)] text-primary-foreground px-4 py-6 rounded-b-3xl shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-3 mb-2">
          <MapPin className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Наши филиалы</h1>
        </div>
        <p className="text-sm opacity-90">Выберите ближайшую клинику</p>
      </header>

      {/* Branches List */}
      <section className="px-4 mt-6 space-y-4">
        <BranchCard
          name="Филиал на Арбате"
          address="ул. Арбат, д. 15"
          phone="+7 (495) 123-45-67"
          schedule="Пн-Вс: 8:00 - 22:00"
          metro="Арбатская"
        />
        
        <BranchCard
          name="Филиал на Таганке"
          address="Таганская площадь, д. 3"
          phone="+7 (495) 234-56-78"
          schedule="Круглосуточно"
          metro="Таганская"
        />
        
        <BranchCard
          name="Филиал в Марьино"
          address="ул. Маршала Голованова, д. 21"
          phone="+7 (495) 345-67-89"
          schedule="Пн-Пт: 9:00 - 21:00, Сб-Вс: 10:00 - 18:00"
          metro="Марьино"
        />
        
        <BranchCard
          name="Филиал на Кутузовском"
          address="Кутузовский проспект, д. 45"
          phone="+7 (495) 456-78-90"
          schedule="Пн-Вс: 9:00 - 21:00"
          metro="Кутузовская"
        />
      </section>
    </div>
  );
};

export default Branches;
