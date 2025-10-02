import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { QuickActionCard } from "@/components/QuickActionCard";
import { DoctorCard } from "@/components/DoctorCard";
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
  ChevronRight,
  Check,
  Building2,
  BookOpen,
  CheckSquare,
  MessageCircle,
  FileText,
  User,
} from "lucide-react";
import heroImage from "@/assets/hero-dog.jpg";
import logoImage from "@/assets/logo.png";
import aboutImage from "@/assets/about-clinic.jpg";
import { doctors } from "@/data/doctors";

const Home = () => {
  const navigate = useNavigate();
  const [activeAccordion, setActiveAccordion] = useState<string | undefined>(undefined);
  const [selectedPetType, setSelectedPetType] = useState<'dog' | 'cat'>('dog');
  const accordionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const isScrollingRef = useRef(false);

  // Профессиональная система скролла для аккордеонов
  const handleAccordionChange = (value: string | undefined) => {
    setActiveAccordion(value);
    
    if (value && !isScrollingRef.current) {
      isScrollingRef.current = true;
      
      // Небольшая задержка для завершения анимации открытия
      setTimeout(() => {
        const element = accordionRefs.current[value];
        if (element) {
          const headerHeight = 64; // Высота фиксированного хедера
          const additionalOffset = 20; // Дополнительный отступ для комфорта
          const targetOffset = headerHeight + additionalOffset;
          
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;
          const targetScrollTop = absoluteElementTop - targetOffset;
          
          // Плавный скролл с контролем
          window.scrollTo({
            top: Math.max(0, targetScrollTop),
            behavior: 'smooth'
          });
          
          // Сброс флага после завершения скролла
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 800);
        } else {
          isScrollingRef.current = false;
        }
      }, 200);
    }
  };

  // Функция для установки ref элементов
  const setAccordionRef = (key: string) => (el: HTMLDivElement | null) => {
    accordionRefs.current[key] = el;
  };


  return (
    <div className="bg-background pt-16">
      {/* Hero Screen - Полный экран */}
      <section className="relative h-[calc(100dvh-4rem)] overflow-hidden flex items-center justify-center bg-background">
        {/* Content */}
        <div className="flex flex-col items-center justify-center px-6 text-center max-w-sm mx-auto">
          {/* Logo */}
          <div className="mb-4">
            <img 
              src="/new-logo.png" 
              alt="МОРЕ логотип с лапкой и ЭКГ" 
              className="w-56 h-56 sm:w-64 sm:h-64 mx-auto mb-0 object-contain"
            />
            
            {/* Ветеринарный центр */}
            <p className="font-black text-base mb-0.5 tracking-wide text-foreground">
              Ветеринарный центр
            </p>
            
            {/* МОРЕ */}
            <h1 className="font-black leading-none mb-2 text-6xl sm:text-8xl" style={{color: '#00CFDB', lineHeight: '0.8', fontWeight: '900'}}>
              МОРЕ
            </h1>
            
            {/* Слоган */}
            <p className="font-extralight text-sm mb-4 leading-tight text-foreground">
              Глубина наших знаний - для здоровья Вашего друга!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-2.5 justify-center w-full max-w-sm">
            <button
              onClick={() => window.location.href = "tel:+79250920272"}
              className="flex-1 bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all duration-200 active:scale-95"
            >
              Позвонить
            </button>
            <button
              onClick={() => navigate("/appointment")}
              className="flex-1 text-white py-4 px-6 rounded-lg font-semibold text-sm hover:opacity-90 transition-all duration-200 active:scale-95"
              style={{backgroundColor: '#272727'}}
            >
              Консультация
            </button>
          </div>
        </div>
      </section>

      {/* Основной контент - начинается после Hero экрана */}
      <div className="bg-background ios-scroll-fix">
      {/* Разделы сайта */}
        <section className="px-4 pt-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">Разделы</h2>
        
        <Accordion 
          type="single" 
          collapsible 
          className="space-y-3"
          value={activeAccordion}
          onValueChange={handleAccordionChange}
        >
          {/* О клинике */}
          <AccordionItem value="about" className="border-none" id="accordion-about">
            <Card 
              ref={setAccordionRef('about')}
              className="overflow-hidden bg-white dark:bg-card border border-gray-100 dark:border-transparent"
            >
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                    <Heart className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">О клинике</h3>
                    <p className="text-sm text-muted-foreground">Комплексная забота о питомцах</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4 pt-2">
                  <img 
                    src={aboutImage} 
                    alt="О нашей клинике" 
                    className="w-full h-48 object-cover object-[center_top] rounded-lg"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Three Icons */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center justify-center">
                      <Building2 className="w-5 h-5 mb-2 text-primary" />
                      <span className="font-semibold text-primary text-xs text-center">4 Филиала</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <svg width="20" height="18" viewBox="0 0 25 23" className="w-5 h-5 mb-2 text-primary" fill="currentColor">
                        <path d="M4.5 19.75V21.125C4.5 21.5146 4.37222 21.8411 4.11667 22.1047C3.86111 22.3682 3.54444 22.5 3.16667 22.5H1.83333C1.45556 22.5 1.13889 22.3682 0.883333 22.1047C0.627778 21.8411 0.5 21.5146 0.5 21.125V10.125L3.3 1.875C3.43333 1.4625 3.67222 1.13021 4.01667 0.878125C4.36111 0.626042 4.74444 0.5 5.16667 0.5H19.8333C20.2556 0.5 20.6389 0.626042 20.9833 0.878125C21.3278 1.13021 21.5667 1.4625 21.7 1.875L24.5 10.125V21.125C24.5 21.5146 24.3722 21.8411 24.1167 22.1047C23.8611 22.3682 23.5444 22.5 23.1667 22.5H21.8333C21.4556 22.5 21.1389 22.3682 20.8833 22.1047C20.6278 21.8411 20.5 21.5146 20.5 21.125V19.75H4.5ZM4.23333 7.375H20.7667L19.3667 3.25L21 7.54692L4.23333 7.375ZM2.5 13.2188H22.5V10.125L17.5 13.2188H7.5L2.5 10.125V13.2188Z" />
                      </svg>
                      <span className="font-semibold text-primary text-xs text-center">Вызов</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <Clock className="w-5 h-5 mb-2 text-primary" />
                      <span className="font-semibold text-primary text-xs text-center">24 часа</span>
                    </div>
                  </div>

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

                  {/* Галерея фотографий клиники */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                    <img 
                      src="/advantages/1.jpg" 
                      alt="Клиника МОРЕ" 
                      className="w-full h-24 object-cover rounded-lg"
                      loading="lazy"
                      decoding="async"
                    />
                    <img 
                      src="/advantages/2.jpg" 
                      alt="Клиника МОРЕ" 
                      className="w-full h-24 object-cover rounded-lg"
                      loading="lazy"
                      decoding="async"
                    />
                    <img 
                      src="/advantages/3.jpg" 
                      alt="Клиника МОРЕ" 
                      className="w-full h-24 object-cover rounded-lg"
                      loading="lazy"
                      decoding="async"
                    />
                    <img 
                      src="/advantages/4.jpg" 
                      alt="Клиника МОРЕ" 
                      className="w-full h-24 object-cover rounded-lg"
                      loading="lazy"
                      decoding="async"
                    />
                    <img 
                      src="/advantages/5.jpg" 
                      alt="Клиника МОРЕ" 
                      className="w-full h-24 object-cover rounded-lg"
                      loading="lazy"
                      decoding="async"
                    />
                    <img 
                      src="/advantages/6.jpg" 
                      alt="Клиника МОРЕ" 
                      className="w-full h-24 object-cover rounded-lg"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>


          {/* Команда */}
          <AccordionItem value="team" className="border-none" id="accordion-team">
            <Card 
              ref={setAccordionRef('team')}
              className="overflow-hidden bg-white dark:bg-card border border-gray-100 dark:border-transparent"
            >
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Наша профессиональная команда</h3>
                    <p className="text-sm text-muted-foreground">Опытные специалисты</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-2 pb-4">
                <div className="pt-2">
                  {/* Сетка врачей - 2 колонки как в отдельной странице */}
                  <div className="grid grid-cols-2 gap-2">
                    {doctors.map((doctor) => (
                      <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Прайс-лист */}
          <AccordionItem value="price" className="border-none" id="accordion-price">
            <Card 
              ref={setAccordionRef('price')}
              className="overflow-hidden bg-white dark:bg-card border border-gray-100 dark:border-transparent"
            >
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                    <FileText className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Прайс-лист</h3>
                    <p className="text-sm text-muted-foreground">Стоимость услуг</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3 pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => {
                      // Используем глобальный ref для прямого открытия прайс-листа
                      const mobileMenuRef = (window as any).mobileMenuRef;
                      if (mobileMenuRef?.current?.openPriceList) {
                        mobileMenuRef.current.openPriceList("home");
                      }
                    }}
                  >
                    <span>Посмотреть полный прайс-лист</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <div className="space-y-2">
                    {[
                      { service: "Первичный прием", price: "1 300 ₽" },
                      { service: "Повторный прием", price: "950 ₽" },
                      { service: "Вызов на дом", price: "от 1 500 ₽" },
                      { service: "Вакцинация", price: "8 000 ₽" },
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
          <AccordionItem value="articles" className="border-none" id="accordion-articles">
            <Card 
              ref={setAccordionRef('articles')}
              className="overflow-hidden bg-white dark:bg-card border border-gray-100 dark:border-transparent"
            >
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <BookOpen className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Полезные статьи</h3>
                    <p className="text-sm text-muted-foreground">Советы по уходу за питомцами</p>
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
                        <p className="text-sm text-muted-foreground mt-1">Читать далее →</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Чеклист по уходу */}
          <AccordionItem value="checklist" className="border-none" id="accordion-checklist">
            <Card 
              ref={setAccordionRef('checklist')}
              className="overflow-hidden bg-white dark:bg-card border border-gray-100 dark:border-transparent"
            >
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                    <CheckSquare className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Чеклист по уходу за животными</h3>
                    <p className="text-sm text-muted-foreground">Важные рекомендации</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-4 pt-2">
                  {/* Выбор животного */}
                  <div className="flex gap-2 mb-4">
                    <button 
                      onClick={() => setSelectedPetType('dog')}
                      className={`flex-1 p-3 rounded-lg border transition-all ${
                        selectedPetType === 'dog' 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'bg-muted/30 text-foreground border-border hover:bg-muted/50'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">🐕</div>
                        <div className="text-sm font-medium">Собака</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => setSelectedPetType('cat')}
                      className={`flex-1 p-3 rounded-lg border transition-all ${
                        selectedPetType === 'cat' 
                          ? 'bg-primary text-primary-foreground border-primary' 
                          : 'bg-muted/30 text-foreground border-border hover:bg-muted/50'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-1">🐱</div>
                        <div className="text-sm font-medium">Кошка</div>
                      </div>
                    </button>
                  </div>

                  {/* Чек-лист для собак */}
                  {selectedPetType === 'dog' && (
                    <div className="space-y-4">
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-bold text-foreground mb-2">🐕 Чек-лист по уходу за собакой</h4>
                        <p className="text-sm text-muted-foreground">Уход за питомцем требует особого внимания</p>
                      </div>

                      {/* 1. Обработка от паразитов */}
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h5 className="text-base font-semibold text-foreground mb-3">1. Обработка от внешних и внутренних паразитов</h5>
                        <p className="text-sm text-muted-foreground mb-3">Регулярная обработка – основа здоровья собаки, особенно если она гуляет в парках, лесах или общается с другими животными.</p>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">От блох и клещей:</p>
                            <p className="text-xs text-muted-foreground mb-1">• Регулярность: Каждый месяц в течение всего года (особенно активны паразиты весной и осенью). На Юге клещи могут быть активны круглый год!</p>
                            <p className="text-xs text-muted-foreground mb-2">• Средства: капли на холку («спот он»), жевательные таблетки (действуют 1-3 месяца), спреи, ошейники (как дополнение)</p>
                            <div className="p-2 bg-destructive/10 rounded border border-destructive/20">
                              <p className="text-xs text-destructive font-medium">⚠️ ВАЖНО: Клещи переносят смертельно опасные болезни (пироплазмоз, боррелиоз, эрлихиоз, анаплазмоз). После каждой прогулки осматривайте собаку на предмет клещей.</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">От глистов (дегельминтизация):</p>
                            <p className="text-xs text-muted-foreground mb-1">• Регулярность: 1 раз в три месяца (каждые 3 месяца). Если собака активно общается с другими животными или в доме есть маленькие дети, рекомендуем обрабатывать каждые 2 месяца.</p>
                            <p className="text-xs text-muted-foreground mb-1">• Средства: Таблетки, суспензии.</p>
                            <p className="text-xs text-primary">💡 Рекомендовано обработку от глистов проводить за 7-10 дней до ежегодной плановой вакцинации.</p>
                          </div>
                        </div>
                      </div>

                      {/* 2. Вакцинация */}
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h5 className="text-base font-semibold text-foreground mb-3">2. Вакцинация</h5>
                        <p className="text-sm text-muted-foreground mb-3">Защищает от самых распространенных и опасных вирусных заболеваний.</p>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-2">Обязательные базовые вакцины:</p>
                            <div className="space-y-2">
                              <div className="p-2 bg-background/50 rounded">
                                <p className="text-xs font-medium text-foreground mb-1">• Комплексная вакцина Мультикан, Эурикан. Защищает от:</p>
                                <div className="ml-3 space-y-0.5">
                                  <p className="text-xs text-muted-foreground">- Чума плотоядных</p>
                                  <p className="text-xs text-muted-foreground">- Парвовирусный энтерит</p>
                                  <p className="text-xs text-muted-foreground">- Аденовирус</p>
                                  <p className="text-xs text-muted-foreground">- Парагрипп</p>
                                  <p className="text-xs text-muted-foreground">- Лептоспироз (особенно опасен, так как передается человеку)</p>
                                </div>
                              </div>
                              
                              <div className="p-2 bg-background/50 rounded">
                                <p className="text-xs font-medium text-foreground mb-1">• Вакцинация от бешенства Рабикс, Рабизин.</p>
                                <p className="text-xs text-muted-foreground">Обязательна по закону, без отметки о ней вас не пустят в самолет/поезд, на выставку, в некоторые гостиницы. Напоминаем, что бешенство смертельно опасно для собаки и для человека.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-foreground mb-2">Регулярность:</p>
                            <div className="space-y-2">
                              <div className="p-2 bg-background/50 rounded">
                                <p className="text-xs font-medium text-foreground mb-1">• Первичная вакцинация:</p>
                                <p className="text-xs text-muted-foreground">Делается щенку по схеме, рекомендованной производителем вакцины в инструкции к препарату. Вакцинируем только клинически здоровых животных в 6-8 недельном возрасте (обращаем ваше внимание, что на данный момент в инструкции к Мультикану прописана постановка первичной вакцины сразу с компонентом от бешенства). Ревакцинация через 21-28 дней.</p>
                              </div>
                              
                              <div className="p-2 bg-background/50 rounded">
                                <p className="text-xs font-medium text-foreground mb-1">• Ревакцинация:</p>
                                <p className="text-xs text-muted-foreground">Ежегодно. Раз в год собаке необходимо делать комплексную вакцину и вакцину от бешенства, для поддержания иммунного ответа организма.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3. Кормление */}
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h5 className="text-base font-semibold text-foreground mb-3">3. Краткие рекомендации по кормлению</h5>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">• Тип корма:</p>
                            <p className="text-xs text-muted-foreground">Сбалансированный готовый корм, подобранный по возрасту, размеру и активности собаки. Возможно кормление натуральным кормом, рекомендовано обратиться к диетологу, для составления сбалансированного рациона.</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">• Режим:</p>
                            <p className="text-xs text-muted-foreground">2-3 раза в день для взрослой собаки. Щенков кормят чаще (в зависимости от возраста). Не рекомендуется кормить 1 раз в день и сразу перед/после активной прогулки. Так же не рекомендовано оставлять корм в свободном доступе, так как в нем при благоприятных условиях могут развиваться патогенные микроорганизмы.</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">• Нормы:</p>
                            <p className="text-xs text-muted-foreground">Строго следуйте норме на упаковке корма, корректируя ее исходя из упитанности питомца. Ожирение – большая беда, ведущая к проблемам с сердцем, суставами и диабету.</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">• Вода:</p>
                            <p className="text-xs text-muted-foreground mb-1">Всегда должен быть доступ к свежей, чистой воде.</p>
                            <p className="text-xs text-primary">💡 Обязательно мойте миски для корма и воды 1 раз в день!</p>
                          </div>
                          
                          <div className="p-2 bg-destructive/10 rounded border border-destructive/20">
                            <p className="text-xs font-medium text-destructive mb-1">❌ Что нельзя:</p>
                            <p className="text-xs text-muted-foreground">Еда с человеческого стола (острое, соленое, жирное, копченое), трубчатые кости птицы, лук, чеснок, шоколад, сладости, изюм, виноград.</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">• Лакомства:</p>
                            <p className="text-xs text-muted-foreground">Используйте только специальные натуральные собачьи лакомства! (например сушеные легкое, рубец, уши, трахеи)</p>
                          </div>
                        </div>
                      </div>

                      {/* 4. Чекап */}
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h5 className="text-base font-semibold text-foreground mb-3">4. Как часто делать чекап и что проверять?</h5>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-2">Ежедневно в домашних условиях:</p>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">• Аппетит и жажда: Любые изменения могут быть признаками недомогания.</p>
                              <p className="text-xs text-muted-foreground">• Поведение: Активность, желание гулять и играть.</p>
                              <p className="text-xs text-muted-foreground">• Туалет: Консистенция кала, цвет мочи, отсутствие крови или слизи.</p>
                              <p className="text-xs text-muted-foreground">• Шерсть и кожа: Нет ли ран, расчесов, проплешин, блох?</p>
                              <p className="text-xs text-muted-foreground">• Глаза, уши, нос: Чистые, без выделений.</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-foreground mb-2">Еженедельно:</p>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">• Уши: Аккуратно осмотреть и почистить специальным лосьоном (особенно для пород с висячими ушами)</p>
                              <p className="text-xs text-muted-foreground">• Зубы: Проверить, нет ли сильного зубного налета, воспаления десен. Приучение к чистке</p>
                              <p className="text-xs text-muted-foreground">• Когти: Подстригать по мере необходимости. Если слышен цокот по полу – пора стричь.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 5. Обращение к врачу */}
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h5 className="text-base font-semibold text-foreground mb-3">5. Как часто обращаться к врачу?</h5>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">• Планово:</p>
                            <p className="text-xs text-muted-foreground">1 раз в год. Визит для ежегодной вакцинации — это и есть повод для планового осмотра. Врач проведет общий клинический осмотр (прослушает сердце, легкие, ощупает живот, проверит слизистые, оценит состояние зубов).</p>
                          </div>
                          
                          <div className="p-3 bg-destructive/10 rounded border border-destructive/20">
                            <p className="text-sm font-medium text-destructive mb-2">• Внепланово (НЕМЕДЛЕННО):</p>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">- Травма (после драки, падения, ДТП).</p>
                              <p className="text-xs text-muted-foreground">- Отказ от еды и воды более 24 часов.</p>
                              <p className="text-xs text-muted-foreground">- Рвота или диарея (более 2-3 раз за день), особенно с кровью.</p>
                              <p className="text-xs text-muted-foreground">- Затрудненное дыхание, судороги, потеря сознания, нарушение координации.</p>
                              <p className="text-xs text-muted-foreground">- Попытки потужиться, но невозможность сходить в туалет.</p>
                              <p className="text-xs text-muted-foreground">- Сильное беспокойство или наоборот апатия, вокализация, указывающие на боль.</p>
                              <p className="text-xs text-muted-foreground">- Подозрение на отравление (яды, химикаты).</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 6. Дополнительные пункты */}
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h5 className="text-base font-semibold text-foreground mb-3">6. Дополнительные обязательные пункты для собаки</h5>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">• Выгул:</p>
                            <p className="text-xs text-muted-foreground">Не менее 2-3 раз в день. Одна из прогулок должна быть длительной (от 1 часа) с активными играми и физической нагрузкой.</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">• Дрессировка и социализация:</p>
                            <p className="text-xs text-muted-foreground">Базовые команды послушания ("ко мне", "рядом", "сидеть", "фу") — обязательны для безопасности. Социализация (общение с другими собаками и людьми) помогает вырастить психологически здорового питомца.</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">• Гигиена:</p>
                            <p className="text-xs text-muted-foreground">Мытье лап после каждой прогулки, купание по мере необходимости (но не чаще 1 раза в месяц без особых причин).</p>
                          </div>
                        </div>
                      </div>

                      {/* Главная рекомендация */}
                      <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="text-sm font-medium text-primary mb-2">💡 Главная рекомендация:</p>
                        <p className="text-xs text-muted-foreground mb-2">Найдите «своего» постоянного ветеринара и одну клинику, где будут вести историю болезни вашей собаки. Это поможет врачу лучше знать пациента и оперативно помочь в любой ситуации. Регулярная профилактика всегда дешевле и проще лечения!</p>
                        <p className="text-sm font-medium text-primary text-center">Здоровья вашему пушистому другу! 🐕❤️</p>
                      </div>
                    </div>
                  )}

                  {/* Чек-лист для кошек */}
                  {selectedPetType === 'cat' && (
                    <div className="space-y-4">
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-bold text-foreground mb-2">🐱 Чек-лист по уходу за кошкой</h4>
                        <p className="text-sm text-muted-foreground">Уход за котиками требует особого внимания</p>
                      </div>

                      {/* 1. Обработка от паразитов */}
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h5 className="text-base font-semibold text-foreground mb-3">1. Обработка от внешних и внутренних паразитов</h5>
                        <p className="text-sm text-muted-foreground mb-3">Проводить обработку от блох и клещей крайне важно для котов, которые имеют доступ на улицу или если в одном доме живут собаки и кошки, которые активно гуляют на улице, так как они могут принести паразитов на себе.</p>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">От блох и клещей:</p>
                            <p className="text-xs text-muted-foreground mb-1">• Регулярность: Каждый месяц в течение всего года (особенно активны паразиты весной и осенью)</p>
                            <div className="p-2 bg-destructive/10 rounded border border-destructive/20">
                              <p className="text-xs text-destructive font-medium mb-1">⚠️ ВАЖНО: Выбирать только препараты для кошек!</p>
                              <p className="text-xs text-muted-foreground">Препараты для собак могут быть опасны для обработки. Использовать можно капли на холку («спот он»), спреи, ошейники (менее надежны и есть риск если кошка гуляет сама по себе)</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">От глистов (дегельминтизация):</p>
                            <p className="text-xs text-muted-foreground mb-1">• Регулярность: 1 раз в три месяца (каждые 3 месяца). Если кошка активный охотник, рекомендуем обрабатывать каждые 2 месяца.</p>
                            <p className="text-xs text-muted-foreground mb-1">• Средства: Таблетки, суспензии, капли на холку комплексного действия (от внутренних и внешних паразитов)</p>
                            <p className="text-xs text-primary">💡 Рекомендовано обработку от глистов проводить за 7-10 дней до ежегодной плановой вакцинации.</p>
                          </div>
                        </div>
                      </div>

                      {/* 2. Вакцинация */}
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h5 className="text-base font-semibold text-foreground mb-3">2. Вакцинация</h5>
                        <p className="text-sm text-muted-foreground mb-3">Для кошек вакцинация это не вопрос «А нужно ли делать?», а вопрос здоровья и долгих лет жизни питомца.</p>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-2">Обязательные базовые вакцины:</p>
                            <div className="space-y-2">
                              <div className="p-2 bg-background/50 rounded">
                                <p className="text-xs font-medium text-foreground mb-1">• Комплексная вакцина Мультифел, Пуревакс. Защищает от:</p>
                                <div className="ml-3 space-y-0.5">
                                  <p className="text-xs text-muted-foreground">- Панлейкопения («кошачья чумка»)</p>
                                  <p className="text-xs text-muted-foreground">- Калицивироз</p>
                                  <p className="text-xs text-muted-foreground">- Ринотрахеит (герпесвирус)</p>
                                </div>
                              </div>
                              
                              <div className="p-2 bg-background/50 rounded">
                                <p className="text-xs font-medium text-foreground mb-1">• Вакцинация от бешенства Рабикс, Рабизин.</p>
                                <p className="text-xs text-muted-foreground">Напоминаем, что бешенство смертельно опасно для кошки и для человека.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-foreground mb-2">Регулярность:</p>
                  <div className="space-y-2">
                              <div className="p-2 bg-background/50 rounded">
                                <p className="text-xs font-medium text-foreground mb-1">• Первичная вакцинация:</p>
                                <p className="text-xs text-muted-foreground">Делается котенку по схеме, рекомендованной производителем вакцины в инструкции к препарату. Вакцинируем только клинически здоровых животных в 6-8 недельном возрасте (обращаем ваше внимание, что на данный момент в инструкции к Мультифелу прописана постановка первичной вакцины сразу с компонентом от бешенства). Ревакцинация через 21-28 дней.</p>
                              </div>
                              
                              <div className="p-2 bg-background/50 rounded">
                                <p className="text-xs font-medium text-foreground mb-1">• Ревакцинация:</p>
                                <p className="text-xs text-muted-foreground">Ежегодно. Раз в год кошке необходимо делать комплексную вакцину и вакцину от бешенства, для поддержания иммунного ответа организма.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3. Кормление */}
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h5 className="text-base font-semibold text-foreground mb-3">3. Краткие рекомендации по кормлению</h5>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">• Тип корма:</p>
                            <p className="text-xs text-muted-foreground">Высококачественный коммерческий корм супер-премиум или холистик класса либо качественный влажный корм. В них оптимальный баланс питательных веществ, витаминов и таурина (жизненно важен для кошек).</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">• Режим:</p>
                            <p className="text-xs text-muted-foreground">2-3 раза в день четкими порциями. У кошки должен быть режим. Так же не рекомендовано оставлять корм в свободном доступе, так как в нем при благоприятных условиях могут развиваться патогенные микроорганизмы.</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">• Вода:</p>
                            <p className="text-xs text-muted-foreground mb-1">Всегда должен быть доступ к свежей, чистой воде.</p>
                            <p className="text-xs text-primary">💡 Обязательно мойте миски для корма и воды 1 раз в день!</p>
                          </div>
                          
                          <div className="p-2 bg-destructive/10 rounded border border-destructive/20">
                            <p className="text-xs font-medium text-destructive mb-1">❌ Что нельзя:</p>
                            <p className="text-xs text-muted-foreground">Еда с человеческого стола, молоко (у многих взрослых кошек непереносимость лактозы), речная рыба с костями, трубчатые кости, лук, чеснок, шоколад, сладости.</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">• Вес:</p>
                            <p className="text-xs text-muted-foreground">Контролируйте вес питомца. Ожирение — путь к болезням суставов, диабету и другим проблемам.</p>
                          </div>
                        </div>
                      </div>

                      {/* 4. Чекап */}
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h5 className="text-base font-semibold text-foreground mb-3">4. Как часто делать чекап и что проверять?</h5>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-2">Ежедневно в домашних условиях:</p>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">• Аппетит и жажда: Не изменились ли?</p>
                              <p className="text-xs text-muted-foreground">• Поведение: Активна ли, идет ли на контакт?</p>
                              <p className="text-xs text-muted-foreground">• Туалет: Нет ли диареи, крови в моче или кале, болезненности при посещении лотка?</p>
                              <p className="text-xs text-muted-foreground">• Шерсть и кожа: Нет ли ран, расчесов, проплешин, блох?</p>
                              <p className="text-xs text-muted-foreground">• Глаза, уши, нос: Чистые, без выделений.</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-foreground mb-2">Еженедельно/раз в две недели:</p>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">• Уши: Аккуратно осмотреть на предмет загрязнений, темного налета (возможен клещ).</p>
                              <p className="text-xs text-muted-foreground">• Зубы: Проверить, нет ли сильного зубного налета, воспаления десен.</p>
                              <p className="text-xs text-muted-foreground">• Когти: Подстригать по мере необходимости.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 5. Обращение к врачу */}
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h5 className="text-base font-semibold text-foreground mb-3">5. Как часто обращаться к врачу?</h5>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">• Планово:</p>
                            <p className="text-xs text-muted-foreground">1 раз в год. Визит для ежегодной вакцинации — это и есть повод для планового осмотра. Врач послушает сердце, проверит зубы, ощупает живот, задаст вопросы о состоянии питомца.</p>
                          </div>
                          
                          <div className="p-3 bg-destructive/10 rounded border border-destructive/20">
                            <p className="text-sm font-medium text-destructive mb-2">• Внепланово (НЕМЕДЛЕННО):</p>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">- Травма (после драки, падения, ДТП).</p>
                              <p className="text-xs text-muted-foreground">- Отказ от еды и воды более 24 часов.</p>
                              <p className="text-xs text-muted-foreground">- Рвота или диарея (более 2-3 раз за день), особенно с кровью.</p>
                              <p className="text-xs text-muted-foreground">- Затрудненное дыхание, судороги.</p>
                              <p className="text-xs text-muted-foreground">- Заметили кровь в моче, кошка не может сходить в туалет, кричит от боли.</p>
                              <p className="text-xs text-muted-foreground">- Любые резкие изменения в поведении (вялость, чрезмерная агрессия, прячется).</p>
                              <p className="text-xs text-muted-foreground">- Подозрение на отравление (яды, химикаты).</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Главная рекомендация */}
                      <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="text-sm font-medium text-primary mb-2">💡 Главная рекомендация:</p>
                        <p className="text-xs text-muted-foreground mb-2">Найдите «своего» постоянного ветеринара и одну клинику, где будут вести историю болезни вашей кошки. Это поможет врачу лучше знать пациента и оперативно помочь в любой ситуации. И помните, болезнь лучше профилактировать, а если все таки случилась беда не тяните с обращением в клинику, ведь на начальных стадиях заболевания с ним гораздо легче справиться.</p>
                        <p className="text-sm font-medium text-primary text-center">Здоровья вашему пушистому другу! 🐱❤️</p>
                      </div>
                  </div>
                  )}
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Контакты */}
          <AccordionItem value="contacts" className="border-none" id="accordion-contacts">
            <Card 
              ref={setAccordionRef('contacts')}
              className="overflow-hidden bg-white dark:bg-card border border-gray-100 dark:border-transparent"
            >
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                    <MessageCircle className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Контакты</h3>
                    <p className="text-sm text-muted-foreground">Связаться с нами</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3 pt-2">
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm font-medium text-foreground">+7 (925) 092-02-72</p>
                      <p className="text-sm text-muted-foreground">Основной номер</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm font-medium text-foreground">vetcenter-more@mail.ru</p>
                      <p className="text-sm text-muted-foreground">Email</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm font-medium text-foreground mb-2">Мы в социальных сетях:</p>
                      <div className="flex gap-4">
                        <a href="https://t.me/centervet_sochi" target="_blank" rel="noopener noreferrer" 
                           className="flex items-center gap-2 text-sm text-primary hover:underline transition-all hover:scale-105">
                          <img src="/contact icons/icons-telegram.svg" alt="Telegram" className="w-5 h-5" />
                          Telegram
                        </a>
                        <a href="https://wa.me/79250920272" target="_blank" rel="noopener noreferrer" 
                           className="flex items-center gap-2 text-sm text-primary hover:underline transition-all hover:scale-105">
                          <img src="/contact icons/icon-whatsapp.svg" alt="WhatsApp" className="w-5 h-5" />
                          WhatsApp
                        </a>
                        <a href="https://instagram.com/centervet_sochi" target="_blank" rel="noopener noreferrer" 
                           className="flex items-center gap-2 text-sm text-primary hover:underline transition-all hover:scale-105">
                          <img src="/contact icons/icon-instagram.svg" alt="Instagram" className="w-5 h-5" />
                          Instagram
                        </a>
                      </div>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            className="bg-pink-100 dark:bg-pink-950/30 rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform"
            onClick={() => navigate("/appointment")}
          >
            <Calendar className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            <span className="text-sm font-medium text-pink-700 dark:text-pink-300">Запись</span>
          </div>
          <div
            className="bg-blue-100 dark:bg-blue-950/30 rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform"
            onClick={() => navigate("/services")}
          >
            <Stethoscope className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Услуги</span>
          </div>
          <div
            className="bg-purple-100 dark:bg-purple-950/30 rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform"
            onClick={() => window.location.href = "tel:+79250920272"}
          >
            <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Позвонить</span>
          </div>
          <div
            className="bg-teal-100 dark:bg-teal-950/30 rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform"
            onClick={() => navigate("/profile")}
          >
            <User className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <span className="text-sm font-medium text-teal-700 dark:text-teal-300">Кабинет</span>
          </div>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            { title: "Первичный прием", price: "1 300 ₽" },
            { title: "Вакцинация", price: "8 000 ₽" },
            { title: "УЗИ диагностика", price: "от 1 500 ₽" },
            { title: "Хирургия", price: "от 3 000 ₽" },
            { title: "Стоматология", price: "от 1 200 ₽" },
            { title: "Вызов на дом", price: "от 1 500 ₽" },
          ].map((service, index) => (
            <Card 
              key={service.title} 
              className="p-4 bg-white dark:bg-card border border-gray-100 dark:border-transparent transition-all hover-scale cursor-pointer"
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
        <Card className="p-4 bg-destructive/10 transition-all">
          <div className="flex items-center gap-3">
            <Phone className="w-8 h-8 text-destructive flex-shrink-0 animate-pulse" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Экстренная помощь 24/7</p>
              <p className="text-sm text-muted-foreground">Круглосуточная поддержка</p>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => window.location.href = "tel:+79250920272"}
              className="hover-scale"
            >
              Позвонить
            </Button>
          </div>
        </Card>
      </section>
      </div>
    </div>
  );
};

export default Home;
