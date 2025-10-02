export interface XrayPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const xrayPrices: XrayPriceItem[] = [
  {
    id: 'xray_1_projection',
    name: 'Рентген 1 проекция',
    price: '1 400 ₽',
    description: 'Рентгенография в одной проекции'
  },
  {
    id: 'xray_dysplasia_full',
    name: 'Рентген исследование на дисплазию (локоть, правый и левый таз)',
    price: '13 000 ₽',
    description: 'Полное исследование на дисплазию суставов'
  },
  {
    id: 'xray_dysplasia_elbow',
    name: 'Рентген исследование на дисплазию (локоть)',
    price: '7 000 ₽',
    description: 'Исследование локтевых суставов на дисплазию'
  },
  {
    id: 'xray_dysplasia_hip',
    name: 'Рентген исследование на дисплазию (правый и левый таз)',
    price: '7 000 ₽',
    description: 'Исследование тазобедренных суставов на дисплазию'
  },
  {
    id: 'xray_series_4_5',
    name: 'Серия рентген-снимков 4-5 шт (в т.ч при непроходимости с барием)',
    price: '5 200 ₽',
    description: 'Серия рентгенограмм с контрастом'
  }
];