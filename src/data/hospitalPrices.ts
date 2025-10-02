export interface HospitalPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const hospitalPrices: HospitalPriceItem[] = [
  {
    id: 'hospital_12h_cat0_10kg',
    name: 'Стационар 12ч, категория 0 (до 10кг)',
    price: '500 ₽',
    description: 'Стационарное содержание легкой степени тяжести'
  },
  {
    id: 'hospital_12h_cat0_10_25kg',
    name: 'Стационар 12ч, категория 0 (10-25кг)',
    price: '750 ₽',
    description: 'Стационарное содержание легкой степени тяжести'
  },
  {
    id: 'hospital_12h_cat0_25kg',
    name: 'Стационар 12ч, категория 0 (от 25кг)',
    price: '900 ₽',
    description: 'Стационарное содержание легкой степени тяжести'
  },
  {
    id: 'hospital_12h_cat1_25kg',
    name: 'Стационар 12ч, категория 1 (до 25кг)',
    price: '1 250 ₽',
    description: 'Стационарное содержание средней степени тяжести'
  },
  {
    id: 'hospital_12h_cat1_25kg_plus',
    name: 'Стационар 12ч, категория 1 (от 25кг)',
    price: '2 000 ₽',
    description: 'Стационарное содержание средней степени тяжести'
  },
  {
    id: 'hospital_12h_cat2_25kg',
    name: 'Стационар 12ч, категория 2 (до 25 кг)',
    price: '1 750 ₽',
    description: 'Стационарное содержание тяжелой степени'
  },
  {
    id: 'hospital_12h_cat2_25kg_plus',
    name: 'Стационар 12ч, категория 2 (от 25 кг)',
    price: '3 500 ₽',
    description: 'Стационарное содержание тяжелой степени'
  },
  {
    id: 'hospital_12h_oxygen',
    name: 'Стационар 12 часов кислородный',
    price: '1 200 ₽',
    description: 'Стационарное содержание в кислородном боксе'
  },
  {
    id: 'hospital_material_damage',
    name: 'Материальный ущерб (от 500 до 50000)',
    price: '5 000 ₽',
    description: 'Компенсация материального ущерба'
  },
  {
    id: 'hospital_tonometry_12h',
    name: 'Тонометрия стационар за 12 часов (средняя)',
    price: '500 ₽',
    description: 'Контроль артериального давления в стационаре'
  },
  {
    id: 'hospital_monitoring',
    name: 'Стационар мониторинг (500-7000)',
    price: '500 ₽',
    description: 'Мониторинг состояния пациента'
  }
];