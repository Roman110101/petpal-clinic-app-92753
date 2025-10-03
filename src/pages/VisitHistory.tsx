import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { AuthGuard } from "@/components/AuthGuard";
import { 
  Calendar, 
  Clock, 
  User, 
  FileText,
  Heart,
  Syringe,
  Stethoscope,
  Download,
  Eye
} from "lucide-react";
import { toast } from "sonner";

const VisitHistory = () => {
  const [visits, setVisits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVisitHistory();
  }, []);

  const loadVisitHistory = async () => {
    setIsLoading(true);
    
    // Демо данные для истории посещений
    setTimeout(() => {
      setVisits([
        {
          id: 1,
          date: '2024-01-15',
          time: '14:30',
          doctor: 'Др. Иванова Анна Сергеевна',
          pet: 'Барсик',
          type: 'Осмотр',
          status: 'Завершен',
          notes: 'Плановый осмотр. Питомец здоров. Рекомендована вакцинация через 3 месяца.',
          diagnosis: 'Здоров',
          treatment: 'Профилактический осмотр',
          nextVisit: '2024-04-15'
        },
        {
          id: 2,
          date: '2024-01-10',
          time: '10:00',
          doctor: 'Др. Петров Михаил Александрович',
          pet: 'Рекс',
          type: 'Вакцинация',
          status: 'Завершен',
          notes: 'Постановка комплексной вакцины. Питомец перенёс хорошо.',
          diagnosis: 'Профилактическая вакцинация',
          treatment: 'Комплексная вакцина',
          nextVisit: '2024-02-10'
        },
        {
          id: 3,
          date: '2023-12-20',
          time: '16:45',
          doctor: 'Др. Сидорова Елена Владимировна',
          pet: 'Барсик',
          type: 'Лечение',
          status: 'Завершен',
          notes: 'Лечение простуды. Назначен курс антибиотиков.',
          diagnosis: 'Острая респираторная инфекция',
          treatment: 'Антибиотикотерапия, витамины',
          nextVisit: '2023-12-27'
        },
        {
          id: 4,
          date: '2023-11-05',
          time: '09:30',
          doctor: 'Др. Иванова Анна Сергеевна',
          pet: 'Рекс',
          type: 'Чипирование',
          status: 'Завершен',
          notes: 'Установка микрочипа. Процедура прошла без осложнений.',
          diagnosis: 'Профилактическая процедура',
          treatment: 'Установка микрочипа',
          nextVisit: null
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'Осмотр': return <Stethoscope className="w-5 h-5 text-blue-500" />;
      case 'Вакцинация': return <Syringe className="w-5 h-5 text-green-500" />;
      case 'Лечение': return <Heart className="w-5 h-5 text-red-500" />;
      case 'Чипирование': return <Eye className="w-5 h-5 text-purple-500" />;
      default: return <Calendar className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Осмотр': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Вакцинация': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Лечение': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Чипирование': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen pt-16">
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загружаем историю посещений...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="bg-background min-h-screen pt-16">
        {/* Header */}
        <PageHeader 
          title="История посещений"
          subtitle="Все визиты ваших питомцев к ветеринару"
        />

        {/* Content */}
        <div className="px-4 mt-6">
          {visits.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">История посещений пуста</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Здесь будут отображаться все визиты ваших питомцев к ветеринару
              </p>
              <Button onClick={() => window.location.href = '/appointment'}>
                Записаться на приём
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {visits.map((visit) => (
                <Card key={visit.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(visit.type)}
                      <div>
                        <h3 className="font-semibold text-lg">{visit.pet}</h3>
                        <p className="text-sm text-muted-foreground">{visit.doctor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(visit.type)}`}>
                        {visit.type}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(visit.date)} в {visit.time}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 mb-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-sm">Диагноз</span>
                      </div>
                      <p className="text-sm">{visit.diagnosis}</p>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-sm">Лечение</span>
                      </div>
                      <p className="text-sm">{visit.treatment}</p>
                    </div>

                    {visit.notes && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Stethoscope className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-sm text-blue-800 dark:text-blue-200">Заметки врача</span>
                        </div>
                        <p className="text-sm text-blue-700 dark:text-blue-300">{visit.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Статус: {visit.status}</span>
                      </div>
                      {visit.nextVisit && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Следующий визит: {formatDate(visit.nextVisit)}</span>
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Справка
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {visits.length > 0 && (
          <div className="px-4 mt-6 mb-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Статистика</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{visits.length}</div>
                  <div className="text-sm text-blue-600">Всего визитов</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {visits.filter(v => v.status === 'Завершен').length}
                  </div>
                  <div className="text-sm text-green-600">Завершено</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Bottom spacing */}
        <div className="h-20"></div>
      </div>
    </AuthGuard>
  );
};

export default VisitHistory;
