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
import heroImage from "@/assets/hero-dog.jpg";
import logoImage from "@/assets/logo.png";
import aboutImage from "@/assets/about-clinic.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-[500px]">
          <img 
            src={heroImage} 
            alt="Ветеринарный центр Море" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white">
            {/* Logo */}
            <div className="mb-6">
              <img 
                src={logoImage} 
                alt="Логотип Море" 
                className="w-24 h-24 object-contain drop-shadow-lg"
              />
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-center mb-2">
              Ветеринарный центр Море
            </h1>
            <p className="text-base md:text-lg text-white/90 text-center mb-8 max-w-md">
              Профессиональная забота о здоровье ваших питомцев
            </p>

            {/* CTA Button */}
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg px-8 py-6 text-base font-medium"
              onClick={() => navigate("/appointment")}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Записаться онлайн
            </Button>
          </div>
        </div>
      </section>


      {/* Разделы сайта */}
      <section className="px-4 mt-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">Разделы сайта</h2>
        
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
                    <p className="text-xs text-muted-foreground">Комплексная забота о питомцах</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4 pt-2">
                  <img 
                    src={aboutImage} 
                    alt="О нашей клинике" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="space-y-3">
                    <h4 className="text-base font-semibold text-foreground">
                      Комплексная забота о здоровье вашего питомца
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Мы современная клиника полного цикла, где объединены передовые технологии, узкопрофильные специалисты и многолетний опыт для оказания помощи любой сложности.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Доверяя нам здоровье своего питомца, вы выбираете надежность, экспертизу и заботу!
                    </p>
                    <p className="text-sm font-medium text-primary">
                      Ветеринарный центр «Море»: Глубокие знания. Широкие возможности.
                    </p>
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

          {/* Прайс-лист */}
          <AccordionItem value="price" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Stethoscope className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Прайс-лист</h3>
                    <p className="text-xs text-muted-foreground">Стоимость услуг</p>
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
                    <span>Посмотреть полный прайс-лист</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <div className="space-y-2">
                    {[
                      { service: "Первичный прием", price: "800 ₽" },
                      { service: "Вакцинация", price: "от 500 ₽" },
                      { service: "УЗИ диагностика", price: "от 1500 ₽" },
                      { service: "Хирургия", price: "от 3000 ₽" },
                    ].map((item) => (
                      <div key={item.service} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-foreground">{item.service}</span>
                        <span className="text-sm font-semibold text-primary">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Полезные статьи */}
          <AccordionItem value="articles" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Полезные статьи</h3>
                    <p className="text-xs text-muted-foreground">Советы по уходу за питомцами</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3 pt-2">
                  <div className="space-y-2">
                    {[
                      "Как подготовить питомца к вакцинации",
                      "Правильное питание для собак",
                      "Уход за зубами кошек",
                      "Первая помощь при травмах",
                    ].map((article) => (
                      <div key={article} className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                        <p className="text-sm text-foreground">{article}</p>
                        <p className="text-xs text-muted-foreground mt-1">Читать далее →</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Чеклист по уходу */}
          <AccordionItem value="checklist" className="border-none">
            <Card className="overflow-hidden">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Shield className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Чеклист по уходу за животными</h3>
                    <p className="text-xs text-muted-foreground">Важные рекомендации</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3 pt-2">
                  <div className="space-y-2">
                    {[
                      { task: "Регулярные осмотры у ветеринара", period: "Каждые 6 месяцев" },
                      { task: "Вакцинация", period: "По графику" },
                      { task: "Обработка от паразитов", period: "Ежемесячно" },
                      { task: "Уход за зубами", period: "Ежедневно" },
                      { task: "Физическая активность", period: "Ежедневно" },
                    ].map((item) => (
                      <div key={item.task} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="mt-0.5 w-4 h-4 rounded border-2 border-primary flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground font-medium">{item.task}</p>
                          <p className="text-xs text-muted-foreground">{item.period}</p>
                        </div>
                      </div>
                    ))}
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
      <section className="px-4 mt-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">Быстрые действия</h2>
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

      {/* Our Advantages */}
      <section className="px-4 mt-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">Наши преимущества</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-[var(--gradient-card)] border-border hover:shadow-[var(--shadow-hover)] transition-all hover-scale">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">14 лет опыта</h3>
                <p className="text-xs text-muted-foreground mt-1">Профессиональная команда врачей</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-[var(--gradient-card)] border-border hover:shadow-[var(--shadow-hover)] transition-all hover-scale">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-secondary/10">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Работаем 24/7</h3>
                <p className="text-xs text-muted-foreground mt-1">Круглосуточная помощь на Таганке</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-[var(--gradient-card)] border-border hover:shadow-[var(--shadow-hover)] transition-all hover-scale">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-accent/10">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Современное оборудование</h3>
                <p className="text-xs text-muted-foreground mt-1">Точная диагностика</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-[var(--gradient-card)] border-border hover:shadow-[var(--shadow-hover)] transition-all hover-scale">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Индивидуальный подход</h3>
                <p className="text-xs text-muted-foreground mt-1">Забота о каждом питомце</p>
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
