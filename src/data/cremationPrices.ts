export interface CremationPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const cremationPrices: CremationPriceItem[] = [
  // Индивидуальная кремация
  {
    id: 'cremation_ind_3kg',
    name: 'Кремация животных индивидуальная, до 3х кг',
    price: '11 000 ₽',
    description: 'Индивидуальная кремация животных до 3 кг'
  },
  {
    id: 'cremation_ind_4_8kg',
    name: 'Кремация животных индивидуальная, 4-8 кг',
    price: '13 000 ₽',
    description: 'Индивидуальная кремация животных 4-8 кг'
  },
  {
    id: 'cremation_ind_9_13kg',
    name: 'Кремация животных индивидуальная, 9-13 кг',
    price: '15 000 ₽',
    description: 'Индивидуальная кремация животных 9-13 кг'
  },
  {
    id: 'cremation_ind_14_18kg',
    name: 'Кремация животных индивидуальная 14-18 кг',
    price: '17 000 ₽',
    description: 'Индивидуальная кремация животных 14-18 кг'
  },
  {
    id: 'cremation_ind_19_23kg',
    name: 'Кремация животных индивидуальная 19-23 кг',
    price: '22 000 ₽',
    description: 'Индивидуальная кремация животных 19-23 кг'
  },
  {
    id: 'cremation_ind_24_58kg',
    name: 'Кремация животных индивидуальная, 24-58 кг',
    price: '25 000 ₽',
    description: 'Индивидуальная кремация животных 24-58 кг'
  },
  // Общая кремация в клинике
  {
    id: 'cremation_gen_clinic_3kg',
    name: 'Кремация животных общая в клинике, до 3х кг',
    price: '4 500 ₽',
    description: 'Общая кремация в клинике до 3 кг'
  },
  {
    id: 'cremation_gen_clinic_4_8kg',
    name: 'Кремация животных общая в клинике, 4-8 кг',
    price: '6 000 ₽',
    description: 'Общая кремация в клинике 4-8 кг'
  },
  {
    id: 'cremation_gen_clinic_9_13kg',
    name: 'Кремация животных общая в клинике, 9-13 кг',
    price: '6 500 ₽',
    description: 'Общая кремация в клинике 9-13 кг'
  },
  {
    id: 'cremation_gen_clinic_14_18kg',
    name: 'Кремация животных общая в клинике, 14-18 кг',
    price: '7 000 ₽',
    description: 'Общая кремация в клинике 14-18 кг'
  },
  {
    id: 'cremation_gen_clinic_19_23kg',
    name: 'Кремация животных общая в клинике, 19-23 кг',
    price: '7 500 ₽',
    description: 'Общая кремация в клинике 19-23 кг'
  },
  {
    id: 'cremation_gen_clinic_24_28kg',
    name: 'Кремация животных общая в клинике, 24-28 кг',
    price: '8 000 ₽',
    description: 'Общая кремация в клинике 24-28 кг'
  },
  {
    id: 'cremation_gen_clinic_29_33kg',
    name: 'Кремация животных общая в клинике, 29-33 кг',
    price: '8 500 ₽',
    description: 'Общая кремация в клинике 29-33 кг'
  },
  {
    id: 'cremation_gen_clinic_34_38kg',
    name: 'Кремация животных общая в клинике, 34-38 кг',
    price: '9 000 ₽',
    description: 'Общая кремация в клинике 34-38 кг'
  },
  {
    id: 'cremation_gen_clinic_39_43kg',
    name: 'Кремация животных общая в клинике, 39-43 кг',
    price: '9 000 ₽',
    description: 'Общая кремация в клинике 39-43 кг'
  },
  {
    id: 'cremation_gen_clinic_44_48kg',
    name: 'Кремация животных общая в клинике, 44-48 кг',
    price: '9 300 ₽',
    description: 'Общая кремация в клинике 44-48 кг'
  },
  {
    id: 'cremation_gen_clinic_49_53kg',
    name: 'Кремация животных общая в клинике, 49-53 кг',
    price: '9 700 ₽',
    description: 'Общая кремация в клинике 49-53 кг'
  },
  {
    id: 'cremation_gen_clinic_54_58kg',
    name: 'Кремация животных общая в клинике, 54-58 кг',
    price: '10 600 ₽',
    description: 'Общая кремация в клинике 54-58 кг'
  },
  // Общая кремация на вызове
  {
    id: 'cremation_gen_call_3kg',
    name: 'Кремация животных общая на вызове, до 3х кг',
    price: '4 000 ₽',
    description: 'Общая кремация на вызове до 3 кг'
  },
  {
    id: 'cremation_gen_call_4_8kg',
    name: 'Кремация животных общая на вызове, 4-8 кг',
    price: '7 000 ₽',
    description: 'Общая кремация на вызове 4-8 кг'
  },
  {
    id: 'cremation_gen_call_9_13kg',
    name: 'Кремация животных общая на вызове, 9-13 кг',
    price: '7 500 ₽',
    description: 'Общая кремация на вызове 9-13 кг'
  },
  {
    id: 'cremation_gen_call_14_18kg',
    name: 'Кремация животных общая на вызове, 14-18 кг',
    price: '8 000 ₽',
    description: 'Общая кремация на вызове 14-18 кг'
  },
  {
    id: 'cremation_gen_call_19_23kg',
    name: 'Кремация животных общая на вызове, 19-23 кг',
    price: '8 500 ₽',
    description: 'Общая кремация на вызове 19-23 кг'
  },
  {
    id: 'cremation_gen_call_24_28kg',
    name: 'Кремация животных общая на вызове, 24-28 кг',
    price: '9 000 ₽',
    description: 'Общая кремация на вызове 24-28 кг'
  },
  {
    id: 'cremation_gen_call_29_33kg',
    name: 'Кремация животных общая на вызове, 29-33 кг',
    price: '9 500 ₽',
    description: 'Общая кремация на вызове 29-33 кг'
  },
  {
    id: 'cremation_gen_call_34_38kg',
    name: 'Кремация животных общая на вызове, 34-38 кг',
    price: '10 000 ₽',
    description: 'Общая кремация на вызове 34-38 кг'
  },
  {
    id: 'cremation_gen_call_39_43kg',
    name: 'Кремация животных общая на вызове, 39-43 кг',
    price: '11 000 ₽',
    description: 'Общая кремация на вызове 39-43 кг'
  },
  {
    id: 'cremation_gen_call_44_48kg',
    name: 'Кремация животных общая на вызове, 44-48 кг',
    price: '12 000 ₽',
    description: 'Общая кремация на вызове 44-48 кг'
  },
  {
    id: 'cremation_gen_call_49_53kg',
    name: 'Кремация животных общая на вызове, 49-53 кг',
    price: '13 000 ₽',
    description: 'Общая кремация на вызове 49-53 кг'
  },
  {
    id: 'cremation_gen_call_54_58kg',
    name: 'Кремация животных общая на вызове, 54-58 кг',
    price: '15 000 ₽',
    description: 'Общая кремация на вызове 54-58 кг'
  }
];