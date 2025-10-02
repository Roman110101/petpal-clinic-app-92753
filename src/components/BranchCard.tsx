import { Card } from "@/components/ui/card";
import { MapPin, Phone, Clock, ExternalLink, Calendar, Navigation, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface BranchCardProps {
  name: string;
  address: string;
  phone: string;
  schedule: string;
  metro?: string;
  website?: string;
}

export const BranchCard = ({ name, address, phone, schedule, metro, website }: BranchCardProps) => {
  const [showNavigatorModal, setShowNavigatorModal] = useState(false);

  const navigators = [
    {
      name: "Яндекс.Карты",
      icon: "🗺️",
      url: `https://yandex.ru/maps/?text=${encodeURIComponent(address)}`,
      color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
    },
    {
      name: "Google Maps",
      icon: "🌍",
      url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
    },
    {
      name: "2ГИС",
      icon: "📍",
      url: `https://2gis.ru/search/${encodeURIComponent(address)}`,
      color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
    },
    {
      name: "Apple Maps",
      icon: "🍎",
      url: `http://maps.apple.com/?q=${encodeURIComponent(address)}`,
      color: "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300"
    }
  ];

  const handleNavigatorSelect = (url: string) => {
    window.open(url, '_blank');
    setShowNavigatorModal(false);
  };

  return (
    <>
      <Card className="p-6 bg-card transition-all duration-300">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">{name}</h3>
            {metro && (
              <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-lg">
                м. {metro}
              </span>
            )}
          </div>
          
          <div className="space-y-3 text-base">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{address}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-primary font-medium">Без выходных</span>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{schedule}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              variant="default" 
              size="sm" 
              className="text-xs px-3"
              onClick={() => window.location.href = `tel:${phone.replace(/\D/g, '')}`}
            >
              <Phone className="w-3 h-3" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs px-2"
              onClick={() => setShowNavigatorModal(true)}
            >
              <MapPin className="w-3 h-3 mr-1" />
              Маршрут
            </Button>
            {website && (
              <Button 
                variant="secondary" 
                size="sm" 
                className="flex-1 text-xs px-2 text-foreground"
                onClick={() => window.open(website, '_blank')}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Сайт
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Navigator Selection Modal */}
      {showNavigatorModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg w-full max-w-sm mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Выберите навигатор</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNavigatorModal(false)}
                className="w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Navigator Options */}
            <div className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground mb-4">
                Маршрут до: <span className="font-medium text-foreground">{address}</span>
              </p>
              
              {navigators.map((navigator, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full justify-start gap-3 h-12 ${navigator.color}`}
                  onClick={() => handleNavigatorSelect(navigator.url)}
                >
                  <span className="text-lg">{navigator.icon}</span>
                  <span className="font-medium">{navigator.name}</span>
                </Button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 pt-0">
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setShowNavigatorModal(false)}
              >
                Отмена
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
