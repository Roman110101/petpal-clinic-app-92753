export interface EndocrinologyPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const endocrinologyPrices: EndocrinologyPriceItem[] = [
  {
    id: 'endocr_first_reception',
    name: 'Первичный прием эндокринолога',
    price: '2 000 ₽',
    description: 'Первичная консультация врача-эндокринолога'
  },
  {
    id: 'endocr_repeat_reception',
    name: 'Повторный прием эндокринолога',
    price: '1 500 ₽',
    description: 'Повторная консультация врача-эндокринолога'
  }
];