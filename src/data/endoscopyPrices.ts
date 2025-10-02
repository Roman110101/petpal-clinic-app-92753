export interface EndoscopyPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const endoscopyPrices: EndoscopyPriceItem[] = [
  {
    id: 'endosc_first_reception',
    name: 'Первичный прием вр эндоскописта',
    price: '2 000 ₽',
    description: 'Первичная консультация врача-эндоскописта'
  },
  {
    id: 'endosc_repeat_reception',
    name: 'Повторный прием вр эндоскописта',
    price: '1 500 ₽',
    description: 'Повторная консультация врача-эндоскописта'
  },
  {
    id: 'endosc_foreign_body_esophagus',
    name: 'Эндоскопическое удаление ИТ(инородных тел) из пищевода',
    price: '17 000 ₽',
    description: 'Эндоскопическое удаление инородных тел из пищевода'
  },
  {
    id: 'endosc_foreign_body_stomach',
    name: 'Эндоскопическое удаление ИТ(инор. тел) из желудка и двенадцатиперстной кишки методами малоинвазивной эндохирургии без проведения полостной операции. Без учёта а',
    price: '17 000 ₽',
    description: 'Эндоскопическое удаление инородных тел из желудка'
  },
  {
    id: 'endosc_gastropexy',
    name: 'Профилактическая гастропексия-открытая/эндоскопически ассистированная. Без учёта анестезии.',
    price: '18 000 ₽',
    description: 'Профилактическая гастропексия'
  },
  {
    id: 'endosc_videoendoscopy',
    name: 'Видеоэндоскопия (услуга для комбинаций)',
    price: '2 000 ₽',
    description: 'Видеоэндоскопическое исследование'
  },
  {
    id: 'endosc_gastroenterotomy',
    name: 'Гастротомия и энтеротомия (1 доступ) (без расходных материалов)',
    price: '15 000 ₽',
    description: 'Рассечение желудка и кишечника'
  }
];