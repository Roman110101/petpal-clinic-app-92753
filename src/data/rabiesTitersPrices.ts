export interface RabiesTitersPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const rabiesTitersPrices: RabiesTitersPriceItem[] = [
  {
    id: 'rabies_titer_test',
    name: 'Тест на определение титра антител бешенства (14-21 день)',
    price: '18 500 ₽',
    description: 'Лабораторный тест на антитела к бешенству'
  }
];