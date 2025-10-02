import { BranchCard } from "@/components/BranchCard";
import { PageHeader } from "@/components/PageHeader";
import { MapPin } from "lucide-react";

const Branches = () => {
  return (
    <div className="bg-background min-h-screen pt-16 ios-scroll-fix">
      {/* Header */}
      <PageHeader 
        title="Наши филиалы" 
        subtitle="Выберите ближайшую клинику"
        icon={<MapPin className="w-6 h-6" />}
      />

      {/* Branches List */}
      <section className="px-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <BranchCard
          name="Филиал в Москве"
          address="Ул. 2-я Брестская, дом 39, строение 4"
          phone="+7 (495) 234-56-78"
          schedule="09:00 - 21:00 (Без выходных)"
          metro="Белорусская"
        />
        
        <BranchCard
          name="Филиал в Сочи (Тепличная)"
          address="Ул. Тепличная 18/a"
          phone="+7 (862) 345-67-89"
          schedule="Круглосуточно"
          metro="Центр Сочи"
          website="https://centervet-sochi.com/"
        />
        
        <BranchCard
          name="Филиал в Сочи (Роз)"
          address="Ул. Роз 37"
          phone="+7 (862) 456-78-90"
          schedule="09:00 - 21:00 (Без выходных)"
          metro="Центр Сочи"
          website="https://centervet-sochi.com/"
        />
        
        <BranchCard
          name="Филиал в Сочи (Волжская)"
          address="Ул. Волжская 30"
          phone="+7 (862) 567-89-01"
          schedule="09:00 - 21:00 (Без выходных)"
          metro="Центр Сочи"
          website="https://centervet-sochi.com/"
        />
        </div>
      </section>
    </div>
  );
};

export default Branches;
