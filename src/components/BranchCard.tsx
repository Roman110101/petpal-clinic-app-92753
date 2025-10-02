import { Card } from "@/components/ui/card";
import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BranchCardProps {
  name: string;
  address: string;
  phone: string;
  schedule: string;
  metro?: string;
}

export const BranchCard = ({ name, address, phone, schedule, metro }: BranchCardProps) => {
  return (
    <Card className="p-5 bg-card hover:shadow-[var(--shadow-hover)] transition-all duration-300">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">{name}</h3>
          {metro && (
            <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
              м. {metro}
            </span>
          )}
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{address}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-primary font-medium">
              {phone}
            </a>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{schedule}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="default" size="sm" className="flex-1">
            Позвонить
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Маршрут
          </Button>
        </div>
      </div>
    </Card>
  );
};
