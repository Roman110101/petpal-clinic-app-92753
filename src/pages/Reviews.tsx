import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { Star, User } from "lucide-react";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Анна Петрова",
      rating: 5,
      date: "15 февраля 2024",
      text: "Отличная клиника! Врачи очень внимательные и профессиональные. Мой кот Барсик получил качественное лечение.",
      doctor: "Иванова А.С."
    },
    {
      id: 2,
      name: "Михаил Сидоров",
      rating: 5,
      date: "10 февраля 2024",
      text: "Спасибо большое за помощь! Собаку вылечили быстро и качественно. Рекомендую всем!",
      doctor: "Петров В.И."
    },
    {
      id: 3,
      name: "Елена Козлова",
      rating: 4,
      date: "5 февраля 2024",
      text: "Хорошая клиника, современное оборудование. Единственный минус - долго ждали в очереди.",
      doctor: "Сидорова М.П."
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-background min-h-screen pt-16 ios-scroll-fix">
      {/* Header */}
      <PageHeader 
        title="Отзывы и рейтинги" 
        subtitle="Мнения наших клиентов"
        icon={<Star className="w-6 h-6" />}
      />

      {/* Overall Rating */}
      <section className="px-4 mt-6">
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-foreground mb-2">5.0</div>
          <div className="flex justify-center gap-1 mb-2">
            {renderStars(5)}
          </div>
          <div className="text-sm text-muted-foreground">Основано на 127 отзывах</div>
        </Card>
      </section>

      {/* Reviews List */}
      <section className="px-4 mt-6">
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold text-foreground">{review.name}</div>
                      <div className="text-sm text-muted-foreground">{review.date}</div>
                    </div>
                    <div className="flex gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-foreground mb-2">{review.text}</p>
                  <div className="text-sm text-muted-foreground">
                    Врач: {review.doctor}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Add Review Button */}
      <section className="px-4 mt-6 mb-6">
        <Card className="p-4 text-center bg-primary/5 border-primary/20">
          <div className="text-foreground font-semibold mb-2">Поделитесь своим опытом</div>
          <div className="text-sm text-muted-foreground mb-4">
            Ваш отзыв поможет другим владельцам питомцев
          </div>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium">
            Оставить отзыв
          </button>
        </Card>
      </section>
    </div>
  );
};

export default Reviews;
