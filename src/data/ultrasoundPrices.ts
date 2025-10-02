export interface UltrasoundPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const ultrasoundPrices: UltrasoundPriceItem[] = [
  {
    id: 'uzi_one_organ',
    name: 'УЗИ одного органа',
    price: '1 400 ₽',
    description: 'Ультразвуковое исследование одного органа'
  },
  {
    id: 'uzi_one_system',
    name: 'УЗИ одной системы органов',
    price: '2 300 ₽',
    description: 'УЗИ одной системы органов'
  },
  {
    id: 'uzi_abdomen',
    name: 'УЗИ брюшной полости',
    price: '3 500 ₽',
    description: 'Комплексное УЗИ брюшной полости'
  },
  {
    id: 'uzi_abdomen_adrenals',
    name: 'УЗИ брюшной полости+надпочечники',
    price: '4 000 ₽',
    description: 'УЗИ брюшной полости с надпочечниками'
  },
  {
    id: 'uzi_reproductive_system',
    name: 'УЗИ репродуктивной системы',
    price: '2 000 ₽',
    description: 'УЗИ органов репродуктивной системы'
  },
  {
    id: 'uzi_therapeutic',
    name: 'УЗИ терапевтическое',
    price: '1 300 ₽',
    description: 'Терапевтическое УЗИ'
  },
  {
    id: 'uzi_therapeutic_hospital',
    name: 'УЗИ терапевтическое (стационар)',
    price: '1 000 ₽',
    description: 'Терапевтическое УЗИ для стационарных пациентов'
  },
  {
    id: 'uzi_pregnancy',
    name: 'УЗИ по беременности',
    price: '2 000 ₽',
    description: 'УЗИ для диагностики беременности'
  },
  {
    id: 'uzi_afast',
    name: 'УЗИ Afast',
    price: '1 400 ₽',
    description: 'Быстрое УЗИ брюшной полости при травме'
  },
  {
    id: 'uzi_tfast',
    name: 'УЗИ Tfast',
    price: '1 400 ₽',
    description: 'Быстрое УЗИ грудной клетки при травме'
  },
  {
    id: 'uzi_git',
    name: 'УЗИ ЖКТ',
    price: '2 300 ₽',
    description: 'УЗИ желудочно-кишечного тракта'
  },
  {
    id: 'uzi_echo_screening',
    name: 'УЗИ эхо скрининг с заключением (для сторонних клиник)',
    price: '2 500 ₽',
    description: 'Эхокардиографический скрининг'
  },
  {
    id: 'uzi_heart_full',
    name: 'УЗИ сердца (полное) отдельно от приёма кардиолога',
    price: '3 000 ₽',
    description: 'Полное УЗИ сердца'
  },
  {
    id: 'uzi_heart_preoperative',
    name: 'УЗИ скрининг сердца предоперационный',
    price: '1 500 ₽',
    description: 'Предоперационный скрининг сердца'
  }
];