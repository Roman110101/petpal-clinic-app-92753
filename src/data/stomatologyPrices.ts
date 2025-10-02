export interface StomatologyPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const stomatologyPrices: StomatologyPriceItem[] = [
  {
    id: 'stom_first_reception',
    name: 'Первичный прием вр стоматолога',
    price: '2 000 ₽',
    description: 'Первичная консультация врача-стоматолога'
  },
  {
    id: 'stom_milk_canine_removal',
    name: 'Удаление молочного клыка (900-1200р)',
    price: '900 ₽',
    description: 'Удаление молочного клыка'
  },
  {
    id: 'stom_oral_sanitation_cats',
    name: 'Санация ротовой полости у кошек',
    price: '3 700 ₽',
    description: 'Комплексная санация ротовой полости кошек'
  },
  {
    id: 'stom_oral_sanitation_1',
    name: 'Санация ротовой полости 1 категория',
    price: '4 100 ₽',
    description: 'Санация ротовой полости легкой степени'
  },
  {
    id: 'stom_oral_sanitation_2',
    name: 'Санация ротовой полости 2 категория',
    price: '5 700 ₽',
    description: 'Санация ротовой полости средней степени'
  },
  {
    id: 'stom_gingivectomy_cats',
    name: 'Гингивоэктомия у кошек 1 обл',
    price: '1 500 ₽',
    description: 'Удаление десны у кошек'
  },
  {
    id: 'stom_gingivectomy_dogs',
    name: 'Гингивоэктомия у собак 1 обл',
    price: '2 000 ₽',
    description: 'Удаление десны у собак'
  },
  {
    id: 'stom_antiseptic_treatment',
    name: 'Антисептическая обработка ротовой полости',
    price: '500 ₽',
    description: 'Обработка ротовой полости антисептиками'
  },
  {
    id: 'stom_permanent_tooth_removal',
    name: 'Удаление постоянного зуба простое (кроме клыков)',
    price: '1 300 ₽',
    description: 'Простое удаление постоянного зуба'
  },
  {
    id: 'stom_2root_tooth_removal',
    name: 'Удаление постоянного 2х корневого зуба сложное',
    price: '2 500 ₽',
    description: 'Сложное удаление двухкорневого зуба'
  },
  {
    id: 'stom_3root_tooth_removal',
    name: 'Удаление постоянного 3х корневого зуба сложное',
    price: '4 000 ₽',
    description: 'Сложное удаление трехкорневого зуба'
  },
  {
    id: 'stom_canine_removal',
    name: 'Удаление постоянного клыка',
    price: '4 000 ₽',
    description: 'Удаление постоянного клыка'
  },
  {
    id: 'stom_tooth_fragment_removal',
    name: 'Удаление фрагмента зуба 1 фрагмент',
    price: '1 000 ₽',
    description: 'Удаление осколка зуба'
  },
  {
    id: 'stom_tartar_removal',
    name: 'Механическое снятие зубного камня (1 зуб)',
    price: '400 ₽',
    description: 'Механическая очистка зубного камня'
  },
  {
    id: 'stom_temporary_filling',
    name: 'Постановка временной пломбы',
    price: '2 300 ₽',
    description: 'Установка временной пломбы'
  },
  {
    id: 'stom_gum_plasty',
    name: 'Пластика десны',
    price: '2 600 ₽',
    description: 'Пластическая хирургия десны'
  },
  {
    id: 'stom_teeth_polishing',
    name: 'Полировка зубов',
    price: '1 000 ₽',
    description: 'Полировка зубов после чистки'
  },
  {
    id: 'stom_closed_curettage',
    name: 'Закрытый кюретаж одного десневого кармана',
    price: '600 ₽',
    description: 'Закрытая чистка десневого кармана'
  },
  {
    id: 'stom_medicinal_treatment',
    name: 'Медикаментозная обработка 1 десневого кармана',
    price: '170 ₽',
    description: 'Медикаментозная обработка десневого кармана'
  },
  {
    id: 'stom_root_fistula_treatment_10kg',
    name: 'Лечение свища корня (удаление 1 зуба,обработка хода,наложение швов) до 10 кг',
    price: '4 000 ₽',
    description: 'Лечение свища корня зуба для животных до 10 кг'
  },
  {
    id: 'stom_root_fistula_treatment_10kg_plus',
    name: 'Лечение свища корня (удаление 1 зуба,обработка хода,наложение швов) от 10 кг',
    price: '6 000 ₽',
    description: 'Лечение свища корня зуба для животных от 10 кг'
  },
  {
    id: 'stom_impacted_tooth_removal_10kg',
    name: 'Удаление ретинированного/дистопированного зуба с наложением швов (без стоимости анестезии) до 10 кг',
    price: '4 000 ₽',
    description: 'Удаление непрорезавшегося зуба до 10 кг'
  },
  {
    id: 'stom_impacted_tooth_removal_10kg_plus',
    name: 'Удаление ретинированного/дистопированного зуба с наложением швов (без стоимости анестезии) от 10 кг',
    price: '6 000 ₽',
    description: 'Удаление непрорезавшегося зуба от 10 кг'
  },
  {
    id: 'stom_odontogenic_abscess_treatment',
    name: 'Лечение и закрытие одонтогенных абсцессов',
    price: '7 000 ₽',
    description: 'Лечение гнойных процессов зубного происхождения'
  },
  {
    id: 'stom_oronasal_fistula_treatment',
    name: 'Оперативное лечение ороназальной фистулы',
    price: '6 000 ₽',
    description: 'Хирургическое лечение свища между ротовой и носовой полостью'
  }
];