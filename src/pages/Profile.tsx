import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  PawPrint, 
  Calendar, 
  Syringe, 
  Heart, 
  Bell, 
  Camera, 
  Edit3,
  Plus,
  Activity,
  Clock,
  Image,
  Upload
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPet, setSelectedPet] = useState(0);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [showVaccinations, setShowVaccinations] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [petPhotos, setPetPhotos] = useState<{[key: number]: string}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Состояние для хранения данных питомцев (можно редактировать)
  const [petsData, setPetsData] = useState([
    {
      id: 1,
      name: "Барсик",
      type: "Кот", 
      breed: "Мейн-кун",
      age: "3 года",
      weight: "7 кг",
      color: "Рыжий",
      height: "35 см",
      chip: "123456789012345",
      notes: "Спокойный характер, любит играть",
      nextVisit: "15.03.2025",
      vaccinations: [
        { name: "Комплексная вакцина", date: "2024-01-15", status: "completed" },
        { name: "Бешенство", date: "2024-01-15", status: "completed" },
        { name: "Комплексная вакцина", date: "2025-01-15", status: "upcoming" }
      ],
      history: [
        { date: "2024-02-10", reason: "Плановый осмотр", doctor: "Иванова А.С." },
        { date: "2024-01-15", reason: "Вакцинация", doctor: "Петров В.И." }
      ]
    },
    {
      id: 2,
      name: "Рекс",
      type: "Собака",
      breed: "Немецкая овчарка", 
      age: "5 лет",
      weight: "30 кг",
      color: "Черно-коричневый",
      height: "65 см", 
      chip: "987654321098765",
      notes: "Активный, хорошо обучен",
      nextVisit: "20.04.2025",
      vaccinations: [
        { name: "Комплексная вакцина", date: "2024-03-20", status: "completed" },
        { name: "Бешенство", date: "2024-03-20", status: "completed" }
      ],
      history: [
        { date: "2024-03-20", reason: "Вакцинация", doctor: "Сидорова М.П." }
      ]
    },
    {
      id: 3,
      name: "Хома", 
      type: "Хомяк",
      breed: "Джунгарский",
      age: "1 год",
      weight: "0.1 кг",
      color: "Серый",
      height: "8 см",
      chip: "",
      notes: "Очень активный, любит колесо",
      nextVisit: "01.06.2025",
      vaccinations: [],
      history: [
        { date: "2024-01-10", reason: "Первичный осмотр", doctor: "Иванова А.С." }
      ]
    }
  ]);

  // Состояние для формы редактирования
  const [editFormData, setEditFormData] = useState({
    name: "",
    breed: "",
    age: "",
    weight: "",
    color: "",
    height: "",
    chip: "",
    notes: ""
  });

  const currentPet = petsData[selectedPet];

  const handlePhotoClick = () => {
    setShowPhotoOptions(true);
  };

  const handleTakePhoto = () => {
    // Открываем камеру (на мобильных устройствах)
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment');
      fileInputRef.current.click();
    }
    setShowPhotoOptions(false);
  };

  const handleChoosePhoto = () => {
    // Открываем галерею
    if (fileInputRef.current) {
      fileInputRef.current.removeAttribute('capture');
      fileInputRef.current.click();
    }
    setShowPhotoOptions(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Создаём URL для предварительного просмотра
      const imageUrl = URL.createObjectURL(file);
      
      // Сохраняем фото для текущего питомца
      setPetPhotos(prev => ({
        ...prev,
        [currentPet.id]: imageUrl
      }));
      
      toast({
        title: "Фото загружено!",
        description: `Фото для ${currentPet.name} успешно обновлено.`,
      });
    }
    
    // Очищаем input для повторного выбора того же файла
    if (event.target) {
      event.target.value = '';
    }
  };

  const handleAppointment = () => {
    toast({
      title: "Переход к записи",
      description: `Записываем ${currentPet.name} на приём...`,
    });
    // Здесь будет переход к форме записи с предзаполненными данными
  };

  const handleEditPet = () => {
    // Заполняем форму текущими данными питомца
    setEditFormData({
      name: currentPet.name,
      breed: currentPet.breed,
      age: currentPet.age,
      weight: currentPet.weight,
      color: currentPet.color || "",
      height: currentPet.height || "",
      chip: currentPet.chip || "",
      notes: currentPet.notes || ""
    });
    setShowEditForm(true);
  };

  const handleSaveEdit = () => {
    // Обновляем данные питомца
    setPetsData(prevPets => 
      prevPets.map(pet => 
        pet.id === currentPet.id 
          ? { ...pet, ...editFormData }
          : pet
      )
    );
    
    toast({
      title: "Данные сохранены!",
      description: `Информация о ${editFormData.name} успешно обновлена.`,
    });
    setShowEditForm(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleShowVaccinations = () => {
    setShowVaccinations(true);
  };

  const handleShowHistory = () => {
    setShowHistory(true);
  };

  const handleAddPet = () => {
    // Сбрасываем форму для нового питомца
    setEditFormData({
      name: "",
      breed: "",
      age: "",
      weight: "",
      color: "",
      height: "",
      chip: "",
      notes: ""
    });
    setShowAddForm(true);
  };

  const handleSaveNewPet = () => {
    if (!editFormData.name.trim()) {
      toast({
        title: "Ошибка",
        description: "Имя питомца обязательно для заполнения",
        variant: "destructive"
      });
      return;
    }

    const newPet = {
      id: Date.now(), // Простой способ генерации ID
      name: editFormData.name,
      type: "Питомец", // По умолчанию
      breed: editFormData.breed || "Не указано",
      age: editFormData.age || "Не указано",
      weight: editFormData.weight || "Не указано",
      color: editFormData.color,
      height: editFormData.height,
      chip: editFormData.chip,
      notes: editFormData.notes,
      nextVisit: "Не назначен",
      vaccinations: [],
      history: []
    };

    setPetsData(prev => [...prev, newPet]);
    setSelectedPet(petsData.length); // Переключаемся на нового питомца
    
    toast({
      title: "Питомец добавлен!",
      description: `${editFormData.name} успешно добавлен в ваш профиль.`,
    });
    
    setShowAddForm(false);
  };

  const handleDeletePet = () => {
    if (petsData.length <= 1) {
      toast({
        title: "Нельзя удалить",
        description: "У вас должен быть хотя бы один питомец",
        variant: "destructive"
      });
      return;
    }
    setShowDeleteConfirm(true);
  };

  const confirmDeletePet = () => {
    const petName = currentPet.name;
    setPetsData(prev => prev.filter(pet => pet.id !== currentPet.id));
    
    // Переключаемся на первого питомца если удаляем текущего
    if (selectedPet >= petsData.length - 1) {
      setSelectedPet(0);
    }
    
    toast({
      title: "Питомец удален",
      description: `${petName} удален из вашего профиля.`,
    });
    
    setShowDeleteConfirm(false);
  };

  return (
    <div className="bg-background min-h-screen pt-16 ios-scroll-fix">
      {/* Header */}
      <PageHeader 
        title="Личный кабинет" 
        subtitle="Управление здоровьем ваших питомцев"
        icon={<User className="w-6 h-6" />}
      />

      {/* Pet Selection */}
      <section className="px-4 mt-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {petsData.map((pet, index) => (
            <button
              key={pet.id}
              onClick={() => setSelectedPet(index)}
              className={`flex-shrink-0 p-3 rounded-lg border-2 transition-all min-w-[160px] ${
                selectedPet === index 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border bg-card'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center">
                  <PawPrint className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground text-sm">{pet.name}</div>
                  <div className="text-xs text-muted-foreground">{pet.type}</div>
                </div>
              </div>
            </button>
          ))}
          
          {/* Add Pet Button */}
          <button 
            onClick={handleAddPet}
            className="flex-shrink-0 p-3 rounded-lg border-2 border-dashed border-border bg-card hover:bg-muted/30 transition-colors min-w-[160px]"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground text-sm">Добавить</div>
                <div className="text-xs text-muted-foreground">питомца</div>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Pet Profile */}
      <section className="px-4 mt-6">
        <Card className="p-6">
          {/* Pet Header */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div 
                className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-3 cursor-pointer hover:from-primary/30 hover:to-primary/20 transition-all overflow-hidden"
                onClick={handlePhotoClick}
              >
                {petPhotos[currentPet.id] ? (
                  <img 
                    src={petPhotos[currentPet.id]} 
                    alt={currentPet.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PawPrint className="w-12 h-12 text-primary" />
                )}
              </div>
              <button 
                onClick={handlePhotoClick}
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
          <h2 className="text-2xl font-bold text-foreground mb-1">{currentPet.name}</h2>
          <p className="text-muted-foreground mb-3">{currentPet.breed}</p>
          
          {/* Основные характеристики */}
          <div className="grid grid-cols-2 gap-3 text-sm mb-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>{currentPet.age}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Activity className="w-4 h-4 text-primary" />
              <span>{currentPet.weight}</span>
            </div>
            {currentPet.color && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span>{currentPet.color}</span>
              </div>
            )}
            {currentPet.height && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-4 h-4 flex items-center justify-center">
                  <div className="w-1 h-4 bg-primary rounded-full"></div>
                </div>
                <span>{currentPet.height}</span>
              </div>
            )}
          </div>

          {/* Дополнительная информация */}
          {(currentPet.chip || currentPet.notes) && (
            <div className="space-y-2 text-sm">
              {currentPet.chip && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-4 h-4 bg-primary/20 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-sm"></div>
                  </div>
                  <span className="text-xs">Чип: {currentPet.chip}</span>
                </div>
              )}
              {currentPet.notes && (
                <div className="bg-muted/30 rounded-lg p-3 mt-3">
                  <p className="text-xs text-muted-foreground">{currentPet.notes}</p>
                </div>
              )}
            </div>
          )}
          </div>

          {/* Visit Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 rounded-xl text-center">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">Последний визит</div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">10.02.2024</div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-4 rounded-xl text-center">
              <Calendar className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <div className="text-sm font-semibold text-green-700 dark:text-green-300">Следующий визит</div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">{currentPet.nextVisit}</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="h-12 col-span-2" onClick={handleEditPet}>
              <Edit3 className="w-4 h-4 mr-2" />
              Редактировать
            </Button>
            <Button 
              variant="outline" 
              className="h-12 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20" 
              onClick={handleDeletePet}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </Button>
          </div>
        </Card>
      </section>

      {/* Main Actions */}
      <section className="px-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Vaccinations Card */}
          <Card className="p-4 text-center">
            <Syringe className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Прививки</h3>
            <p className="text-xs text-muted-foreground mb-3">Следующая: 15.01.25</p>
            <Button variant="outline" size="sm" className="w-full" onClick={handleShowVaccinations}>
              Подробнее
            </Button>
          </Card>

          {/* History Card */}
          <Card className="p-4 text-center">
            <Activity className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">История</h3>
            <p className="text-xs text-muted-foreground mb-3">Всего визитов: 12</p>
            <Button variant="outline" size="sm" className="w-full" onClick={handleShowHistory}>
              Посмотреть
            </Button>
          </Card>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="px-4 mt-6 mb-6">
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Последние события
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">Плановый осмотр</div>
                <div className="text-xs text-muted-foreground">10 февраля 2024 • Иванова А.С.</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">Вакцинация</div>
                <div className="text-xs text-muted-foreground">15 января 2024 • Петров В.И.</div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Notifications */}
      <section className="px-4 mt-6 mb-6">
        <Card className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <div>
              <div className="font-medium text-yellow-800 dark:text-yellow-200">Напоминание</div>
              <div className="text-sm text-yellow-700 dark:text-yellow-300">
                Барсику нужна вакцинация через 2 недели
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Photo Options Modal */}
      {showPhotoOptions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowPhotoOptions(false)}>
          <div className="bg-background rounded-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Выберите фото</h3>
            <div className="space-y-3">
              <Button 
                onClick={handleTakePhoto}
                className="w-full h-12 justify-start"
                variant="outline"
              >
                <Camera className="w-5 h-5 mr-3" />
                Сделать фото
              </Button>
              <Button 
                onClick={handleChoosePhoto}
                className="w-full h-12 justify-start"
                variant="outline"
              >
                <Image className="w-5 h-5 mr-3" />
                Выбрать из галереи
              </Button>
              <Button 
                onClick={() => setShowPhotoOptions(false)}
                className="w-full h-12"
                variant="secondary"
              >
                Отмена
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Pet Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowEditForm(false)}>
          <div className="bg-background rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Edit3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Редактирование профиля</h3>
                <p className="text-sm text-muted-foreground">{currentPet.name} • {currentPet.type}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="petName">Имя питомца</Label>
                <Input 
                  id="petName" 
                  value={editFormData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1"
                  placeholder="Например: Барсик"
                />
              </div>
              <div>
                <Label htmlFor="petBreed">Порода</Label>
                <Input 
                  id="petBreed" 
                  value={editFormData.breed}
                  onChange={(e) => handleInputChange('breed', e.target.value)}
                  className="mt-1"
                  placeholder="Например: Мейн-кун"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="petAge">Возраст</Label>
                  <Input 
                    id="petAge" 
                    value={editFormData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="mt-1"
                    placeholder="Например: 3 года"
                  />
                </div>
                <div>
                  <Label htmlFor="petWeight">Вес</Label>
                  <Input 
                    id="petWeight" 
                    value={editFormData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="mt-1"
                    placeholder="Например: 7 кг"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="petColor">Окрас</Label>
                <Input 
                  id="petColor" 
                  value={editFormData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  placeholder="Например: рыжий, черный, пятнистый"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="petHeight">Рост</Label>
                <Input 
                  id="petHeight" 
                  value={editFormData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  placeholder="Например: 35 см"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="petChip">Номер чипа</Label>
                <Input 
                  id="petChip" 
                  value={editFormData.chip}
                  onChange={(e) => handleInputChange('chip', e.target.value)}
                  placeholder="Например: 123456789012345"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="petNotes">Особенности и заметки</Label>
                <Input 
                  id="petNotes" 
                  value={editFormData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Аллергии, особенности характера..."
                  className="mt-1"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowEditForm(false)}>
                  Отмена
                </Button>
                <Button className="flex-1" onClick={handleSaveEdit}>
                  Сохранить
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vaccinations Modal */}
      {showVaccinations && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowVaccinations(false)}>
          <div className="bg-background rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold text-foreground mb-4">Прививки {currentPet.name}</h3>
            <div className="space-y-4">
              {/* Completed Vaccinations */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Выполненные прививки</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">Комплексная вакцина</div>
                      <div className="text-sm text-muted-foreground">15.01.2024</div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">Бешенство</div>
                      <div className="text-sm text-muted-foreground">15.01.2024</div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Upcoming Vaccinations */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Предстоящие прививки</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">Комплексная вакцина</div>
                      <div className="text-sm text-muted-foreground">15.01.2025</div>
                    </div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-4" onClick={() => setShowVaccinations(false)}>
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowHistory(false)}>
          <div className="bg-background rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold text-foreground mb-4">История визитов {currentPet.name}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">Плановый осмотр</div>
                  <div className="text-sm text-muted-foreground">10.02.2024 • Иванова А.С.</div>
                  <div className="text-sm text-muted-foreground mt-1">Общий осмотр, вакцинация</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">Вакцинация</div>
                  <div className="text-sm text-muted-foreground">15.01.2024 • Петров В.И.</div>
                  <div className="text-sm text-muted-foreground mt-1">Комплексная вакцина + бешенство</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">Лечение</div>
                  <div className="text-sm text-muted-foreground">20.12.2023 • Сидорова М.П.</div>
                  <div className="text-sm text-muted-foreground mt-1">Лечение отита, назначены капли</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-card rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">Первичный осмотр</div>
                  <div className="text-sm text-muted-foreground">15.11.2023 • Иванова А.С.</div>
                  <div className="text-sm text-muted-foreground mt-1">Знакомство, общий осмотр</div>
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-4" onClick={() => setShowHistory(false)}>
              Закрыть
            </Button>
          </div>
        </div>
      )}

      {/* Add Pet Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddForm(false)}>
          <div className="bg-background rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-950/20 rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Добавить питомца</h3>
                <p className="text-sm text-muted-foreground">Заполните информацию о новом питомце</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="newPetName">Имя питомца *</Label>
                <Input 
                  id="newPetName" 
                  value={editFormData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1"
                  placeholder="Например: Мурзик"
                />
              </div>
              <div>
                <Label htmlFor="newPetBreed">Порода</Label>
                <Input 
                  id="newPetBreed" 
                  value={editFormData.breed}
                  onChange={(e) => handleInputChange('breed', e.target.value)}
                  className="mt-1"
                  placeholder="Например: Британская короткошёрстная"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="newPetAge">Возраст</Label>
                  <Input 
                    id="newPetAge" 
                    value={editFormData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="mt-1"
                    placeholder="Например: 2 года"
                  />
                </div>
                <div>
                  <Label htmlFor="newPetWeight">Вес</Label>
                  <Input 
                    id="newPetWeight" 
                    value={editFormData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="mt-1"
                    placeholder="Например: 4 кг"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="newPetColor">Окрас</Label>
                <Input 
                  id="newPetColor" 
                  value={editFormData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  placeholder="Например: серый, рыжий"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="newPetNotes">Особенности</Label>
                <Input 
                  id="newPetNotes" 
                  value={editFormData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Характер, аллергии, особенности..."
                  className="mt-1"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowAddForm(false)}>
                  Отмена
                </Button>
                <Button className="flex-1" onClick={handleSaveNewPet}>
                  Добавить питомца
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-background rounded-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-950/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Удалить питомца?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Вы уверены, что хотите удалить <strong>{currentPet.name}</strong>? 
                Это действие нельзя отменить.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowDeleteConfirm(false)}>
                  Отмена
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1" 
                  onClick={confirmDeletePet}
                >
                  Удалить
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
