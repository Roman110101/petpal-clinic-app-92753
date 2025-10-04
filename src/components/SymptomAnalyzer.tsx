import React, { useRef, useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Activity, 
  Eye, 
  Thermometer, 
  Heart, 
  Zap,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  Square
} from 'lucide-react';

interface SymptomDetection {
  symptom: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
}

interface SymptomAnalyzerProps {
  isActive: boolean;
  onAnalysisComplete: (results: SymptomDetection[]) => void;
  onClose: () => void;
}

const SymptomAnalyzer: React.FC<SymptomAnalyzerProps> = ({ 
  isActive, 
  onAnalysisComplete, 
  onClose 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [detectedSymptoms, setDetectedSymptoms] = useState<SymptomDetection[]>([]);
  const [currentFrame, setCurrentFrame] = useState<string | null>(null);

  // Симуляция AI анализа симптомов
  const simulateSymptomAnalysis = () => {
    const symptoms: SymptomDetection[] = [
      {
        symptom: 'Вялость',
        confidence: 92,
        severity: 'medium',
        recommendation: 'Обеспечьте покой и обильное питье'
      },
      {
        symptom: 'Учащенное дыхание',
        confidence: 87,
        severity: 'high',
        recommendation: 'Немедленно покажите питомца ветеринару'
      },
      {
        symptom: 'Потеря аппетита',
        confidence: 78,
        severity: 'medium',
        recommendation: 'Следите за потреблением воды'
      },
      {
        symptom: 'Повышенная температура',
        confidence: 65,
        severity: 'high',
        recommendation: 'Измерьте температуру ректально'
      }
    ];

    // Симуляция прогресса анализа
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      setAnalysisProgress(Math.min(progress, 100));
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsAnalyzing(false);
        setDetectedSymptoms(symptoms);
        onAnalysisComplete(symptoms);
      }
    }, 200);
  };

  // Запуск анализа
  const startAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      setAnalysisProgress(0);
      setDetectedSymptoms([]);

      // Получаем доступ к камере
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Запускаем анализ через 2 секунды
      setTimeout(() => {
        simulateSymptomAnalysis();
      }, 2000);

    } catch (error) {
      console.error('Ошибка доступа к камере:', error);
      setIsAnalyzing(false);
    }
  };

  // Остановка анализа
  const stopAnalysis = () => {
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  // Захват кадра для анализа
  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        const dataURL = canvas.toDataURL('image/jpeg');
        setCurrentFrame(dataURL);
      }
    }
  };

  // Автоматический захват кадров во время анализа
  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(captureFrame, 1000);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Заголовок */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">AI Анализ симптомов</h2>
                <p className="text-sm text-muted-foreground">
                  Анализируем состояние питомца через камеру
                </p>
              </div>
            </div>
            <Button variant="outline" size="icon" onClick={onClose}>
              <Square className="w-4 h-4" />
            </Button>
          </div>

          {/* Видео поток */}
          <div className="relative mb-6">
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              
              {/* Наложение для анализа */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                      <Activity className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Анализируем...</h3>
                    <Progress value={analysisProgress} className="w-48 mx-auto" />
                    <p className="text-sm mt-2">{Math.round(analysisProgress)}%</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Скрытый canvas для захвата кадров */}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Управление */}
          <div className="flex gap-3 mb-6">
            {!isAnalyzing ? (
              <Button onClick={startAnalysis} className="flex-1">
                <Play className="w-4 h-4 mr-2" />
                Начать анализ
              </Button>
            ) : (
              <Button variant="destructive" onClick={stopAnalysis} className="flex-1">
                <Pause className="w-4 h-4 mr-2" />
                Остановить анализ
              </Button>
            )}
            
            <Button variant="outline" onClick={captureFrame}>
              <Camera className="w-4 h-4 mr-2" />
              Снимок
            </Button>
          </div>

          {/* Результаты анализа */}
          {detectedSymptoms.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Обнаруженные симптомы
              </h3>
              
              <div className="space-y-3">
                {detectedSymptoms.map((symptom, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getSeverityIcon(symptom.severity)}
                        <div>
                          <h4 className="font-semibold">{symptom.symptom}</h4>
                          <p className="text-sm text-muted-foreground">
                            Уверенность: {symptom.confidence}%
                          </p>
                        </div>
                      </div>
                      <Badge variant={getSeverityColor(symptom.severity)}>
                        {symptom.severity === 'high' ? 'Высокая' :
                         symptom.severity === 'medium' ? 'Средняя' : 'Низкая'}
                      </Badge>
                    </div>
                    
                    <div className="mb-2">
                      <Progress value={symptom.confidence} className="h-2" />
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      <strong>Рекомендация:</strong> {symptom.recommendation}
                    </p>
                  </Card>
                ))}
              </div>

              {/* Общая оценка */}
              <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <h4 className="font-semibold">Общая оценка состояния</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  На основе анализа обнаружено {detectedSymptoms.length} потенциальных симптомов
                </p>
                <div className="flex gap-2">
                  <Badge variant="destructive">
                    Высокая срочность
                  </Badge>
                  <Badge variant="outline">
                    Рекомендуется очный осмотр
                  </Badge>
                </div>
              </Card>
            </div>
          )}

          {/* Инструкции */}
          <Card className="p-4 bg-gray-50 dark:bg-gray-900/50">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-500" />
              Как использовать
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Разместите питомца перед камерой в хорошем освещении</li>
              <li>• Убедитесь, что питомец виден полностью</li>
              <li>• Анализ займет 30-60 секунд</li>
              <li>• Результаты носят рекомендательный характер</li>
            </ul>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default SymptomAnalyzer;
