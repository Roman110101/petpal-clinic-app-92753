export interface GastroenterologyPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const gastroenterologyPrices: GastroenterologyPriceItem[] = [
  {
    id: 'gastro_first_reception',
    name: 'Первичный прием гастроэнтеролога',
    price: '2 000 ₽',
    description: 'Первичная консультация врача-гастроэнтеролога'
  }
];