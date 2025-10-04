// API функция для синтеза речи через ElevenLabs
export default async function handler(req, res) {
  // Включаем CORS для всех доменов
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка preflight запроса
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // API ключ ElevenLabs (из переменных окружения)
    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
    
    if (!elevenLabsApiKey) {
      console.error('❌ ELEVENLABS_API_KEY не настроен');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // ID голоса (Bella - красивый женский голос)
    const voiceId = 'EXAVITQu4vr4xnSDxMaL'; // Bella voice

    console.log('🎤 Синтезируем речь через ElevenLabs:', text.substring(0, 50) + '...');
    console.log('🔑 API Key:', elevenLabsApiKey.substring(0, 10) + '...');
    console.log('🎤 Voice ID:', voiceId);

    // Запрос к ElevenLabs API
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
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.0,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Ошибка ElevenLabs API:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'ElevenLabs API error', 
        details: errorText 
      });
    }

    // Получаем аудио данные
    const audioBuffer = await response.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');

    console.log('✅ ElevenLabs аудио сгенерировано успешно');

    return res.status(200).json({
      success: true,
      audio: audioBase64,
      format: 'mp3'
    });

  } catch (error) {
    console.error('❌ Ошибка синтеза речи:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
