import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Activity, 
  Eye, 
  Thermometer, 
  Heart, 
  Zap,
  CheckCircle,
  AlertTriangle,
  Camera,
  Mic,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SymptomAnalyzer from '@/components/SymptomAnalyzer';

interface SymptomDetection {
  symptom: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
}

const Symptoms = () => {
  const navigate = useNavigate();
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<SymptomDetection[]>([]);

  const handleAnalysisComplete = (results: SymptomDetection[]) => {
    setAnalysisResults(results);
    setIsAnalyzerOpen(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

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
            onClick={() => setIsAnalyzerOpen(true)}
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

        {/* Analysis Results */}
        {analysisResults.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Результаты анализа
            </h3>
            <div className="space-y-4">
              {analysisResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(result.severity)}
                      <span className="font-medium text-foreground">
                        {result.symptom}
                      </span>
                    </div>
                    <Badge className={getSeverityColor(result.severity)}>
                      {result.severity === 'low' ? 'Низкий' : 
                       result.severity === 'medium' ? 'Средний' : 'Высокий'}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Уверенность: {result.confidence}%
                  </div>
                  <p className="text-sm text-foreground">
                    {result.recommendation}
                  </p>
                </div>
              ))}
            </div>
            <Button 
              onClick={() => navigate('/appointment')}
              className="w-full mt-4"
            >
              Записаться на прием
            </Button>
          </Card>
        )}

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

      {/* Symptom Analyzer Modal */}
      <SymptomAnalyzer
        isActive={isAnalyzerOpen}
        onAnalysisComplete={handleAnalysisComplete}
        onClose={() => setIsAnalyzerOpen(false)}
      />
    </div>
  );
};

export default Symptoms;
