export interface ZoopsychologyPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const zoopsychologyPrices: ZoopsychologyPriceItem[] = [
  {
    id: 'zoop_first_reception',
    name: 'Зоопсихолог первичный прием',
    price: '5 000 ₽',
    description: 'Первичная консультация зоопсихолога'
  },
  {
    id: 'zoop_repeat_reception',
    name: 'Зоопсихолог повторный прием',
    price: '5 000 ₽',
    description: 'Повторная консультация зоопсихолога'
  },
  {
    id: 'zoop_repeat_with_management',
    name: 'Зоопсихолог повторный прием с ведением пациента',
    price: '5 000 ₽',
    description: 'Повторная консультация с ведением пациента'
  }
];