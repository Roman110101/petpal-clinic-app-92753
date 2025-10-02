export interface NephrologyPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const nephrologyPrices: NephrologyPriceItem[] = [
  {
    id: 'nephro_first_reception',
    name: 'Первичный прием нефролога',
    price: '2 000 ₽',
    description: 'Первичная консультация врача-нефролога'
  },
  {
    id: 'nephro_repeat_reception',
    name: 'Повторный прием нефролога',
    price: '1 500 ₽',
    description: 'Повторная консультация врача-нефролога'
  }
];