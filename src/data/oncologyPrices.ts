export interface OncologyPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const oncologyPrices: OncologyPriceItem[] = [
  {
    id: 'onco_first_reception',
    name: 'Первичный прием онколога (ДЛЯ КОМБИНАЦИИ)',
    price: '1 500 ₽',
    description: 'Первичная консультация врача-онколога'
  }
];