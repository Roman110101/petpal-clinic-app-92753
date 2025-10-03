import { supabase } from '@/lib/supabaseClient';

export interface Pet {
  id: number;
  userId: number;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'hamster' | 'other';
  breed?: string;
  age?: number;
  color?: string;
  weight?: number;
  height?: number;
  chip?: string;
  notes?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePetData {
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'hamster' | 'other';
  breed?: string;
  age?: number;
  color?: string;
  weight?: number;
  height?: number;
  chip?: string;
  notes?: string;
}

class SupabasePetsService {
  async getPets(userId: number): Promise<{ success: boolean; data?: Pet[]; message?: string }> {
    try {
      const { data: pets, error } = await supabase
        .from('pets')
        .select('*')
        .eq('userId', userId)
        .order('createdAt', { ascending: false });

      if (error) {
        console.error('Error fetching pets:', error);
        return {
          success: false,
          message: 'Ошибка при получении питомцев'
        };
      }

      return {
        success: true,
        data: pets || []
      };
    } catch (error: any) {
      console.error('Error fetching pets:', error);
      return {
        success: false,
        message: 'Ошибка при получении питомцев'
      };
    }
  }

  async createPet(petData: CreatePetData): Promise<{ success: boolean; data?: Pet; message?: string }> {
    try {
      // Получаем текущего пользователя
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return {
          success: false,
          message: 'Пользователь не авторизован'
        };
      }

      const { data: pet, error } = await supabase
        .from('pets')
        .insert([{
          ...petData,
          userId: parseInt(user.id)
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating pet:', error);
        return {
          success: false,
          message: 'Ошибка при добавлении питомца'
        };
      }

      return {
        success: true,
        data: pet,
        message: 'Питомец успешно добавлен'
      };
    } catch (error: any) {
      console.error('Error creating pet:', error);
      return {
        success: false,
        message: 'Ошибка при добавлении питомца'
      };
    }
  }

  async updatePet(petId: number, petData: Partial<CreatePetData>): Promise<{ success: boolean; data?: Pet; message?: string }> {
    try {
      const { data: pet, error } = await supabase
        .from('pets')
        .update({
          ...petData,
          updatedAt: new Date().toISOString()
        })
        .eq('id', petId)
        .select()
        .single();

      if (error) {
        console.error('Error updating pet:', error);
        return {
          success: false,
          message: 'Ошибка при обновлении питомца'
        };
      }

      return {
        success: true,
        data: pet,
        message: 'Данные питомца обновлены'
      };
    } catch (error: any) {
      console.error('Error updating pet:', error);
      return {
        success: false,
        message: 'Ошибка при обновлении питомца'
      };
    }
  }

  async deletePet(petId: number): Promise<{ success: boolean; message?: string }> {
    try {
      const { error } = await supabase
        .from('pets')
        .delete()
        .eq('id', petId);

      if (error) {
        console.error('Error deleting pet:', error);
        return {
          success: false,
          message: 'Ошибка при удалении питомца'
        };
      }

      return {
        success: true,
        message: 'Питомец удален'
      };
    } catch (error: any) {
      console.error('Error deleting pet:', error);
      return {
        success: false,
        message: 'Ошибка при удалении питомца'
      };
    }
  }

  async uploadPetPhoto(petId: number, file: File): Promise<{ success: boolean; url?: string; message?: string }> {
    try {
      // Создаем уникальное имя файла
      const fileName = `pet-${petId}-${Date.now()}-${file.name}`;
      
      // Загружаем файл в Supabase Storage
      const { data, error } = await supabase.storage
        .from('pet-photos')
        .upload(fileName, file);

      if (error) {
        console.error('Error uploading photo:', error);
        return {
          success: false,
          message: 'Ошибка при загрузке фото'
        };
      }

      // Получаем публичный URL
      const { data: urlData } = supabase.storage
        .from('pet-photos')
        .getPublicUrl(fileName);

      // Обновляем информацию о питомце
      await this.updatePet(petId, { avatar: urlData.publicUrl });

      return {
        success: true,
        url: urlData.publicUrl,
        message: 'Фото успешно загружено'
      };
    } catch (error: any) {
      console.error('Error uploading photo:', error);
      return {
        success: false,
        message: 'Ошибка при загрузке фото'
      };
    }
  }
}

// Создаем единственный экземпляр сервиса
export const supabasePetsService = new SupabasePetsService();

// Экспортируем типы
export type { CreatePetData };
