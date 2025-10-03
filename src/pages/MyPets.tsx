import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/PageHeader";
import { AuthGuard } from "@/components/AuthGuard";
import { petsService } from "@/services/unifiedPetsService";
import { supabase } from "@/lib/supabaseClient";
import { 
  PawPrint, 
  Plus, 
  Edit3, 
  Trash2, 
  Camera,
  Save,
  X,
  Heart,
  Calendar,
  Weight,
  Ruler,
  Tag
} from "lucide-react";
import { toast } from "sonner";

const MyPets = () => {
  const [pets, setPets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPet, setEditingPet] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const [petForm, setPetForm] = useState({
    name: '',
    species: 'dog',
    breed: '',
    age: '',
    weight: '',
    height: '',
    color: '',
    chip: '',
    notes: ''
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      
      // Получаем текущего пользователя
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user);
        
        // Получаем питомцев
        const result = await petsService.getPets(parseInt(user.id));
        if (result.success && result.data) {
          setPets(result.data);
        } else {
          // Если нет питомцев в базе, покажем демо карточки
          setPets([
            {
              id: 1,
              name: "Барсик",
              species: "cat",
              breed: "Мейн-кун",
              age: 3,
              color: "Рыжий",
              weight: 5.2,
              height: 25,
              chip: "250268007612345",
              notes: "Любит играть с мячиками",
              avatar: null
            },
            {
              id: 2,
              name: "Рекс",
              species: "dog",
              breed: "Немецкая овчарка",
              age: 2,
              color: "Черно-подпалый",
              weight: 28.5,
              height: 45,
              chip: "250268007612346",
              notes: "Очень активный, нуждается в длительных прогулках",
              avatar: null
            }
          ]);
        }
      }
    } catch (error) {
      console.error('Error loading pets:', error);
      // При ошибке показываем демо данные
      setPets([
        {
          id: 1,
          name: "Барсик",
          species: "cat",
          breed: "Мейн-кун",
          age: 3,
          color: "Рыжий",
          weight: 5.2,
          height: 25,
          chip: "250268007612345",
          notes: "Любит играть с мячиками",
          avatar: null
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getSpeciesIcon = (species: string) => {
    switch(species) {
      case 'dog': return '🐕';
      case 'cat': return '🐱';
      case 'bird': return '🐦';
      case 'hamster': return '🐹';
      default: return '🐾';
    }
  };

  const getSpeciesName = (species: string) => {
    switch(species) {
      case 'dog': return 'Собака';
      case 'cat': return 'Кошка';
      case 'bird': return 'Птица';
      case 'hamster': return 'Хомяк';
      default: return 'Другое';
    }
  };

  const startAddPet = () => {
    setPetForm({
      name: '',
      species: 'dog',
      breed: '',
      age: '',
      weight: '',
      height: '',
      color: '',
      chip: '',
      notes: ''
    });
    setShowAddForm(true);
    setEditingPet(null);
  };

  const startEditPet = (pet: any) => {
    setPetForm({
      name: pet.name,
      species: pet.species,
      breed: pet.breed || '',
      age: pet.age?.toString() || '',
      weight: pet.weight?.toString() || '',
      height: pet.height?.toString() || '',
      color: pet.color || '',
      chip: pet.chip || '',
      notes: pet.notes || ''
    });
    setEditingPet(pet);
    setShowAddForm(true);
  };

  const handleSavePet = async () => {
    if (!petForm.name.trim()) {
      toast.error('Введите имя питомца');
      return;
    }

    try {
      const petData = {
        name: petForm.name,
        species: petForm.species as any,
        breed: petForm.breed || undefined,
        age: petForm.age ? parseInt(petForm.age) : undefined,
        weight: petForm.weight ? parseFloat(petForm.weight) : undefined,
        height: petForm.height ? parseFloat(petForm.height) : undefined,
        color: petForm.color || undefined,
        chip: petForm.chip || undefined,
        notes: petForm.notes || undefined
      };

      if (editingPet) {
        // Редактирование существующего питомца
        const result = await petsService.updatePet(editingPet.id, petData);
        if (result.success) {
          setPets(prev => prev.map(p => p.id === editingPet.id ? { ...p, ...petData } : p));
          toast.success('Питомец обновлён!');
        } else {
          toast.error('Ошибка при обновлении');
        }
      } else {
        // Добавление нового питомца
        const result = await petsService.createPet(petData);
        if (result.success) {
          setPets(prev => [...prev, { id: Date.now(), ...petData }]);
          toast.success('Питомец добавлен!');
        } else {
          toast.error('Ошибка при добавлении');
        }
      }

      setShowAddForm(false);
    } catch (error) {
      console.error('Error saving pet:', error);
      toast.error('Произошла ошибка');
    }
  };

  const handleDeletePet = async (pet: any) => {
    if (!confirm(`Удалить питомца "${pet.name}"?`)) return;

    try {
      const result = await petsService.deletePet(pet.id);
      if (result.success) {
        setPets(prev => prev.filter(p => p.id !== pet.id));
        toast.success('Питомец удалён');
      } else {
        toast.error('Ошибка при удалении');
      }
    } catch (error) {
      console.error('Error deleting pet:', error);
      toast.error('Произошла ошибка');
    }
  };

  return (
    <AuthGuard>
      <div className="bg-background min-h-screen pt-16">
        {/* Header */}
        <PageHeader 
          title="Мои питомцы"
          subtitle={`Здесь хранится информация о любимцах ${currentUser?.user_metadata?.firstName || ''}`}
        >
          <Button onClick={startAddPet} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Добавить питомца
          </Button>
        </PageHeader>

        {/* Content */}
        <div className="px-4 mt-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Загружаем информацию о питомцах...</p>
            </div>
          ) : pets.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <PawPrint className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Питомцев пока нет</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Добавьте информацию о ваших любимцах для удобного слежения за их здоровьем
              </p>
              <Button onClick={startAddPet}>
                <Plus className="w-4 h-4 mr-2" />
                Добавить первого питомца
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4">
              {pets.map((pet) => (
                <Card key={pet.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                        {pet.avatar ? (
                          <img 
                            src={pet.avatar} 
                            alt={pet.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <span>{getSpeciesIcon(pet.species)}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          {pet.name}
                          <span className="text-lg">{getSpeciesIcon(pet.species)}</span>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {getSpeciesName(pet.species)} • {pet.breed}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEditPet(pet)}>
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeletePet(pet)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="text-muted-foreground">Возраст:</span>
                      <span className="font-medium">{pet.age || '—'} лет</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Weight className="w-4 h-4 text-green-500" />
                      <span className="text-muted-foreground">Вес:</span>
                      <span className="font-medium">{pet.weight || '—'} кг</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-purple-500" />
                      <span className="text-muted-foreground">Рост:</span>
                      <span className="font-medium">{pet.height || '—'} см</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PawPrint className="w-4 h-4 text-orange-500" />
                      <span className="text-muted-foreground">Цвет:</span>
                      <span className="font-medium">{pet.color || '—'}</span>
                    </div>
                  </div>

                  {pet.chip && (
                    <div className="flex items-center gap-2 mb-4">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-muted-foreground">Чип:</span>
                      <span className="font-medium text-sm">{pet.chip}</span>
                    </div>
                  )}

                  {pet.notes && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">{pet.notes}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Add/Edit Pet Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    {editingPet ? 'Редактировать питомца' : 'Добавить питомца'}
                  </h3>
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
                      onChange={(e) => setPetForm(prev => ({ ...prev, species: e.target.value }))}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="dog">🐕 Собака</option>
                      <option value="cat">🐱 Кошка</option>
                      <option value="bird">🐦 Птица</option>
                      <option value="hamster">🐹 Хомяк</option>
                      <option value="other">🐾 Другое</option>
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
                        value={petForm.age}
                        onChange={(e) => setPetForm(prev => ({ ...prev, age: e.target.value }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Вес (кг)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        value={petForm.weight}
                        onChange={(e) => setPetForm(prev => ({ ...prev, weight: e.target.value }))}
                        placeholder="0.0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="height">Рост (см)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={petForm.height}
                        onChange={(e) => setPetForm(prev => ({ ...prev, height: e.target.value }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="color">Цвет</Label>
                      <Input
                        id="color"
                        value={petForm.color}
                        onChange={(e) => setPetForm(prev => ({ ...prev, color: e.target.value }))}
                        placeholder="Цвет шерсти"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="chip">Номер чипа</Label>
                    <Input
                      id="chip"
                      value={petForm.chip}
                      onChange={(e) => setPetForm(prev => ({ ...prev, chip: e.target.value }))}
                      placeholder="Номер микрочипа"
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
                    <Button onClick={handleSavePet} className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      {editingPet ? 'Сохранить изменения' : 'Добавить питомца'}
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

        {/* Bottom spacing */}
        <div className="h-20"></div>
      </div>
    </AuthGuard>
  );
};

export default MyPets;
