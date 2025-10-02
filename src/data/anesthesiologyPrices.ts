export interface AnesthesiologyPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const anesthesiologyPrices: AnesthesiologyPriceItem[] = [
  {
    id: 'anest_1_cat',
    name: 'Анестезиологическое сопровождение 1й категории тяжести за 1 час',
    price: '2 500 ₽',
    description: 'Анестезиологическое сопровождение простых операций'
  },
  {
    id: 'anest_2_cat',
    name: 'Анестезиологическое сопровождение 2й категории тяжести за 1 час',
    price: '4 000 ₽',
    description: 'Анестезиологическое сопровождение средней сложности'
  },
  {
    id: 'anest_3_cat',
    name: 'Анестезиологическое сопровождение 3й категории тяжести за 1 час',
    price: '5 000 ₽',
    description: 'Анестезиологическое сопровождение сложных операций'
  },
  {
    id: 'anest_4_cat',
    name: 'Анестезиологическое сопровождение 4й категории тяжести за 1 час',
    price: '6 500 ₽',
    description: 'Анестезиологическое сопровождение особо сложных операций'
  },
  {
    id: 'med_son',
    name: 'Медикаментозный сон за 1 час',
    price: '2 000 ₽',
    description: 'Медикаментозная седация животного'
  },
  {
    id: 'priem_anest',
    name: 'Прием анестезиолога',
    price: '1 000 ₽',
    description: 'Консультация врача-анестезиолога'
  }
];