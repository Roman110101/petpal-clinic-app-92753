// API функция для проверки здоровья
export default async function handler(req, res) {
  // Включаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
    
    return res.status(200).json({
      status: 'ok',
      message: 'Voice API работает',
      elevenlabs_configured: !!elevenLabsApiKey,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Ошибка health check:', error);
    return res.status(500).json({ 
      status: 'error',
      message: 'Health check failed',
      error: error.message 
    });
  }
}
