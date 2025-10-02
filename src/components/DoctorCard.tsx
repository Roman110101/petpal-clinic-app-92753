import { Card } from "@/components/ui/card";
import type { Doctor } from "@/data/doctors";

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card className="relative overflow-hidden bg-card hover:shadow-md transition-shadow duration-200">
      <div className="relative h-80">
        {/* Фото врача */}
        <img
          src={`/Img team/${doctor.imageNumber}.jpg`}
          alt={`Фото ${doctor.name}`}
          className="absolute inset-0 w-full h-full object-cover object-top"
          loading="lazy"
          decoding="async"
        />
        
        {/* Градиент снизу для читаемости текста */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white dark:from-card to-transparent" />
        
        {/* Информация о враче - фиксированная высота снизу */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="space-y-1">
            <h3 className="font-bold text-foreground text-sm leading-tight line-clamp-2">
              {doctor.name}
            </h3>
            
            {doctor.specialty && (
              <p className="text-foreground text-xs leading-tight line-clamp-2">
                {doctor.specialty}
              </p>
            )}
            
            <p className="text-foreground text-xs leading-tight line-clamp-2">
              {doctor.position}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};