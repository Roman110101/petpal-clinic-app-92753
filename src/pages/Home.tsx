import { useNavigate } from "react-router-dom";
import { QuickActionCard } from "@/components/QuickActionCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Calendar,
  Stethoscope,
  Phone,
  MapPin,
  Clock,
  Heart,
  PawPrint,
  Star,
  Award,
  Shield,
  Users,
  Building2,
  ChevronRight,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Hero Section - Место для логотипа и кнопки */}
      <section className="bg-[var(--gradient-hero)] text-primary-foreground px-4 py-12 rounded-b-3xl shadow-[var(--shadow-soft)] animate-fade-in">
        <div className="text-center space-y-6">
          {/* Место под логотип */}
          <div className="w-32 h-32 mx-auto bg-primary-foreground/10 rounded-3xl border-2 border-primary-foreground/20 border-dashed flex items-center justify-center">
            <PawPrint className="w-16 h-16 opacity-50" />
          </div>
          
          {/* Место под заголовок */}
          <div className="space-y-2">
            <div className="h-8 w-48 mx-auto bg-primary-foreground/10 rounded-lg border border-primary-foreground/20 border-dashed"></div>
            <div className="h-5 w-32 mx-auto bg-primary-foreground/10 rounded border border-primary-foreground/20 border-dashed"></div>
          </div>

          {/* Место под кнопку "Записаться онлайн" */}
          <div className="pt-4">
            <div className="h-14 w-64 mx-auto bg-secondary/20 rounded-xl border-2 border-secondary/30 border-dashed flex items-center justify-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold">Записаться онлайн</span>
            </div>
          </div>
        </div>
      </section>

      {/* Разделы сайта */}
      <section className="px-4 mt-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
        <h2 className="text-lg font-bold text-foreground mb-4">Разделы сайта</h2>
        
        <Accordion type="single" collapsible className="space-y-3">
          {/* О клинике */}
          <AccordionItem value="about" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">О клинике</h3>
                    <p className="text-xs text-muted-foreground">Наша история и ценности</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3 pt-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Здесь будет информация о клинике, её истории, миссии и ценностях.
                  </p>
                  <div className="h-24 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Место для контента</span>
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Филиалы */}
          <AccordionItem value="branches" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Building2 className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Филиалы</h3>
                    <p className="text-xs text-muted-foreground">4 клиники в Москве</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3 pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => navigate("/branches")}
                  >
                    <span>Посмотреть все филиалы</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <div className="space-y-2">
                    {["Арбат", "Таганка (24/7)", "Марьино", "Кутузовский"].map((branch) => (
                      <div key={branch} className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm font-medium text-foreground">{branch}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Команда */}
          <AccordionItem value="team" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Наша профессиональная команда</h3>
                    <p className="text-xs text-muted-foreground">Опытные специалисты</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3 pt-2">
                  <p className="text-sm text-muted-foreground">
                    Информация о врачах и специалистах клиники
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {["Врач 1", "Врач 2", "Врач 3"].map((doc) => (
                      <div key={doc} className="aspect-square bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Услуги */}
          <AccordionItem value="services" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Stethoscope className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Услуги</h3>
                    <p className="text-xs text-muted-foreground">16 видов ветеринарной помощи</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3 pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => navigate("/services")}
                  >
                    <span>Посмотреть все услуги</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <div className="h-32 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Место для краткого описания</span>
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Контакты */}
          <AccordionItem value="contacts" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Контакты</h3>
                    <p className="text-xs text-muted-foreground">Связаться с нами</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3 pt-2">
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm font-medium text-foreground">+7 (495) 123-45-67</p>
                      <p className="text-xs text-muted-foreground">Основной номер</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm font-medium text-foreground">info@vernie-druzya.ru</p>
                      <p className="text-xs text-muted-foreground">Email</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Quick Actions */}
      <section className="px-4 mt-8 animate-fade-in" style={{animationDelay: "0.4s"}}>
        <h2 className="text-lg font-bold text-foreground mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="default"
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => navigate("/appointment")}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Запись</span>
          </Button>
          <Button
            variant="secondary"
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => navigate("/services")}
          >
            <Stethoscope className="w-6 h-6" />
            <span className="text-xs">Услуги</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => navigate("/branches")}
          >
            <MapPin className="w-6 h-6" />
            <span className="text-xs">Филиалы</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => window.location.href = "tel:+74951234567"}
          >
            <Phone className="w-6 h-6" />
            <span className="text-xs">Позвонить</span>
          </Button>
        </div>
      </section>

      {/* Branches Preview */}
      <section className="px-4 mt-8 animate-fade-in" style={{animationDelay: "0.5s"}}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Наши филиалы</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/branches")}
            className="text-primary"
          >
            Все
          </Button>
        </div>
        <div className="space-y-3">
          <Card className="p-4 bg-card hover:shadow-[var(--shadow-hover)] transition-all hover-scale cursor-pointer" onClick={() => navigate("/branches")}>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Филиал на Арбате</p>
                <p className="text-xs text-muted-foreground mt-1">ул. Арбат, д. 15 • м. Арбатская</p>
                <p className="text-xs text-primary mt-1">Пн-Вс: 8:00 - 22:00</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-card hover:shadow-[var(--shadow-hover)] transition-all hover-scale cursor-pointer" onClick={() => navigate("/branches")}>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Филиал на Таганке</p>
                <p className="text-xs text-muted-foreground mt-1">Таганская площадь, д. 3 • м. Таганская</p>
                <p className="text-xs text-secondary font-medium mt-1">Круглосуточно</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Popular Services */}
      <section className="px-4 mt-8 animate-fade-in" style={{animationDelay: "0.6s"}}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Популярные услуги</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/services")}
            className="text-primary"
          >
            Все 16
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: "Вакцинация", price: "от 500 ₽" },
            { title: "Терапия", price: "от 800 ₽" },
            { title: "Груминг", price: "от 1200 ₽" },
            { title: "УЗИ", price: "от 1500 ₽" },
            { title: "Рентген", price: "от 1000 ₽" },
            { title: "Стоматология", price: "от 900 ₽" },
          ].map((service, index) => (
            <Card 
              key={service.title} 
              className="p-4 bg-card hover:shadow-[var(--shadow-hover)] transition-all hover-scale cursor-pointer"
              onClick={() => navigate("/services")}
              style={{animationDelay: `${0.1 * index}s`}}
            >
              <h3 className="text-sm font-semibold text-foreground mb-1">{service.title}</h3>
              <p className="text-xs text-primary font-medium">{service.price}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="px-4 mt-8 mb-6 animate-fade-in" style={{animationDelay: "0.7s"}}>
        <Card className="p-4 bg-destructive/10 border-destructive/20 hover:shadow-[var(--shadow-hover)] transition-all">
          <div className="flex items-center gap-3">
            <Phone className="w-8 h-8 text-destructive flex-shrink-0 animate-pulse" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Экстренная помощь 24/7</p>
              <p className="text-xs text-muted-foreground">Круглосуточная поддержка на Таганке</p>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => window.location.href = "tel:+74952345678"}
              className="hover-scale"
            >
              Позвонить
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Home;
