import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onClick?: () => void;
  gradient?: string;
}

export const QuickActionCard = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  onClick,
  gradient = "from-primary to-primary-glow"
}: QuickActionCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="p-4 bg-card hover:shadow-[var(--shadow-hover)] transition-all duration-300 active:scale-95 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} flex-shrink-0`}>
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground truncate">{title}</h3>
          <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
        </div>
      </div>
    </Card>
  );
};
