export interface NeurosurgeryPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const neurosurgeryPrices: NeurosurgeryPriceItem[] = [
  {
    id: 'neurosurg_first_reception',
    name: 'Первичный прием нейрохирурга',
    price: '2 500 ₽',
    description: 'Первичная консультация врача-нейрохирурга'
  },
  {
    id: 'neurosurg_spine_stabilization',
    name: 'Стабилизация позвоночного столба при нестабильности (Анестезиологическое сопровождение 4й категории)',
    price: '50 000 ₽',
    description: 'Хирургическая стабилизация позвоночника'
  },
  {
    id: 'neurosurg_laminectomy',
    name: 'Ламинэктомия (удаление грыжи межпозвоночного диска) Анестезиологическое сопровождение 4й категории',
    price: '32 000 ₽',
    description: 'Удаление межпозвоночной грыжи'
  },
  {
    id: 'neurosurg_laminectomy_stabilization',
    name: 'Ламинэктомия (удаление грыжи межпозвоночного диска) со стабилизацией позвоночного столба Анестезиологическое сопровождение 4й категории',
    price: '67 000 ₽',
    description: 'Ламинэктомия со стабилизацией позвоночника'
  },
  {
    id: 'neurosurg_atlantoaxial_stabilization',
    name: 'Стабилизация при атланто-оксиальной нестабильности (Анестезиологическое сопровождение 4й категории)',
    price: '40 000 ₽',
    description: 'Стабилизация шейного отдела позвоночника'
  },
  {
    id: 'neurosurg_myelography',
    name: 'Миелография услуга',
    price: '5 800 ₽',
    description: 'Контрастное исследование спинного мозга'
  },
  {
    id: 'neurosurg_spinal_tumor_removal',
    name: 'Удаление новообразований спинного мозга',
    price: '32 000 ₽',
    description: 'Хирургическое удаление опухолей спинного мозга'
  }
];