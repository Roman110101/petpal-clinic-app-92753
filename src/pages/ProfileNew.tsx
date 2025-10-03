import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";
import { petsService, Pet, CreatePetData } from "@/services/unifiedPetsService";
import { supabaseAuthService } from "@/services/unifiedAuthService";
import { supabasePetsService } from "@/services/supabasePetsService";
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
  Upload,
  LogOut,
  Save,
  X,
  Trash2
} from "lucide-react";

const ProfileNew = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [showVaccinations, setShowVaccinations] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Состояние формы для добавления/редактирования питомца
  const [petForm, setPetForm] = useState<CreatePetData>({
    name: '',
    species: 'cat',
    breed: '',
    age: undefined,
    color: '',
    weight: undefined,
    height: undefined,
    chip: '',
    notes: ''
  });

  // Загружаем данные пользователя и его питомцев
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      
      // Получаем текущего пользователя
      const { data: { user } } = await supabaseAuthService.getSession();
      if (user) {
        setCurrentUser(user);
        
        // Получаем питомцев пользователя
        const petsResult = await petsService.getPets(parseInt(user.id));
        if (petsResult.success && petsResult.data) {
          setPets(petsResult.data);
          setSelectedPet(petsResult.data[0]?.id || null);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить данные пользователя',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPet = async () => {
    if (!petForm.name.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Имя питомца обязательно',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsSaving(true);
      const result = await petsService.createPet(petForm);
      
      if (result.success && result.data) {
        setPets(prev => [...prev, result.data!]);
        setPetForm({
          name: '',
          species: 'cat',
          breed: '',
          age: undefined,
          color: '',
          weight: undefined,
          height: undefined,
          chip: '',
          notes: ''
        });
        setShowAddForm(false);
        toast({
          title: 'Успешно',
          description: 'Питомец добавлен',
          variant: 'default'
        });
      } else {
        toast({
          title: 'Ошибка',
          description: result.message || 'Не удалось добавить питомца',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error adding pet:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось добавить питомца',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePet = async () => {
    if (!selectedPet || !petForm.name.trim()) return;

    try {
      setIsSaving(true);
      const result = await petsService.updatePet(selectedPet, petForm);
      
      if (result.success && result.data) {
        setPets(prev => prev.map(p => p.id === selectedPet ? result.data! : p));
        setShowEditForm(false);
        setPetForm({
          name: '',
          species: 'cat',
          breed: '',
          age: undefined,
          color: '',
          weight: undefined,
          height: undefined,
          chip: '',
          notes: ''
        });
        toast({
          title: 'Успешно',
          description: 'Данные питомца обновлены',
          variant: 'default'
        });
      } else {
        toast({
          title: 'Ошибка',
          description: result.message || 'Не удалось обновить питомца',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error updating pet:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить питомца',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePet = async () => {
    if (!selectedPet) return;

    try {
      setIsSaving(true);
      const result = await petsService.deletePet(selectedPet);
      
      if (result.success) {
        setPets(prev => prev.filter(p => p.id !== selectedPet));
        setSelectedPet(pets.filter(p => p.id !== selectedPet)[0]?.id || null);
        setShowDeleteConfirm(false);
        toast({
          title: 'Успешно',
          description: 'Питомец удален',
          variant: 'default'
        });
      } else {
        toast({
          title: 'Ошибка',
          description: result.message || 'Не удалось удалить питомца',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error deleting pet:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить питомца',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoUpload = async (file: File) => {
    if (!selectedPet || !file) return;

    try {
      const result = await petsService.uploadPetPhoto(selectedPet, file);
      
      if (result.success && result.url) {
        setPets(prev => prev.map(p => 
          p.id === selectedPet ? { ...p, avatar: result.url! } : p
        ));
        toast({
          title: 'Успешно',
          description: 'Фото загружено',
          variant: 'default'
        });
      } else {
        toast({
          title: 'Ошибка',
          description: result.message || 'Не удалось загрузить фото',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить фото',
        variant: 'destructive'
      });
    }
  };

  const handleLogout = async () => {
    try {
      await supabaseAuthService.logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const startEditPet = (pet: Pet) => {
    setSelectedPet(pet.id);
    setPetForm({
      name: pet.name,
      species: pet.species,
      breed: pet.breed || '',
      age: pet.age,
      color: pet.color || '',
      weight: pet.weight,
      height: pet.height,
      chip: pet.chip || '',
      notes: pet.notes || ''
    });
    setShowEditForm(true);
  };

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen pt-16">
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загружаем данные...</p>
        </div>
      </div>
    );
  }

  const currentPet = pets.find(p => p.id === selectedPet);

  return (
    <div className="bg-background min-h-screen pt-16 ios-scroll-fix">
      {/* Header */}
      <PageHeader 
        title="Личный кабинет"
        subtitle="Управление питомцами и записями"
      >
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Выйти
        </Button>
      </PageHeader>

      {/* User Info */}
      <section className="px-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">
                {currentUser?.email || 'Пользователь'}
              </h3>
              <p className="text-sm text-muted-foreground">
                Зарегистрирован {new Date(currentUser?.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Pets Section */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Мои питомцы</h2>
          <Button size="sm" onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Добавить питомца
          </Button>
        </div>

        {pets.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
              <PawPrint className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Питомцев пока нет</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Добавьте информацию о вашем любимом питомце
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить первого питомца
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Pet Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {pets.map((pet) => (
                <button
                  key={pet.id}
                  onClick={() => setSelectedPet(pet.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPet === pet.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {pet.name}
                </button>
              ))}
            </div>

            {/* Current Pet Info */}
            {currentPet && (
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                      {currentPet.avatar ? (
                        <img 
                          src={currentPet.avatar} 
                          alt={currentPet.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <PawPrint className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{currentPet.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {currentPet.species} • {currentPet.breed}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => startEditPet(currentPet)}>
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
                      <Camera className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Возраст:</span>
                    <span className="ml-2 font-medium">{currentPet.age || '—'} лет</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Вес:</span>
                    <span className="ml-2 font-medium">{currentPet.weight || '—'} кг</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Цвет:</span>
                    <span className="ml-2 font-medium">{currentPet.color || '—'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Чип:</span>
                    <span className="ml-2 font-medium">{currentPet.chip || '—'}</span>
                  </div>
                </div>

                {currentPet.notes && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm">{currentPet.notes}</p>
                  </div>
                )}
              </Card>
            )}
          </div>
        )}
      </section>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handlePhotoUpload(file);
        }}
      />

      {/* Add Pet Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Добавить питомца</h3>
                <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя питомца *</Label>
                  <Input
                    id="name"
                    value={petForm.name}
                    onChange={(e) => setPetForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Введите имя"
                  />
                </div>

                <div>
                  <Label htmlFor="species">Вид животного</Label>
                  <select
                    id="species"
                    value={petForm.species}
                    onChange={(e) => setPetForm(prev => ({ ...prev, species: e.target.value as any }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="cat">Кот</option>
                    <option value="dog">Собака</option>
                    <option value="bird">Птица</option>
                    <option value="hamster">Хомяк</option>
                    <option value="other">Другое</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="breed">Порода</Label>
                  <Input
                    id="breed"
                    value={petForm.breed}
                    onChange={(e) => setPetForm(prev => ({ ...prev, breed: e.target.value }))}
                    placeholder="Введите породу"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Возраст (лет)</Label>
                    <Input
                      id="age"
                      type="number"
                      value={petForm.age || ''}
                      onChange={(e) => setPetForm(prev => ({ ...prev, age: parseInt(e.target.value) || undefined }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Вес (кг)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={petForm.weight || ''}
                      onChange={(e) => setPetForm(prev => ({ ...prev, weight: parseFloat(e.target.value) || undefined }))}
                      placeholder="0.0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="color">Цвет</Label>
                  <Input
                    id="color"
                    value={petForm.color}
                    onChange={(e) => setPetForm(prev => ({ ...prev, color: e.target.value }))}
                    placeholder="Введите цвет шерсти"
                  />
                </div>

                <div>
                  <Label htmlFor="chip">Номер чипа</Label>
                  <Input
                    id="chip"
                    value={petForm.chip}
                    onChange={(e) => setPetForm(prev => ({ ...prev, chip: e.target.value }))}
                    placeholder="Введите номер чипа"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Примечания</Label>
                  <textarea
                    id="notes"
                    value={petForm.notes}
                    onChange={(e) => setPetForm(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Дополнительная информация о питомце"
                    className="w-full p-2 border rounded-md min-h-[80px] resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleAddPet} 
                    disabled={isSaving}
                    className="flex-1"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Сохранение...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Сохранить
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Отмена
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Pet Modal */}
      {showEditForm && currentPet && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Редактировать {currentPet.name}</h3>
                <Button size="sm" variant="outline" onClick={() => setShowEditForm(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-name">Имя питомца *</Label>
                  <Input
                    id="edit-name"
                    value={petForm.name}
                    onChange={(e) => setPetForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Введите имя"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-species">Вид животного</Label>
                  <select
                    id="edit-species"
                    value={petForm.species}
                    onChange={(e) => setPetForm(prev => ({ ...prev, species: e.target.value as any }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="cat">Кот</option>
                    <option value="dog">Собака</option>
                    <option value="bird">Птица</option>
                    <option value="hamster">Хомяк</option>
                    <option value="other">Другое</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="edit-breed">Порода</Label>
                  <Input
                    id="edit-breed"
                    value={petForm.breed}
                    onChange={(e) => setPetForm(prev => ({ ...prev, breed: e.target.value }))}
                    placeholder="Введите породу"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-age">Возраст (лет)</Label>
                    <Input
                      id="edit-age"
                      type="number"
                      value={petForm.age || ''}
                      onChange={(e) => setPetForm(prev => ({ ...prev, age: parseInt(e.target.value) || undefined }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-weight">Вес (кг)</Label>
                    <Input
                      id="edit-weight"
                      type="number"
                      step="0.1"
                      value={petForm.weight || ''}
                      onChange={(e) => setPetForm(prev => ({ ...prev, weight: parseFloat(e.target.value) || undefined }))}
                      placeholder="0.0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit-color">Цвет</Label>
                  <Input
                    id="edit-color"
                    value={petForm.color}
                    onChange={(e) => setPetForm(prev => ({ ...prev, color: e.target.value }))}
                    placeholder="Введите цвет шерсти"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-chip">Номер чипа</Label>
                  <Input
                    id="edit-chip"
                    value={petForm.chip}
                    onChange={(e) => setPetForm(prev => ({ ...prev, chip: e.target.value }))}
                    placeholder="Введите номер чипа"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-notes">Примечания</Label>
                  <textarea
                    id="edit-notes"
                    value={petForm.notes}
                    onChange={(e) => setPetForm(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Дополнительная информация о питомце"
                    className="w-full p-2 border rounded-md min-h-[80px] resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleUpdatePet} 
                    disabled={isSaving}
                    className="flex-1"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Сохранение...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Сохранить
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setShowEditForm(false)}>
                    Отмена
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && currentPet && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Удалить питомца</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Вы уверены, что хотите удалить питомца "{currentPet.name}"? 
                Это действие нельзя отменить.
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="destructive" 
                  onClick={handleDeletePet}
                  disabled={isSaving}
                  className="flex-1"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Удаление...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Удалить
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                  Отмена
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProfileNew;
