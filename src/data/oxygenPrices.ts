export interface OxygenPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const oxygenPrices: OxygenPriceItem[] = [
  {
    id: 'oxygen_1_6_hours',
    name: 'Кислородная терапия (1-6 часов) стоимость за 1 час',
    price: '550 ₽',
    description: 'Кислородная терапия при острых состояниях'
  },
  {
    id: 'oxygen_7_24_hours',
    name: 'Кислородная терапия (7-24 часа) стоимость за 1 час',
    price: '400 ₽',
    description: 'Длительная кислородная терапия'
  }
];