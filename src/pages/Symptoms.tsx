import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Activity, 
  Camera,
  Mic,
  FileText,
  CheckCircle,
  AlertTriangle,
  Eye,
  Thermometer,
  Heart,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SymptomDetection {
  symptom: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
}

const Symptoms = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Анализ симптомов</h1>
        </div>

        {/* Description */}
        <Card className="p-6 mb-6">
          <div className="text-center">
            <Activity className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Поможем определить состояние питомца
            </h2>
            <p className="text-muted-foreground text-sm">
              Используйте камеру или опишите симптомы для предварительной диагностики
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <Button
            onClick={() => navigate('/chat')}
            className="h-16 flex items-center gap-4"
            size="lg"
          >
            <Camera className="w-6 h-6" />
            <div className="text-left">
              <div className="font-semibold">Анализ по камере</div>
              <div className="text-sm opacity-90">Сфотографируйте питомца</div>
            </div>
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate('/chat')}
            className="h-16 flex items-center gap-4"
            size="lg"
          >
            <Mic className="w-6 h-6" />
            <div className="text-left">
              <div className="font-semibold">Голосовое описание</div>
              <div className="text-sm opacity-90">Расскажите о симптомах</div>
            </div>
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate('/appointment')}
            className="h-16 flex items-center gap-4"
            size="lg"
          >
            <FileText className="w-6 h-6" />
            <div className="text-left">
              <div className="font-semibold">Записаться на прием</div>
              <div className="text-sm opacity-90">Прямая консультация врача</div>
            </div>
          </Button>
        </div>


        {/* Common Symptoms */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Частые симптомы
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Eye, symptom: 'Вялость', color: 'text-blue-500' },
              { icon: Thermometer, symptom: 'Температура', color: 'text-red-500' },
              { icon: Heart, symptom: 'Учащенное дыхание', color: 'text-pink-500' },
              { icon: Zap, symptom: 'Судороги', color: 'text-yellow-500' },
              { icon: Activity, symptom: 'Потеря аппетита', color: 'text-green-500' },
              { icon: AlertTriangle, symptom: 'Рвота', color: 'text-orange-500' }
            ].map((item, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-12 flex flex-col items-center gap-1"
                onClick={() => navigate('/chat')}
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-xs">{item.symptom}</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Symptoms;
