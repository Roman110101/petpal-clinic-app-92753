export interface DietologyPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const dietologyPrices: DietologyPriceItem[] = [
  {
    id: 'diet_first_reception',
    name: 'Первичный прием диетолога',
    price: '2 000 ₽',
    description: 'Первичная консультация врача-диетолога'
  },
  {
    id: 'diet_ration',
    name: 'Составление рациона',
    price: '5 000 ₽',
    description: 'Индивидуальное составление рациона питания'
  },
  {
    id: 'diet_correction',
    name: 'Корректировка рациона',
    price: '1 000 ₽',
    description: 'Коррекция существующего рациона питания'
  }
];