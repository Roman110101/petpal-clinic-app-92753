import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const AppointmentForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    petName: "",
    petType: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время для подтверждения записи.",
    });
    setFormData({
      name: "",
      phone: "",
      petName: "",
      petType: "",
      date: "",
      time: "",
      notes: "",
    });
  };

  return (
    <Card className="p-4 bg-card border-border shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="flex flex-col">
            <Label htmlFor="name" className="text-foreground text-sm mb-1">Ваше имя</Label>
            <Input
              id="name"
              placeholder="Введите ваше имя"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-background h-10"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="phone" className="text-foreground text-sm mb-1">Телефон</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="bg-background h-10"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="petName" className="text-foreground text-sm mb-1">Имя питомца</Label>
            <Input
              id="petName"
              placeholder="Имя вашего питомца"
              value={formData.petName}
              onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
              required
              className="bg-background h-10"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="petType" className="text-foreground text-sm mb-1">Тип питомца</Label>
            <Input
              id="petType"
              placeholder="Собака, кошка, хомяк и т.д."
              value={formData.petType}
              onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
              required
              className="bg-background h-10"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="date" className="text-foreground text-sm mb-1">Дата приема</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="bg-background h-10"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="time" className="text-foreground text-sm mb-1">Время приема</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
              className="bg-background h-10"
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="notes" className="text-foreground text-sm mb-1">Дополнительная информация</Label>
              <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Опишите причину визита или дополнительную информацию"
              className="bg-background min-h-[60px] resize-none"
              style={{ fontSize: '16px' }}
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3">
          Записаться на приём
        </Button>
      </form>
    </Card>
  );
};
