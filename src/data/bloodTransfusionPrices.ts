export interface BloodTransfusionPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const bloodTransfusionPrices: BloodTransfusionPriceItem[] = [
  {
    id: 'blood_donor_cat',
    name: 'Взятие крови у донора д/переливания кошки',
    price: '3 200 ₽',
    description: 'Забор крови от кошки-донора'
  },
  {
    id: 'blood_donor_dog',
    name: 'Забор/взятие крови у донора собаки (включая расходные материалы)',
    price: '2 000 ₽',
    description: 'Забор крови от собаки-донора'
  },
  {
    id: 'blood_crossmatch',
    name: 'Перекрестная проба',
    price: '800 ₽',
    description: 'Проба на совместимость крови'
  },
  {
    id: 'blood_hemotransfusion',
    name: 'Гемотрансфузия',
    price: '5 000 ₽',
    description: 'Переливание крови'
  },
  {
    id: 'blood_hemotransfusion_monitoring',
    name: 'Гемотрансфузия мониторинг',
    price: '7 000 ₽',
    description: 'Переливание крови с мониторингом'
  }
];