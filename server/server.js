import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Google Cloud imports
import textToSpeech from '@google-cloud/text-to-speech';
import dialogflow from '@google-cloud/dialogflow';

dotenv.config();

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

// Google Cloud configuration
const textToSpeechClient = new textToSpeech.TextToSpeechClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
});

const dialogflowClient = new dialogflow.SessionsClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
});

// Dialogflow configuration
const DIALOGFLOW_PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;
const DIALOGFLOW_LANGUAGE_CODE = 'ru';

// Store for session data
const sessions = new Map();

/**
 * Generate audio from text using Google Cloud Text-to-Speech
 */
async function generateAudio(text) {
  try {
    console.log('🎵 Генерируем аудио для текста:', text.substring(0, 50) + '...');
    
    const request = {
      input: { text: text },
      voice: {
        languageCode: 'ru-RU',
        name: 'ru-RU-Wavenet-C', // Женский голос WaveNet для русского
        ssmlGender: 'FEMALE'
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 0.9,
        pitch: 1.05,
        volumeGainDb: 2.0
      }
    };

    const [response] = await textToSpeechClient.synthesizeSpeech(request);
    
    return response.audioContent;
  } catch (error) {
    console.error('❌ Ошибка генерации аудио:', error);
    throw error;
  }
}

/**
 * Get response from Dialogflow
 */
async function getDialogflowResponse(sessionId, text) {
  try {
    console.log('🤖 Отправляем запрос в Dialogflow:', text.substring(0, 50) + '...');
    
    const sessionPath = dialogflowClient.projectAgentSessionPath(
      DIALOGFLOW_PROJECT_ID,
      sessionId
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: text,
          languageCode: DIALOGFLOW_LANGUAGE_CODE,
        },
      },
    };

    const [responses] = await dialogflowClient.detectIntent(request);
    const result = responses[0].queryResult;
    
    console.log('✅ Ответ от Dialogflow:', result.fulfillmentText);
    
    return {
      text: result.fulfillmentText,
      intent: result.intent.displayName,
      confidence: result.intentDetectionConfidence
    };
  } catch (error) {
    console.error('❌ Ошибка Dialogflow:', error);
    
    // Fallback response
    return {
      text: "Извините, я не поняла ваш вопрос. Можете переформулировать?",
      intent: "fallback",
      confidence: 0
    };
  }
}

/**
 * API endpoint for voice processing
 */
app.post('/api/voice/process', async (req, res) => {
  try {
    const { text, sessionId = 'default' } = req.body;
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ 
        error: 'Текст сообщения обязателен' 
      });
    }

    console.log('🎤 Обрабатываем голосовое сообщение:', {
      sessionId,
      text: text.substring(0, 50) + '...'
    });

    // Get response from Dialogflow
    const dialogflowResponse = await getDialogflowResponse(sessionId, text);
    
    // Generate audio from response text
    const audioBuffer = await generateAudio(dialogflowResponse.text);
    
    // Convert buffer to base64 for transmission
    const audioBase64 = audioBuffer.toString('base64');
    
    // Store session data
    sessions.set(sessionId, {
      lastMessage: text,
      lastResponse: dialogflowResponse.text,
      timestamp: Date.now()
    });

    res.json({
      success: true,
      response: {
        text: dialogflowResponse.text,
        audio: audioBase64,
        intent: dialogflowResponse.intent,
        confidence: dialogflowResponse.confidence
      }
    });

  } catch (error) {
    console.error('❌ Ошибка обработки голосового сообщения:', error);
    res.status(500).json({ 
      error: 'Ошибка обработки голосового сообщения',
      details: error.message 
    });
  }
});

/**
 * API endpoint for text-only processing (without audio)
 */
app.post('/api/voice/text', async (req, res) => {
  try {
    const { text, sessionId = 'default' } = req.body;
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ 
        error: 'Текст сообщения обязателен' 
      });
    }

    console.log('💬 Обрабатываем текстовое сообщение:', {
      sessionId,
      text: text.substring(0, 50) + '...'
    });

    // Get response from Dialogflow
    const dialogflowResponse = await getDialogflowResponse(sessionId, text);
    
    // Store session data
    sessions.set(sessionId, {
      lastMessage: text,
      lastResponse: dialogflowResponse.text,
      timestamp: Date.now()
    });

    res.json({
      success: true,
      response: {
        text: dialogflowResponse.text,
        intent: dialogflowResponse.intent,
        confidence: dialogflowResponse.confidence
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
 * API endpoint for generating audio from text
 */
app.post('/api/voice/synthesize', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ 
        error: 'Текст для озвучивания обязателен' 
      });
    }

    console.log('🎵 Синтезируем речь для текста:', text.substring(0, 50) + '...');

    // Generate audio from text
    const audioBuffer = await generateAudio(text);
    
    // Convert buffer to base64 for transmission
    const audioBase64 = audioBuffer.toString('base64');
    
    res.json({
      success: true,
      audio: audioBase64
    });

  } catch (error) {
    console.error('❌ Ошибка синтеза речи:', error);
    res.status(500).json({ 
      error: 'Ошибка синтеза речи',
      details: error.message 
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
    services: {
      dialogflow: 'connected',
      textToSpeech: 'connected'
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
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`🌐 API доступен по адресу: http://localhost:${PORT}/api`);
  console.log(`🎤 Голосовой ассистент: http://localhost:${PORT}`);
  console.log('📋 Не забудьте настроить переменные окружения!');
});

export default app;