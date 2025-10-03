import { supabasePetsService, Pet, CreatePetData } from './supabasePetsService';

// Проверяем доступность Supabase
const useSupabase = !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🐕 Pets Service:', useSupabase ? 'Supabase' : 'Local Server');

// Экспортируем нужный сервис питомцев
export const petsService = useSupabase ? supabasePetsService : {
  // Демо-режим для локального сервера (не используется)
  async getPets(userId: number) { return { success: false, message: 'Демо режим отключен' }; },
  async createPet(petData: CreatePetData) { return { success: false, message: 'Демо режим отключен' }; },
  async updatePet(petId: number, petData: Partial<CreatePetData>) { return { success: false, message: 'Демо режим отключен' }; },
  async deletePet(petId: number) { return { success: false, message: 'Демо режим отключен' }; },
  async uploadPetPhoto(petId: number, file: File) { return { success: false, message: 'Демо режим отключен' }; }
};

// Экспортируем типы
export type { Pet, CreatePetData };
