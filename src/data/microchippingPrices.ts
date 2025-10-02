export interface MicrochippingPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const microchippingPrices: MicrochippingPriceItem[] = [
  {
    id: 'microchipping',
    name: 'Чипирование (в стоимость входит чип)',
    price: '2 500 ₽',
    description: 'Чипирование животного с чипом'
  }
];