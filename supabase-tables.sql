-- ========================================
-- ВЕТЕРИНАРНАЯ КЛИНИКА "МОРЕ" - СУПАБАСЕ ТАБЛИЦЫ
-- ========================================

------------------------------------------------
-- 1. Создание таблицы питомцев
------------------------------------------------

CREATE TABLE IF NOT EXISTS pets (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  species TEXT NOT NULL CHECK (species IN ('dog', 'cat', 'bird', 'hamster', 'other')),
  breed TEXT,
  age INTEGER CHECK (age >= 0 AND age <= 30),
  color TEXT,
  weight DECIMAL(5,2),

  height DECIMAL(5,2),
  chip TEXT UNIQUE,
  notes TEXT,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

------------------------------------------------
-- 2. Создание таблицы записей на приём
------------------------------------------------

CREATE TABLE IF NOT EXISTS appointments (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  pet_id BIGINT REFERENCES pets(id) ON DELETE SET NULL,
  pet_name TEXT NOT NULL,
  service TEXT NOT NULL,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

------------------------------------------------
-- 3. Создание таблицы прививок
------------------------------------------------

CREATE TABLE IF NOT EXISTS vaccinations (
  id BIGSERIAL PRIMARY KEY,
  pet_id BIGINT REFERENCES pets(id) ON DELETE CASCADE,
  vaccination_name TEXT NOT NULL,
  vaccination_date DATE NOT NULL,
  next_due_date DATE,
  veterinarian TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

------------------------------------------------
-- 4. Создание таблицы истории посещений
------------------------------------------------

CREATE TABLE IF NOT EXISTS visit_history (
  id BIGSERIAL PRIMARY KEY,
  pet_id BIGINT REFERENCES pets(id) ON DELETE CASCADE,
  visit_date DATE NOT NULL,
  diagnosis TEXT,
  treatment TEXT,
  veterinarian TEXT,
  cost DECIMAL(8,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

------------------------------------------------
-- 5. Создание Storage bucket для фото питомцев
------------------------------------------------

INSERT INTO storage.buckets (id, name, public)
VALUES ('pet-photos', 'pet-photos', TRUE)
ON CONFLICT (id) DO NOTHING;

------------------------------------------------
-- 6. Включение Row Level Security (RLS)
------------------------------------------------

-- Включаем RLS для всех таблиц
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE vaccinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE visit_history ENABLE ROW LEVEL SECURITY;

------------------------------------------------
-- 7. Политики безопасности для таблицы pets
------------------------------------------------

-- Пользователи могут видеть только своих питомцев
CREATE POLICY "Users can view own pets" ON pets
  FOR SELECT USING (auth.uid() = user_id);

-- Пользователи могут создавать питомцев
CREATE POLICY "Users can insert own pets" ON pets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Пользователи могут обновлять своих питомцев
CREATE POLICY "Users can update own pets" ON pets
  FOR UPDATE USING (auth.uid() = user_id);

-- Пользователи могут удалять своих питомцев
CREATE POLICY "Users can delete own pets" ON pets
  FOR DELETE USING (auth.uid() = user_id);

------------------------------------------------
-- 8. Политики безопасности для таблицы appointments
------------------------------------------------

-- Пользователи могут видеть только свои записи
CREATE POLICY "Users can view own appointments" ON appointments
  FOR SELECT USING (auth.uid() = user_id);

-- Пользователи могут создавать записи
CREATE POLICY "Users can insert own appointments" ON appointments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Пользователи могут обновлять свои записи
CREATE POLICY "Users can update own appointments" ON appointments
  FOR UPDATE USING (auth.uid() = user_id);

------------------------------------------------
-- 9. Политики безопасности для таблицы vaccinations
------------------------------------------------

-- Пользователи могут видеть только прививки своих питомцев
CREATE POLICY "Users can view own vaccinations" ON vaccinations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM pets 
      WHERE pets.id = vaccinations.pet_id 
      AND pets.user_id = auth.uid()
    )
  );

-- Пользователи могут создавать прививки для своих питомцев
CREATE POLICY "Users can insert own vaccinations" ON vaccinations
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM pets 
      WHERE pets.id = vaccinations.pet_id 
      AND pets.user_id = auth.uid()
    )
  );

------------------------------------------------
-- 10. Политики безопасности для таблицы visit_history
------------------------------------------------

-- Пользователи могут видеть только историю своих питомцев
CREATE POLICY "Users can view own visit history" ON visit_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM pets 
      WHERE pets.id = visit_history.pet_id 
      AND pets.user_id = auth.uid()
    )
  );

-- Пользователи могут создавать записи в истории
CREATE POLICY "Users can insert own visit history" ON visit_history
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM pets 
      WHERE pets.id = visit_history.pet_id 
      AND pets.user_id = auth.uid()
    )
  );

------------------------------------------------
-- 11. Политики для Storage
------------------------------------------------

-- Разрешаем всем авторизованным пользователям загружать файлы
CREATE POLICY "Authenticated users can upload pet photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'pet-photos' 
    AND auth.role() = 'authenticated'
  );

-- Разрешаем всем видеть фото питомцев
CREATE POLICY "Anyone can view pet photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'pet-photos');

-- Пользователи могут удалять свои файлы
CREATE POLICY "Users can delete own pet photos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'pet-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

------------------------------------------------
-- 12. Функция для автоматического обновления updated_at
------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Применяем триггеры для автоматического обновления updated_at
CREATE TRIGGER update_pets_updated_at 
  BEFORE UPDATE ON pets 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at 
  BEFORE UPDATE ON appointments 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

------------------------------------------------
-- Готово! Все таблицы созданы с правильными политиками безопасности.
------------------------------------------------
