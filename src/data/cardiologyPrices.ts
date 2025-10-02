export interface CardiologyPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const cardiologyPrices: CardiologyPriceItem[] = [
  {
    id: 'cardio_first_reception',
    name: 'Первичный прием кардиолога',
    price: '4 000 ₽',
    description: 'Первичная консультация врача-кардиолога'
  },
  {
    id: 'cardio_repeat_reception',
    name: 'Повторный прием кардиолога (приём+скрининг)',
    price: '2 600 ₽',
    description: 'Повторная консультация с кардиологическим скринингом'
  },
  {
    id: 'cardio_consultation_external',
    name: 'Консультация кардиолога по анализам сторонних клиник',
    price: '1 500 ₽',
    description: 'Консультация по результатам внешних исследований'
  }
];