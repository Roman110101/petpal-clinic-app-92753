// Сервис для работы с localStorage
export class LocalStorageService {
  // Питомцы
  static savePets(pets: any[]) {
    try {
      localStorage.setItem('vet_pets', JSON.stringify(pets));
    } catch (error) {
      console.error('Error saving pets to localStorage:', error);
    }
  }

  static getPets(): any[] {
    try {
      const pets = localStorage.getItem('vet_pets');
      return pets ? JSON.parse(pets) : [];
    } catch (error) {
      console.error('Error loading pets from localStorage:', error);
      return [];
    }
  }

  // Аватар пользователя
  static saveUserAvatar(avatarUrl: string) {
    try {
      localStorage.setItem('vet_user_avatar', avatarUrl);
    } catch (error) {
      console.error('Error saving user avatar to localStorage:', error);
    }
  }

  static getUserAvatar(): string | null {
    try {
      return localStorage.getItem('vet_user_avatar');
    } catch (error) {
      console.error('Error loading user avatar from localStorage:', error);
      return null;
    }
  }

  // Настройки пользователя
  static saveUserSettings(settings: any) {
    try {
      localStorage.setItem('vet_user_settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving user settings to localStorage:', error);
    }
  }

  static getUserSettings(): any {
    try {
      const settings = localStorage.getItem('vet_user_settings');
      return settings ? JSON.parse(settings) : {};
    } catch (error) {
      console.error('Error loading user settings from localStorage:', error);
      return {};
    }
  }

  // Очистка данных
  static clearAll() {
    try {
      localStorage.removeItem('vet_pets');
      localStorage.removeItem('vet_user_avatar');
      localStorage.removeItem('vet_user_settings');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}
