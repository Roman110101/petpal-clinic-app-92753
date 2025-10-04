# 🔧 Исправление ElevenLabs API

## 🚨 **Проблема:**
API ключ не имеет разрешения `text_to_speech`:
```
"The API key you used is missing the permission text_to_speech to execute this operation."
```

## 🎯 **Решение:**

### **1. Войдите в ElevenLabs:**
```
https://elevenlabs.io/
```

### **2. Перейдите в настройки API:**
1. Нажмите на **профиль** (правый верхний угол)
2. Выберите **"Profile"** или **"Settings"**
3. Найдите раздел **"API Keys"**

### **3. Создайте новый API ключ:**
1. Нажмите **"Create New Key"** или **"Generate API Key"**
2. **ВАЖНО**: При создании выберите разрешения:
   - ✅ **Text to Speech** (обязательно!)
   - ✅ **Voices** (опционально)
3. Скопируйте новый ключ

### **4. Обновите ключ в проекте:**
Откройте файл `server/demo-server.js` и замените:
```javascript
const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY || 'c324424d1d325c412837232547b7c290d1bfa276264604d97a43a9ad51b9272d';
```

На:
```javascript
const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY || 'ваш_новый_api_ключ';
```

### **5. Перезапустите сервер:**
```bash
cd server
pkill -f "node demo-server.js"
node demo-server.js
```

## 🧪 **Тестирование:**

После обновления ключа выполните:
```bash
node test-elevenlabs.js
```

**Должно показать:**
```
✅ Success! Audio size: XXXXX bytes
```

## 🎯 **Альтернативное решение:**

Если не можете создать ключ с правильными разрешениями:

1. **Обновите план** на ElevenLabs (может потребоваться)
2. **Или используйте локальный голос** (уже работает)

## 🎉 **После исправления:**

У вас будет красивый женский голос от ElevenLabs!

**Пришлите новый API ключ, и я настрою его!** 🎤✨
