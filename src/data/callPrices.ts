export interface CallPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const callPrices: CallPriceItem[] = [
  {
    id: 'call_basic',
    name: 'Вызов от 1500 ( в зависимости от удаленности)',
    price: '1 500 ₽',
    description: 'Базовая стоимость вызова ветеринара на дом'
  },
  {
    id: 'call_doctor',
    name: 'Вызов доктора',
    price: '5 000 ₽',
    description: 'Стандартный вызов ветеринарного врача'
  }
];