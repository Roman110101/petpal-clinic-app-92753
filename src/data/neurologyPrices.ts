export interface NeurologyPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const neurologyPrices: NeurologyPriceItem[] = [
  {
    id: 'neuro_first_reception',
    name: 'Первичный прием невролога',
    price: '2 000 ₽',
    description: 'Первичная консультация врача-невролога'
  },
  {
    id: 'neuro_repeat_reception',
    name: 'Повторный прием невролога',
    price: '1 500 ₽',
    description: 'Повторная консультация врача-невролога'
  }
];