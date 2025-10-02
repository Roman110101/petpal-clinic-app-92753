export interface OphthalmologyPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const ophthalmologyPrices: OphthalmologyPriceItem[] = [
  {
    id: 'ophth_first_reception',
    name: 'Первичный прием офтальмолога',
    price: '2 000 ₽',
    description: 'Первичная консультация врача-офтальмолога'
  },
  {
    id: 'ophth_repeat_reception',
    name: 'Повторный прием офтальмолога',
    price: '1 500 ₽',
    description: 'Повторная консультация врача-офтальмолога'
  },
  {
    id: 'ophth_jones_test',
    name: 'Тест Джонса 1',
    price: '250 ₽',
    description: 'Тест на проходимость слезных путей'
  },
  {
    id: 'ophth_schirmer_test',
    name: 'Офтальмология Тест Ширмера',
    price: '400 ₽',
    description: 'Тест на слезопродукцию'
  },
  {
    id: 'ophth_corneal_staining',
    name: 'Окрашивание роговицы',
    price: '300 ₽',
    description: 'Флюоресцентное окрашивание роговицы'
  },
  {
    id: 'ophth_fluorescein_test',
    name: 'Флюорисциновый тест',
    price: '300 ₽',
    description: 'Тест на целостность роговицы'
  },
  {
    id: 'ophth_nasolacrimal_wash',
    name: 'Офтальмология промывание носослезного канала',
    price: '1 000 ₽',
    description: 'Промывание слезно-носового канала'
  },
  {
    id: 'ophth_retrobulbar_injection',
    name: 'Офтальмология Ретробульбарная инъекция',
    price: '400 ₽',
    description: 'Инъекция за глазное яблоко'
  },
  {
    id: 'ophth_biomicroscopy',
    name: 'Офтальмология Биомикроскопия',
    price: '400 ₽',
    description: 'Биомикроскопическое исследование глаза'
  },
  {
    id: 'ophth_fundus_examination',
    name: 'Офтальмология осмотр глазного дна',
    price: '450 ₽',
    description: 'Офтальмоскопия глазного дна'
  },
  {
    id: 'ophth_tonometry',
    name: 'Офтальмотонометрия',
    price: '700 ₽',
    description: 'Измерение внутриглазного давления'
  },
  {
    id: 'ophth_slit_lamp',
    name: 'Обследование щелевой лампой',
    price: '300 ₽',
    description: 'Исследование с помощью щелевой лампы'
  },
  {
    id: 'ophth_corneal_suture',
    name: 'наложение швов на роговицу 1 шов',
    price: '2 000 ₽',
    description: 'Наложение шва на роговицу'
  },
  {
    id: 'ophth_corneal_suture_removal',
    name: 'Снятие швов с роговицы 1 шов',
    price: '1 000 ₽',
    description: 'Снятие шва с роговицы'
  },
  {
    id: 'ophth_eyelid_entropion',
    name: 'Пластика век при завороте',
    price: '5 200 ₽',
    description: 'Хирургическая коррекция заворота век'
  },
  {
    id: 'ophth_eyelid_ectropion',
    name: 'Пластика век при вывороте',
    price: '5 200 ₽',
    description: 'Хирургическая коррекция выворота век'
  },
  {
    id: 'ophth_foreign_body_conjunctiva',
    name: 'Удаление инородного предмета из конъюнктивы от 700 руб',
    price: '700 ₽',
    description: 'Удаление инородного тела из конъюнктивы'
  },
  {
    id: 'ophth_foreign_body_anterior_chamber',
    name: 'Удаление инородного тела из передней камеры глаза',
    price: '2 300 ₽',
    description: 'Удаление инородного тела из передней камеры'
  },
  {
    id: 'ophth_foreign_body_anterior_chamber_2',
    name: 'Удаление инородного предмета из передней камеры глаза',
    price: '4 200 ₽',
    description: 'Удаление инородного тела из передней камеры (сложное)'
  },
  {
    id: 'ophth_foreign_body_cornea',
    name: 'Удаление инородного тела из роговицы',
    price: '3 000 ₽',
    description: 'Удаление инородного тела из роговицы'
  },
  {
    id: 'ophth_eyelid_tumor_removal',
    name: 'Удаление новообразований века',
    price: '7 000 ₽',
    description: 'Хирургическое удаление опухолей века'
  },
  {
    id: 'ophth_third_eyelid_gland_removal',
    name: 'Удаление слезной железы 3 го века',
    price: '4 700 ₽',
    description: 'Удаление слезной железы третьего века'
  },
  {
    id: 'ophth_third_eyelid_gland_reposition',
    name: 'Вправление слезной железы',
    price: '5 500 ₽',
    description: 'Вправление выпавшей слезной железы'
  },
  {
    id: 'ophth_corneal_debridement',
    name: 'Хирургическая обработка роговицы',
    price: '700 ₽',
    description: 'Хирургическая обработка роговицы'
  },
  {
    id: 'ophth_corneal_ulcer_treatment',
    name: 'Хирургическая обработка язвы роговицы/лечение разрывов роговицы (от 700р)',
    price: '1 100 ₽',
    description: 'Лечение язвы роговицы'
  },
  {
    id: 'ophth_wedge_resection',
    name: 'Клиновидная резекция н/о век 1 глаз',
    price: '7 200 ₽',
    description: 'Клиновидная резекция новообразований век'
  },
  {
    id: 'ophth_t_cartilage_resection',
    name: 'Резекция ножки Т-образного хряща 3-го века (один глаз)',
    price: '7 200 ₽',
    description: 'Резекция хряща третьего века'
  },
  {
    id: 'ophth_ectopic_cilia_removal',
    name: 'Удаление эктопической ресницы (один глаз)',
    price: '2 500 ₽',
    description: 'Удаление неправильно растущих ресниц'
  }
];