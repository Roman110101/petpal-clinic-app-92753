export interface TraumatologyPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const traumatologyPrices: TraumatologyPriceItem[] = [
  {
    id: 'trauma_first_reception',
    name: 'Первичный прием травматолога (ортопед)',
    price: '2 000 ₽',
    description: 'Первичная консультация врача-травматолога'
  },
  {
    id: 'trauma_femur_head_resection_cat_25kg',
    name: 'Резекция головки бедренной кости кошки/собаки до 25кг',
    price: '11 000 ₽',
    description: 'Резекция головки бедренной кости для животных до 25кг'
  },
  {
    id: 'trauma_femur_head_resection_25kg_plus',
    name: 'Резекция головки бедренной кости собаки от 25 кг',
    price: '16 000 ₽',
    description: 'Резекция головки бедренной кости для собак от 25кг'
  },
  {
    id: 'trauma_hard_palate_plasty',
    name: 'Пластика твердого неба при травматическом расхождении',
    price: '18 000 ₽',
    description: 'Пластика твердого неба при травме'
  },
  {
    id: 'trauma_metalosynthesis',
    name: 'Металоостеосинтез',
    price: '20 000 ₽',
    description: 'Металлический остеосинтез'
  },
  {
    id: 'trauma_forearm_osteosynthesis',
    name: 'Остеосинтез при переломе предплечья (лучевая и/или локтевая кости)',
    price: '18 000 ₽',
    description: 'Остеосинтез костей предплечья'
  },
  {
    id: 'trauma_pseudoarthrosis_treatment',
    name: 'Хирургическое лечение псевдоартроза (ложного сустава) при переломе предплечья (лучевая и/или локтевая кости)',
    price: '16 000 ₽',
    description: 'Лечение ложного сустава предплечья'
  },
  {
    id: 'trauma_shoulder_dislocation',
    name: 'Вправление вывиха плечевого сустава с фиксацией',
    price: '18 000 ₽',
    description: 'Вправление и фиксация вывиха плеча'
  },
  {
    id: 'trauma_tibia_osteosynthesis',
    name: 'Остеосинтез при переломе голени',
    price: '18 000 ₽',
    description: 'Остеосинтез костей голени'
  },
  {
    id: 'trauma_femur_osteosynthesis',
    name: 'Остеосинтез при переломе бедренной кости',
    price: '18 000 ₽',
    description: 'Остеосинтез бедренной кости'
  },
  {
    id: 'trauma_pelvis_osteosynthesis_one_side',
    name: 'Остеосинтез при переломе костей таза с одной стороны',
    price: '20 000 ₽',
    description: 'Остеосинтез таза односторонний'
  },
  {
    id: 'trauma_pelvis_osteosynthesis_two_sides',
    name: 'Остеосинтез при переломе костей таза накостной пластиной с двух сторон',
    price: '30 000 ₽',
    description: 'Остеосинтез таза двусторонний'
  },
  {
    id: 'trauma_sacroiliac_instability_one_side',
    name: 'Остеосинтез при крестцово-подвздошной нестабильности/разрыве с одной стороны',
    price: '13 000 ₽',
    description: 'Остеосинтез крестцово-подвздошного сочленения односторонний'
  },
  {
    id: 'trauma_sacroiliac_instability_two_sides',
    name: 'Остеосинтез при крестцово-подвздошной нестабильности/разрыве с двух сторон',
    price: '25 000 ₽',
    description: 'Остеосинтез крестцово-подвздошного сочленения двусторонний'
  },
  {
    id: 'trauma_fixator_removal',
    name: 'Удаление внутренних фиксаторов',
    price: '1 500 ₽',
    description: 'Удаление металлических имплантатов'
  },
  {
    id: 'trauma_upper_jaw_osteosynthesis',
    name: 'Остеосинтез верхней челюсти',
    price: '12 000 ₽',
    description: 'Остеосинтез верхней челюсти'
  },
  {
    id: 'trauma_lower_jaw_osteosynthesis',
    name: 'Остеосинтез нижней челюсти',
    price: '10 000 ₽',
    description: 'Остеосинтез нижней челюсти'
  },
  {
    id: 'trauma_acl_rupture_10kg',
    name: 'Операция при разрыве ПКС (передней крестообразной связки) (до 10 кг) Без учёта анестезии.',
    price: '15 000 ₽',
    description: 'Операция при разрыве передней крестообразной связки до 10кг'
  },
  {
    id: 'trauma_closed_reduction',
    name: 'Закрытое вправление вывиха',
    price: '5 700 ₽',
    description: 'Закрытое вправление вывиха'
  },
  {
    id: 'trauma_amputation_10kg',
    name: 'Ампутация конечности жив менее 10 кг',
    price: '12 000 ₽',
    description: 'Ампутация конечности для животных менее 10кг'
  },
  {
    id: 'trauma_amputation_10_25kg',
    name: 'Ампутация конечности жив 10-25 кг',
    price: '15 000 ₽',
    description: 'Ампутация конечности для животных 10-25кг'
  },
  {
    id: 'trauma_amputation_25kg_plus',
    name: 'Ампутация конечности жив от 25 кг',
    price: '19 000 ₽',
    description: 'Ампутация конечности для животных от 25кг'
  },
  {
    id: 'trauma_cast_application',
    name: 'Наложение гипса',
    price: '5 000 ₽',
    description: 'Наложение гипсовой повязки'
  }
];