"use client";

import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useLayoutEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { X, ChevronRight, ArrowLeft, Stethoscope, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Импорты прайс-листов
import { surgeryPrices } from "../data/surgeryPrices";
import { dermatologyPrices } from "../data/dermatologyPrices";
import { stomatologyPrices } from "../data/stomatologyPrices";
import { traumatologyPrices } from "../data/traumatologyPrices";
import { ophthalmologyPrices } from "../data/ophthalmologyPrices";
import { horsesPrices } from "../data/horsesPrices";
import { cremationPrices } from "../data/cremationPrices";
import { ultrasoundPrices } from "../data/ultrasoundPrices";
import { hospitalPrices } from "../data/hospitalPrices";
import { endoscopyPrices } from "../data/endoscopyPrices";
import { neurosurgeryPrices } from "../data/neurosurgeryPrices";
import { xrayPrices } from "../data/xrayPrices";
import { bloodTransfusionPrices } from "../data/bloodTransfusionPrices";
import { anesthesiologyPrices } from "../data/anesthesiologyPrices";
import { cardiologyPrices } from "../data/cardiologyPrices";
import { dietologyPrices } from "../data/dietologyPrices";
import { endocrinologyPrices } from "../data/endocrinologyPrices";
import { gastroenterologyPrices } from "../data/gastroenterologyPrices";
import { microchippingPrices } from "../data/microchippingPrices";
import { nephrologyPrices } from "../data/nephrologyPrices";
import { neurologyPrices } from "../data/neurologyPrices";
import { oncologyPrices } from "../data/oncologyPrices";
import { onlineConsultationPrices } from "../data/onlineConsultationPrices";
import { oxygenPrices } from "../data/oxygenPrices";
import { rabiesTitersPrices } from "../data/rabiesTitersPrices";
import { zoopsychologyPrices } from "../data/zoopsychologyPrices";
import { callPrices } from "../data/callPrices";
import { servicesPrices } from "../data/servicesPrices";
import { citoPrices } from "../data/citoPrices";

interface MobileMenuRef {
  openMenu: () => void;
  closeMenu: () => void;
  openPriceList: (from?: "header" | "home") => void;
}

interface MobileMenuProps {
  onClose: () => void;
  onMenuStateChange: (isOpen: boolean) => void;
}

const MobileMenu = forwardRef<MobileMenuRef, MobileMenuProps>(
  ({ onClose, onMenuStateChange }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [activeContent, setActiveContent] = useState<"main" | "services">(
      "main"
    );
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [openedFrom, setOpenedFrom] = useState<"header" | "home" | null>(null);
    const navigate = useNavigate();

    const asideRef = useRef<HTMLDivElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const iconsRef = useRef<HTMLDivElement | null>(null);
    const touchStartY = useRef<number | null>(null);

    // высота для скролл блока (px)
    const [scrollMaxHeight, setScrollMaxHeight] = useState<number | null>(null);
    // стрелка показывается если есть overflow и не внизу
    const [canScroll, setCanScroll] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [priceItemsCount, setPriceItemsCount] = useState(0);

    // маленькая настройка: запас под иконки + gap
    const EXTRA_GAP = 28; // px — можно подрегулировать

    // Блокируем скролл body когда меню открыто (iOS-совместимо)
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden"; // помогает iOS
      } else {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    }, [isOpen]);

    useImperativeHandle(ref, () => ({
      openMenu: () => {
        setIsOpen(true);
        onMenuStateChange(true);
      },
      closeMenu: () => {
        setIsOpen(false);
        onMenuStateChange(false);
      },
      openPriceList: (from = "header") => {
        setIsOpen(true);
        setActiveContent("services");
        setOpenedFrom(from);
        onMenuStateChange(true);
      },
    }));

    const closeMenu = () => {
      setIsOpen(false);
      setActiveContent("main");
      setIsServicesOpen(false);
      setSelectedCategory(null);
      setOpenedFrom(null);
      onMenuStateChange(false);
      onClose();
    };

    const goBack = () => {
      if (selectedCategory) {
        setSelectedCategory(null);
      } else if (activeContent === "services") {
        // Если прайс-лист был открыт с главной страницы, закрываем меню полностью
        if (openedFrom === "home") {
          closeMenu();
        } else {
          // Если открыт из хедера, возвращаемся в главное меню
          setActiveContent("main");
        }
      } else {
        closeMenu();
      }
    };

    const handleNavigation = (path: string) => {
      closeMenu();
      navigate(path);
    };

    // Обработка свайпов для раскрытия/скрытия списка услуг
    const handleTouchStart = (e: React.TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (touchStartY.current === null) return;
      const currentY = e.touches[0].clientY;
      const diff = currentY - touchStartY.current;

      // свайп вверх > 20px — открываем
      if (diff < -20) setIsServicesOpen(true);
      // свайп вниз > 20px — закрываем
      else if (diff > 20) setIsServicesOpen(false);
    };

    // Обработка клавиши ESC
    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) closeMenu();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [isOpen]);

    // Вычисляем доступную высоту для скролл-области
    useLayoutEffect(() => {
      function recalc() {
        if (!asideRef.current) return;
        const vh = window.innerHeight;
        const headerH = headerRef.current?.offsetHeight ?? 0;
        const iconsH = iconsRef.current?.offsetHeight ?? 0;
        // оставляем ещё небольшой запас EXTRA_GAP (под стрелку / отступ)
        const available = Math.max(80, vh - headerH - iconsH - EXTRA_GAP);
        setScrollMaxHeight(available);
      }
      recalc();
      window.addEventListener("resize", recalc);
      return () => window.removeEventListener("resize", recalc);
    }, [isOpen, activeContent]);

    // Следим за скроллом внутри блока, чтобы показать/скрыть стрелку (iOS-оптимизировано)
    useEffect(() => {
      const el = scrollRef.current;
      if (!el) {
        setCanScroll(false);
        setIsAtBottom(false);
        return;
      }

      let timeoutId: NodeJS.Timeout;
      function update() {
        if (!el) return;
        const { scrollHeight, clientHeight, scrollTop } = el;
        // Проверяем реальную необходимость скролла
        setCanScroll(scrollHeight > clientHeight + 1);
        setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 2);
      }

      // throttled update для iOS
      function throttledUpdate() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(update, 16); // ~60fps
      }

      // initial
      update();
      el.addEventListener("scroll", throttledUpdate);
      // при изменении контента пересчитать (только для .services-list)
      const ro = new MutationObserver(throttledUpdate);
      ro.observe(el, { childList: true, subtree: false }); // только прямые дети
      window.addEventListener("resize", throttledUpdate);

      return () => {
        el.removeEventListener("scroll", throttledUpdate);
        ro.disconnect();
        window.removeEventListener("resize", throttledUpdate);
        clearTimeout(timeoutId);
      };
    }, [scrollRef.current, activeContent]);

    // При переключении контента ресетим скролл в начало
    useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }, [activeContent]);

    // Отслеживаем количество элементов в прайс-листе
    useEffect(() => {
      if (selectedCategory) {
        const getPriceData = () => {
          switch (selectedCategory) {
            case "Хирургия": return surgeryPrices;
            case "Дерматология": return dermatologyPrices;
            case "Стоматология": return stomatologyPrices;
            case "Травматология": return traumatologyPrices;
            case "Офтальмология": return ophthalmologyPrices;
            case "Лошади": return horsesPrices;
            case "Кремация": return cremationPrices;
            case "Узи": return ultrasoundPrices;
            case "Стационар": return hospitalPrices;
            case "Эндоскопия": return endoscopyPrices;
            case "Нейрохирургия": return neurosurgeryPrices;
            case "Рентген": return xrayPrices;
            case "Переливание крови": return bloodTransfusionPrices;
            case "Анестезиология": return anesthesiologyPrices;
            case "Прием кардиология": return cardiologyPrices;
            case "Диетология": return dietologyPrices;
            case "Эндокринология": return endocrinologyPrices;
            case "Гастроэнтеролог": return gastroenterologyPrices;
            case "Чипирование": return microchippingPrices;
            case "Нефрология": return nephrologyPrices;
            case "Неврология": return neurologyPrices;
            case "Онкология": return oncologyPrices;
            case "Онлайн консультация уз. спец.": return onlineConsultationPrices;
            case "Кислород": return oxygenPrices;
            case "Титры антител на бешенство": return rabiesTitersPrices;
            case "Зоопсихология": return zoopsychologyPrices;
            case "Вызов": return callPrices;
            case "Услуги": return servicesPrices;
            case "Общий прайс на все виды услуг": return citoPrices;
            case "Сіто!": return citoPrices;
            default: return [];
          }
        };
        const priceData = getPriceData();
        setPriceItemsCount(priceData.length);
      } else {
        setPriceItemsCount(0);
      }
    }, [selectedCategory]);

    // При выборе категории ресетим скролл в начало
    useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }, [selectedCategory]);

    // Компонент для отображения прайс-листа
    const PriceListComponent = ({ category }: { category: string }) => {
      const getPriceData = () => {
        switch (category) {
          case "Хирургия": return surgeryPrices;
          case "Дерматология": return dermatologyPrices;
          case "Стоматология": return stomatologyPrices;
          case "Травматология": return traumatologyPrices;
          case "Офтальмология": return ophthalmologyPrices;
          case "Лошади": return horsesPrices;
          case "Кремация": return cremationPrices;
          case "Узи": return ultrasoundPrices;
          case "Стационар": return hospitalPrices;
          case "Эндоскопия": return endoscopyPrices;
          case "Нейрохирургия": return neurosurgeryPrices;
          case "Рентген": return xrayPrices;
          case "Переливание крови": return bloodTransfusionPrices;
          case "Анестезиология": return anesthesiologyPrices;
          case "Прием кардиология": return cardiologyPrices;
          case "Диетология": return dietologyPrices;
          case "Эндокринология": return endocrinologyPrices;
          case "Гастроэнтеролог": return gastroenterologyPrices;
          case "Чипирование": return microchippingPrices;
          case "Нефрология": return nephrologyPrices;
          case "Неврология": return neurologyPrices;
          case "Онкология": return oncologyPrices;
          case "Онлайн консультация уз. спец.": return onlineConsultationPrices;
          case "Кислород": return oxygenPrices;
          case "Титры антител на бешенство": return rabiesTitersPrices;
          case "Зоопсихология": return zoopsychologyPrices;
          case "Вызов": return callPrices;
          case "Услуги": return servicesPrices;
          case "Общий прайс на все виды услуг": return citoPrices;
          case "Сіто!": return citoPrices;
          default: return [];
        }
      };

      const priceData = getPriceData();

      if (priceData.length === 0) {
        return (
          <div className="text-center text-muted-foreground py-8">
            <p>Данные для категории &quot;{category}&quot; не найдены</p>
            <p className="text-sm mt-2">Проверьте название категории</p>
          </div>
        );
      }

      return (
        <div className="flex flex-col gap-2" style={{ paddingBottom: "40px" }}>
          {priceData.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start py-2 border-b border-border"
              style={{
                fontFamily: "system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(14px, 3.5vw, 16px)",
                lineHeight: "1.4",
              }}
            >
              <div className="flex-1 pr-4">
                <div className="text-foreground font-medium">{item.name}</div>
                {item.description && (
                  <div className="text-muted-foreground text-sm mt-1">{item.description}</div>
                )}
              </div>
              <div className="text-foreground font-bold text-right whitespace-nowrap">
                {item.price}
              </div>
            </div>
          ))}
        </div>
      );
    };

    // Полный список услуг (для навигации по страницам)
    const services = [
      'Терапия',
      'Хирургия и травматология', 
      'Неврология и нейрохирургия',
      'Стоматология',
      'Эндоскопическая диагностика',
      'Визуальная диагностика',
      'Стационар и реанимация',
      'Кардиология',
      'Дерматология',
      'Нефрология',
      'Эндокринология',
      'Гастроэнтерология',
      'Диетология',
      'Онлайн консультация',
    ];

    // Полный список категорий прайсов
    const fullServices = [
      "Сіто!",
      "Вызов",
      "Дерматология",
      "Диетология",
      "Зоопсихология",
      "Кислород",
      "Кремация",
      "Лошади",
      "Неврология",
      "Нейрохирургия",
      "Нефрология",
      "Онкология",
      "Онлайн консультация уз. спец.",
      "Офтальмология",
      "Переливание крови",
      "Прием кардиология",
      "Рентген",
      "Стационар",
      "Стоматология",
      "Титры антител на бешенство",
      "Травматология",
      "Узи",
      "Гастроэнтеролог",
      "Услуги",
      "Хирургия",
      "Чипирование",
      "Эндокринология",
      "Эндоскопия",
      "Анестезиология",
    ];

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes bounce { 0%,20%,50%,80%,100%{ transform: translateY(0);} 40%{ transform: translateY(-5px);} 60%{ transform: translateY(-3px);} }
          
          /* Адаптивные стили для MobileMenu */
          @media (min-width: 769px) and (max-width: 1023px) {
            .mobile-menu-aside {
              width: 100vw !important;
              max-width: 100vw !important;
            }
          }
          
          @media (min-width: 1024px) {
            .mobile-menu-aside {
              width: 0 !important;
              display: none !important;
            }
            .mobile-menu-overlay {
              display: none !important;
            }
          }
        `}}/>

        {/* aside */}
        <aside
          ref={asideRef}
          className="mobile-menu-aside fixed inset-0 w-screen h-[100dvh] bg-background shadow-lg transition-transform duration-300 ease-in-out"
          style={{
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            zIndex: 9999,
            willChange: "transform", // оптимизация для iOS Safari
            WebkitOverflowScrolling: "touch", // плавный скролл iOS
          }}
        >
          {/* close btn - только для главного меню */}
          {activeContent === "main" && (
            <button
              onClick={closeMenu}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-card border border-border rounded-lg shadow-sm"
              aria-label="Закрыть меню"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          )}

          {/* контейнер контента */}
          <div 
            className="flex flex-col h-full p-6 pt-20 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {/* header area (ref для расчёта) */}
            <div ref={headerRef} className="mb-3">
              {/* в main: отображаем заголовки кнопки, в services: отображаем кнопку Назад */}
              {activeContent === "main" ? (
                <div className="flex flex-col gap-4">
                  {/* Личный кабинет */}
                  <button
                    onClick={() => handleNavigation('/profile')}
                    className="flex items-center justify-between py-3 text-left text-foreground text-xl font-semibold"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-blue-600 dark:text-blue-400">
                          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>Личный кабинет</span>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Прайс-лист */}
                  <button
                    onClick={() => {
                      setActiveContent("services");
                      setOpenedFrom("header");
                    }}
                    className="flex items-center justify-between py-3 text-left text-foreground text-xl font-semibold"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-green-600 dark:text-green-400">
                          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>Прайс-лист</span>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Отзывы и рейтинги */}
                  <button
                    onClick={() => handleNavigation('/reviews')}
                    className="flex items-center justify-between py-3 text-left text-foreground text-xl font-semibold"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-pink-100 dark:bg-pink-900/30">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-pink-600 dark:text-pink-400">
                          <path d="M20.84 4.61C19.32 3.09 17.16 3.09 15.64 4.61L12 8.25L8.36 4.61C6.84 3.09 4.68 3.09 3.16 4.61C1.64 6.13 1.64 8.29 3.16 9.81L12 18.65L20.84 9.81C22.36 8.29 22.36 6.13 20.84 4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="9" cy="9" r="1" fill="currentColor"/>
                          <circle cx="15" cy="9" r="1" fill="currentColor"/>
                          <path d="M9 13C9 13 10 14 12 14S15 13 15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>Отзывы и рейтинги</span>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Сертификаты и лицензии */}
                  <button
                    onClick={() => handleNavigation('/certificates')}
                    className="flex items-center justify-between py-3 text-left text-foreground text-xl font-semibold"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-red-600 dark:text-red-400">
                          <circle cx="12" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
                          <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>Сертификаты и лицензии</span>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* AI Помощник */}
                  <button
                    onClick={() => handleNavigation('/chat')}
                    className="flex items-center justify-between py-3 text-left text-foreground text-xl font-semibold"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/20 dark:bg-primary/30">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary dark:text-primary">
                          <path d="M12 8V4H8V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <rect width="16" height="12" x="4" y="8" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M2 14H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M18 14H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="9" cy="13" r="1" fill="currentColor"/>
                          <circle cx="15" cy="13" r="1" fill="currentColor"/>
                          <path d="M9 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>AI Помощник</span>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Скрытая кнопка: Кабинет врача */}
                  <button
                    onClick={() => handleNavigation('/doctor-auth')}
                    className="flex items-center justify-between py-3 text-left text-red-600 dark:text-red-400 text-lg font-medium border-l-4 border-red-200 dark:border-red-800 pl-4 mt-4"
                    title="Служебный доступ для врачей"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                        <Stethoscope className="w-4 h-4 text-red-600" />
                      </div>
                      <span>Кабинет врача</span>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Скрытая кнопка: Кабинет директора */}
                  <button
                    onClick={() => handleNavigation('/director-cabinet')}
                    className="flex items-center justify-between py-3 text-left text-yellow-600 dark:text-yellow-400 text-lg font-medium border-l-4 border-yellow-200 dark:border-yellow-800 pl-4 mt-2"
                    title="Служебный доступ для директора"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                        <Crown className="w-4 h-4 text-yellow-600" />
                      </div>
                      <span>Кабинет директора</span>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="px-4 mt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={goBack}
                      className="w-10 h-10 p-0"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">
                        {selectedCategory ? selectedCategory : "Прайс-лист"}
                      </h1>
                             <p className="text-sm text-muted-foreground">
                               {selectedCategory ? "Стоимость услуг" : "Выберите услугу"}
                             </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* scroll area */}
            <div
              ref={scrollRef}
              className="flex-grow overflow-y-auto pr-2"
            >
              {activeContent === "main" ? (
                <div className="flex flex-col gap-4">
                  {/* Контент уже отображается в header area */}
                </div>
              ) : selectedCategory ? (
                <div className="px-4">
                  <PriceListComponent category={selectedCategory} />
                  {/* sticky arrow: прилипает к нижней видимой границе скролла */}
                  {canScroll && !isAtBottom && priceItemsCount > 3 && (
                    <div style={{ position: "sticky", bottom: 8, display: "flex", justifyContent: "center", pointerEvents: "none", marginTop: 8 }}>
                      <svg 
                        width="12" 
                        height="12" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        style={{ color: "hsl(var(--foreground))", animation: "bounce 2s infinite" }}
                      >
                        <path 
                          d="M6 9L12 15L18 9" 
                          stroke="currentColor" 
                          strokeWidth="3" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2 px-4" style={{ paddingBottom: "40px" }}>
                  {fullServices.map((service) => (
                    <button
                      key={service}
                      className="flex items-center justify-between py-1 text-left text-foreground"
                      style={{ 
                        fontFamily: "system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: "clamp(16px, 4vw, 20px)",
                        lineHeight: "1.3",
                      }}
                      onClick={() => setSelectedCategory(service)}
                    >
                      <span>{service}</span>
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        className="text-foreground flex-shrink-0 ml-2"
                      >
                        <path 
                          d="M9 18L15 12L9 6" 
                          stroke="currentColor" 
                          strokeWidth="3" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  ))}
                  {/* sticky arrow: прилипает к нижней видимой границе скролла */}
                  {canScroll && !isAtBottom && (priceItemsCount > 3 || (!selectedCategory && fullServices.length > 5)) && (
                    <div style={{ position: "sticky", bottom: 8, display: "flex", justifyContent: "center", pointerEvents: "none", marginTop: 8 }}>
                      <svg 
                        width="12" 
                        height="12" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        style={{ color: "hsl(var(--foreground))", animation: "bounce 2s infinite" }}
                      >
                        <path 
                          d="M6 9L12 15L18 9" 
                          stroke="currentColor" 
                          strokeWidth="3" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* нижний блок иконок - ref для вычисления высоты */}
            <div
              ref={iconsRef}
              className="flex justify-center gap-4 flex-shrink-0 mt-auto pb-[env(safe-area-inset-bottom,16px)]"
            >
              {[
                "/contact%20icons/icons-telegram.svg",
                "/contact%20icons/icon-whatsapp.svg",
                "/contact%20icons/icon-instagram.svg",
                "/contact%20icons/icon-phone.svg",
              ].map((src, i) => (
                <a key={i} href="#" className="w-10 h-10 flex items-center justify-center bg-card border border-border rounded-lg shadow-sm">
                  <img src={src} alt="social" className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </>
    );
  }
);

MobileMenu.displayName = "MobileMenu";

export { MobileMenu };