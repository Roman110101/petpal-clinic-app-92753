export interface CitoPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const citoPrices: CitoPriceItem[] = [
  {
    id: 'cito_kala_gelminty',
    name: 'Анализ кала на гельминты/простейшие (Cito!)',
    price: '1 100 ₽',
    description: 'Экстренное исследование кала на паразитов'
  },
  {
    id: 'cito_mazok_dirofilarioz',
    name: 'Мазок на дирофиляриоз (Cito!)',
    price: '1 100 ₽',
    description: 'Экстренное исследование на дирофиляриоз'
  },
  {
    id: 'cito_kala_gelminty_2',
    name: 'Исследование кала на я/г (гельминты) (Cito!)',
    price: '1 100 ₽',
    description: 'Экстренное исследование кала на яйца гельминтов'
  },
  {
    id: 'cito_mazok_babezia',
    name: 'Мазок крови на бабезия, эрлихия и анаплазма (Cito!)',
    price: '1 150 ₽',
    description: 'Экстренное исследование крови на кровепаразитов'
  },
  {
    id: 'cito_oam',
    name: 'ОАМ с микроскопией осадка (Cito!)',
    price: '1 300 ₽',
    description: 'Экстренный общий анализ мочи'
  },
  {
    id: 'cito_retikulocity',
    name: 'Ретикулоциты (Cito!)',
    price: '1 200 ₽',
    description: 'Экстренное исследование ретикулоцитов'
  },
  {
    id: 'cito_oka_polny',
    name: 'ОКА полный с лейкоформулой (Cito!)',
    price: '1 350 ₽',
    description: 'Экстренный общий клинический анализ крови'
  },
  {
    id: 'cito_vid_gelminta',
    name: 'Исследование вида гельминта (Cito!)',
    price: '900 ₽',
    description: 'Экстренная идентификация вида гельминта'
  },
  {
    id: 'cito_kala_koprogram',
    name: 'Общий анализ кала (копрограмма) (Cito!)',
    price: '1 400 ₽',
    description: 'Экстренное исследование кала'
  },
  {
    id: 'cito_citologia_krovi',
    name: 'Цитология крови (Cito!)',
    price: '1 900 ₽',
    description: 'Экстренное цитологическое исследование крови'
  },
  {
    id: 'cito_citologia_mochi',
    name: 'Цитология мочи (Cito!)',
    price: '1 900 ₽',
    description: 'Экстренное цитологическое исследование мочи'
  },
  {
    id: 'cito_skrytaya_krov',
    name: 'Скрытая кровь в кале (Cito!)',
    price: '1 100 ₽',
    description: 'Экстренное исследование скрытой крови в кале'
  },
  {
    id: 'cito_mazok_otpechatok',
    name: 'Мазок-отпечаток кожа/уши (Cito!)',
    price: '1 600 ₽',
    description: 'Экстренное цитологическое исследование кожи/ушей'
  },
  {
    id: 'cito_dermatofity',
    name: 'Исследование дерматофиты (Cito!)',
    price: '1 200 ₽',
    description: 'Экстренное исследование на дерматофиты'
  },
  {
    id: 'cito_ektoparazity',
    name: 'Исследование эктопаразиты (Cito!)',
    price: '900 ₽',
    description: 'Экстренное исследование на эктопаразитов'
  },
  {
    id: 'cito_pcr_parvovirus',
    name: 'ПЦР экспресс Pluslife парвовирус',
    price: '2 400 ₽',
    description: 'Экстренная ПЦР диагностика парвовируса'
  },
  {
    id: 'cito_pcr_fsm',
    name: 'ПЦР экспресс Pluslife кошки FSM (герпесвирус, кальцивирус, микоплазма)',
    price: '4 100 ₽',
    description: 'Экстренная ПЦР диагностика для кошек'
  },
  {
    id: 'cito_pcr_srq',
    name: 'ПЦР экспресс Pluslife собаки SRQ (чума собак, парагрипп, аденовирус 2 типа, бордотелла)',
    price: '4 400 ₽',
    description: 'Экстренная ПЦР диагностика для собак'
  },
  {
    id: 'cito_vypotnye_zhidkosti',
    name: 'cito! Исследование выпотных жидкостей (цитология,клеточный состав)',
    price: '3 100 ₽',
    description: 'Экстренное исследование выпотных жидкостей'
  }
];