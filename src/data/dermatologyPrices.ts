export interface DermatologyPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const dermatologyPrices: DermatologyPriceItem[] = [
  {
    id: 'dermatophytes_scraping',
    name: 'Соскоб на дерматофиты (трихоскопия) Cito!',
    price: '900 ₽',
    description: 'Экстренное исследование на патогенные грибы'
  },
  {
    id: 'ectoparasites_scraping',
    name: 'Соскоб на эктопаразиты Cito!',
    price: '900 ₽',
    description: 'Экстренное исследование на паразитов'
  },
  {
    id: 'skin_impression',
    name: 'Мазок-отпечаток с кожи Cito!',
    price: '1 600 ₽',
    description: 'Экстренное цитологическое исследование'
  },
  {
    id: 'bacterial_culture',
    name: 'Бак-посев Мамайка',
    price: '2 500 ₽',
    description: 'Бактериологическое исследование'
  },
  {
    id: 'primary_consultation',
    name: 'Первичный прием дерматолога',
    price: '2 000 ₽',
    description: 'Первичный осмотр и консультация врача-дерматолога'
  },
  {
    id: 'repeat_consultation',
    name: 'Повторный прием дерматолога',
    price: '1 500 ₽',
    description: 'Консультация при повторном посещении'
  },
  {
    id: 'dermatoscopy',
    name: 'Дерматоскопия',
    price: '450 ₽',
    description: 'Дерматологическое исследование с помощью дерматоскопа'
  }
];