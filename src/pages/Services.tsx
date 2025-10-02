import { ServiceCard } from "@/components/ServiceCard";
import {
  Stethoscope,
  Syringe,
  Heart,
  ClipboardList,
  Scissors,
  PawPrint,
  Activity,
  Pill,
  X,
  Microscope,
  Bone,
  Eye,
  Sparkles,
  Home,
  Ambulance,
  FileText,
} from "lucide-react";

const Services = () => {
  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Header */}
      <header className="bg-[var(--gradient-hero)] text-primary-foreground px-4 py-6 rounded-b-3xl shadow-[var(--shadow-soft)]">
        <h1 className="text-2xl font-bold">Наши услуги</h1>
        <p className="text-sm opacity-90 mt-1">Полный спектр ветеринарной помощи</p>
      </header>

      {/* Services Grid */}
      <section className="px-4 mt-6 space-y-4">
        <ServiceCard
          icon={Stethoscope}
          title="Диагностика"
          description="Современное оборудование для точной диагностики заболеваний"
        />
        <ServiceCard
          icon={Syringe}
          title="Вакцинация"
          description="Полный комплекс прививок для защиты здоровья питомца"
        />
        <ServiceCard
          icon={Heart}
          title="Терапия"
          description="Лечение заболеваний и профилактические осмотры"
        />
        <ServiceCard
          icon={ClipboardList}
          title="Хирургия"
          description="Операции любой сложности в стерильных условиях"
        />
        <ServiceCard
          icon={Scissors}
          title="Груминг"
          description="Профессиональный уход за шерстью и когтями"
        />
        <ServiceCard
          icon={PawPrint}
          title="Чипирование"
          description="Идентификация и регистрация домашних животных"
        />
        <ServiceCard
          icon={Activity}
          title="УЗИ диагностика"
          description="Ультразвуковое исследование внутренних органов"
        />
        <ServiceCard
          icon={Pill}
          title="Лабораторные анализы"
          description="Быстрые и точные исследования биоматериалов"
        />
        <ServiceCard
          icon={X}
          title="Рентген"
          description="Цифровая рентгенография костей и внутренних органов"
        />
        <ServiceCard
          icon={Microscope}
          title="Онкология"
          description="Диагностика и лечение онкологических заболеваний"
        />
        <ServiceCard
          icon={Bone}
          title="Ортопедия"
          description="Лечение травм и заболеваний опорно-двигательного аппарата"
        />
        <ServiceCard
          icon={Eye}
          title="Офтальмология"
          description="Диагностика и лечение заболеваний глаз"
        />
        <ServiceCard
          icon={Sparkles}
          title="Стоматология"
          description="Лечение зубов и профилактика заболеваний полости рта"
        />
        <ServiceCard
          icon={Home}
          title="Стационар"
          description="Круглосуточный уход за животными в клинике"
        />
        <ServiceCard
          icon={Ambulance}
          title="Вызов на дом"
          description="Ветеринарная помощь с выездом к вам домой"
        />
        <ServiceCard
          icon={FileText}
          title="Оформление документов"
          description="Ветеринарные паспорта и справки для путешествий"
        />
      </section>
    </div>
  );
};

export default Services;
