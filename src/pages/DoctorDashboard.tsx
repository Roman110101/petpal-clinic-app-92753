import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { 
  LogOut, 
  Calendar,
  Users,
  Clock,
  Stethoscope,
  User,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Plus,
  Search,
  Filter,
  Bell,
  Activity,
  Heart,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [currentDoctor, setCurrentDoctor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('appointments');

  // Демо-данные для расписания
  const [appointments] = useState([
    {
      id: 1,
      time: '09:00',
      patient: 'Барсик',
      owner: 'Анна Петрова',
      phone: '+7 (999) 123-45-67',
      service: 'Осмотр терапевта',
      status: 'confirmed',
      notes: 'Плановый осмотр, жалоб нет'
    },
    {
      id: 2,
      time: '10:30',
      patient: 'Рекс',
      owner: 'Михаил Сидоров',
      phone: '+7 (999) 234-56-78',
      service: 'Вакцинация',
      status: 'waiting',
      notes: 'Первая вакцинация щенка'
    },
    {
      id: 3,
      time: '12:00',
      patient: 'Мурка',
      owner: 'Елена Козлова',
      phone: '+7 (999) 345-67-89',
      service: 'Консультация',
      status: 'completed',
      notes: 'Консультация по питанию'
    },
    {
      id: 4,
      time: '14:00',
      patient: 'Бобик',
      owner: 'Дмитрий Волков',
      phone: '+7 (999) 456-78-90',
      service: 'Хирургическая операция',
      status: 'urgent',
      notes: 'Срочная операция - удаление опухоли'
    },
    {
      id: 5,
      time: '16:30',
      patient: 'Тузик',
      owner: 'Ольга Морозова',
      phone: '+7 (999) 567-89-01',
      service: 'Стоматология',
      status: 'confirmed',
      notes: 'Чистка зубов под наркозом'
    }
  ]);

  // Демо-данные для пациентов
  const [patients] = useState([
    {
      id: 1,
      name: 'Барсик',
      species: 'cat',
      breed: 'Мейн-кун',
      age: 3,
      owner: 'Анна Петрова',
      phone: '+7 (999) 123-45-67',
      lastVisit: '2024-01-15',
      nextVisit: '2024-02-15',
      status: 'healthy'
    },
    {
      id: 2,
      name: 'Рекс',
      species: 'dog',
      breed: 'Немецкая овчарка',
      age: 2,
      owner: 'Михаил Сидоров',
      phone: '+7 (999) 234-56-78',
      lastVisit: '2024-01-10',
      nextVisit: '2024-01-25',
      status: 'vaccination'
    },
    {
      id: 3,
      name: 'Мурка',
      species: 'cat',
      breed: 'Персидская',
      age: 5,
      owner: 'Елена Козлова',
      phone: '+7 (999) 345-67-89',
      lastVisit: '2024-01-12',
      nextVisit: '2024-02-12',
      status: 'healthy'
    }
  ]);

  useEffect(() => {
    loadDoctorData();
  }, []);

  const loadDoctorData = () => {
    try {
      const doctorSession = localStorage.getItem('doctor_session');
      if (doctorSession) {
        const doctorData = JSON.parse(doctorSession);
        setCurrentDoctor(doctorData);
      } else {
        navigate('/doctor-auth');
        return;
      }
    } catch (error) {
      console.error('Error loading doctor data:', error);
      navigate('/doctor-auth');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('doctor_session');
    toast.success('Вы вышли из системы');
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'waiting': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'urgent': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Подтверждено';
      case 'waiting': return 'Ожидание';
      case 'completed': return 'Завершено';
      case 'urgent': return 'Срочно';
      default: return 'Неизвестно';
    }
  };

  const getSpeciesIcon = (species: string) => {
    switch (species) {
      case 'cat': return '🐱';
      case 'dog': return '🐕';
      case 'bird': return '🐦';
      default: return '🐾';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen pt-16">
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загружаем данные...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-16">
      {/* Header */}
      <PageHeader 
        title="Кабинет врача"
        subtitle={`Добро пожаловать, ${currentDoctor?.name}!`}
      >
        <Button variant="outline" size="sm" onClick={handleLogout} className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
          <LogOut className="w-4 h-4 mr-2" />
          Выйти
        </Button>
      </PageHeader>

      {/* Doctor Info */}
      <section className="px-4 mb-6">
        <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-red-200 dark:border-red-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                {currentDoctor?.name}
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {currentDoctor?.specialization}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600">Онлайн</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-700 dark:text-blue-300">
                {new Date().toLocaleDateString('ru-RU')}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                {new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Quick Stats */}
      <section className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-muted-foreground">Записей сегодня</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs text-muted-foreground">Пациентов</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-4 mb-6">
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'appointments' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Расписание
          </button>
          <button
            onClick={() => setActiveTab('patients')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'patients' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Пациенты
          </button>
        </div>
      </section>

      {/* Content */}
      {activeTab === 'appointments' && (
        <section className="px-4 mb-6">
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{appointment.time}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                    <h4 className="font-semibold text-lg">{appointment.patient}</h4>
                    <p className="text-sm text-muted-foreground mb-1">{appointment.service}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {appointment.owner}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {appointment.phone}
                      </div>
                    </div>
                    {appointment.notes && (
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        {appointment.notes}
                      </p>
                    )}
                  </div>
                  <Button size="sm" variant="outline">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'patients' && (
        <section className="px-4 mb-6">
          <div className="space-y-4">
            {patients.map((patient) => (
              <Card key={patient.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{getSpeciesIcon(patient.species)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{patient.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {patient.breed}, {patient.age} лет
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {patient.owner}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {patient.phone}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">Последний визит:</span>
                        <span className="ml-1 font-medium">{patient.lastVisit}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Следующий:</span>
                        <span className="ml-1 font-medium">{patient.nextVisit}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default DoctorDashboard;
