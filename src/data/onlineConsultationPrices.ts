export interface OnlineConsultationPriceItem {
  id: string;
  name: string;
  price: string;
  description?: string;
}

export const onlineConsultationPrices: OnlineConsultationPriceItem[] = [
  {
    id: 'online_consultation_specialist',
    name: 'Консультация онлайн до 40 минут (узкая специальность)',
    price: '2 000 ₽',
    description: 'Онлайн консультация узкого специалиста'
  }
];