import { Card } from "@/components/ui/card";

interface DoctorCardProps {
  name: string;
  specialty: string;
  experience: string;
}

export const DoctorCard = ({ name, specialty, experience }: DoctorCardProps) => {
  return (
    <Card className="p-6 bg-[var(--gradient-card)] border-border hover:shadow-[var(--shadow-hover)] transition-all duration-300">
      <div className="space-y-3">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-glow mx-auto flex items-center justify-center">
          <span className="text-2xl font-bold text-primary-foreground">
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>
          <p className="text-primary text-sm font-medium">{specialty}</p>
          <p className="text-muted-foreground text-sm mt-2">{experience}</p>
        </div>
      </div>
    </Card>
  );
};
