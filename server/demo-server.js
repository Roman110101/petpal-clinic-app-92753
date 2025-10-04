import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

// Store for session data
const sessions = new Map();

/**
 * Demo response generator (simulating Dialogflow)
 */
function getDemoResponse(text) {
  const lowerText = text.toLowerCase();
  
  // Простые правила для демонстрации
  if (lowerText.includes('привет') || lowerText.includes('здравствуй') || lowerText.includes('добрый')) {
    return {
      text: 'Привет! 😊 Я Дарья, помощница клиники "Море". Чем могу помочь?',
      intent: 'Приветствие',
      confidence: 0.9
    };
  }
  
  if (lowerText.includes('симптом') || lowerText.includes('болеет') || lowerText.includes('не ест') || lowerText.includes('вял')) {
    return {
      text: 'Понимаю ваше беспокойство! 😊 Расскажите подробнее о симптомах. Когда это началось?',
      intent: 'Симптомы',
      confidence: 0.8
    };
  }
  
  if (lowerText.includes('контакт') || lowerText.includes('телефон') || lowerText.includes('адрес') || lowerText.includes('связать')) {
    return {
      text: 'Наши контакты: Москва +7 (495) 234-56-78, Сочи +7 (862) 345-67-89. Работаем 24/7! 😊',
      intent: 'Контакты',
      confidence: 0.9
    };
  }
  
  if (lowerText.includes('время') || lowerText.includes('работаете') || lowerText.includes('график') || lowerText.includes('открыт')) {
    return {
      text: 'Мы работаем круглосуточно, 7 дней в неделю! 😊 Всегда готовы помочь вашему питомцу.',
      intent: 'Время работы',
      confidence: 0.8
    };
  }
  
  if (lowerText.includes('запис') || lowerText.includes('прием') || lowerText.includes('врач')) {
    return {
      text: 'Конечно помогу записаться! 😊 Вы можете записаться через приложение или позвонить +7 (495) 234-56-78.',
      intent: 'Запись на прием',
      confidence: 0.9
    };
  }
  
  // Общий ответ
  return {
    text: 'Интересно! Расскажите подробнее, чем могу помочь? 😊',
    intent: 'Общий вопрос',
    confidence: 0.6
  };
}

/**
 * API endpoint for text-only processing (demo version)
 */
app.post('/api/voice/text', async (req, res) => {
  try {
    const { text, sessionId = 'default' } = req.body;
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ 
        error: 'Текст сообщения обязателен' 
      });
    }

    console.log('💬 Обрабатываем текстовое сообщение (DEMO):', {
      sessionId,
      text: text.substring(0, 50) + '...'
    });

    // Get demo response
    const demoResponse = getDemoResponse(text);
    
    // Store session data
    sessions.set(sessionId, {
      lastMessage: text,
      lastResponse: demoResponse.text,
      timestamp: Date.now()
    });

    res.json({
      success: true,
      response: {
        text: demoResponse.text,
        intent: demoResponse.intent,
        confidence: demoResponse.confidence
      }
    });

  } catch (error) {
    console.error('❌ Ошибка обработки текстового сообщения:', error);
    res.status(500).json({ 
      error: 'Ошибка обработки текстового сообщения',
      details: error.message 
    });
  }
});

/**
 * API endpoint for generating audio with ElevenLabs
 */
app.post('/api/voice/synthesize', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ 
        error: 'Текст для озвучивания обязателен' 
      });
    }

    console.log('🎵 Синтезируем речь (ElevenLabs):', text.substring(0, 50) + '...');

    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY || '49d3ea8b2ca28c6ae36b07d2fa2baebdd24c660e1a2eaa2d237dd830ad8a6ef5';
    const voiceId = 'EXAVITQu4vr4xnSDxMaL'; // Bella voice (female, beautiful, natural)
    
    console.log('🔑 API Key:', elevenLabsApiKey.substring(0, 10) + '...');
    console.log('🎤 Voice ID:', voiceId);
    
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': elevenLabsApiKey
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.8,
          style: 0.2,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status} - ${response.statusText}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString('base64');
    
    console.log('✅ ElevenLabs аудио сгенерировано успешно');
    
    res.json({
      success: true,
      audio: base64Audio,
      provider: 'elevenlabs'
    });

  } catch (error) {
    console.error('❌ Ошибка ElevenLabs синтеза речи:', error);
    
    // Fallback к локальному синтезу
    res.json({
      success: false,
      error: 'ElevenLabs недоступен, используем локальный синтез',
      audio: null,
      provider: 'fallback'
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mode: 'demo_with_elevenlabs',
    services: {
      dialogflow: 'demo',
      textToSpeech: 'elevenlabs'
    }
  });
});

/**
 * Serve React app for all other routes
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Демо сервер запущен на порту ${PORT}`);
  console.log(`🌐 API доступен по адресу: http://localhost:${PORT}/api`);
  console.log(`🎤 Голосовой ассистент: http://localhost:${PORT}`);
  console.log('📋 Режим: ДЕМО (без Google Cloud)');
  console.log('💡 Для полной функциональности настройте Google Cloud по инструкции');
});

export default app;
