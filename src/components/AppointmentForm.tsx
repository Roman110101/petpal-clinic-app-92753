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
    <Card className="p-6 md:p-8 bg-[var(--gradient-card)] border-border shadow-[var(--shadow-soft)]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-foreground">Ваше имя</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-2 bg-background"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-foreground">Телефон</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="mt-2 bg-background"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="petName" className="text-foreground">Имя питомца</Label>
              <Input
                id="petName"
                value={formData.petName}
                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                required
                className="mt-2 bg-background"
              />
            </div>
            <div>
              <Label htmlFor="petType" className="text-foreground">Тип питомца</Label>
              <Input
                id="petType"
                placeholder="Собака, кошка, и т.д."
                value={formData.petType}
                onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                required
                className="mt-2 bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="text-foreground">Дата</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="mt-2 bg-background"
              />
            </div>
            <div>
              <Label htmlFor="time" className="text-foreground">Время</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
                className="mt-2 bg-background"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="text-foreground">Дополнительная информация</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Опишите причину визита или особенности здоровья питомца"
              className="mt-2 bg-background min-h-[100px]"
            />
          </div>
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full">
          Записаться на приём
        </Button>
      </form>
    </Card>
  );
};
