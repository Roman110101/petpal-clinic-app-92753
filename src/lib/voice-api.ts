/**
 * Voice API Client for Google Cloud integration
 */

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-domain.com/api' 
  : 'http://localhost:3001/api';

interface VoiceResponse {
  success: boolean;
  response: {
    text: string;
    audio?: string;
    intent: string;
    confidence: number;
  };
}

interface TextResponse {
  success: boolean;
  response: {
    text: string;
    intent: string;
    confidence: number;
  };
}

interface AudioResponse {
  success: boolean;
  audio: string;
}

export class VoiceAPIClient {
  private sessionId: string;

  constructor(sessionId?: string) {
    this.sessionId = sessionId || this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Process voice message with full pipeline (text → Dialogflow → audio)
   */
  async processVoiceMessage(text: string): Promise<VoiceResponse> {
    try {
      console.log('🎤 Отправляем голосовое сообщение в API:', text.substring(0, 50) + '...');
      
      const response = await fetch(`${API_BASE_URL}/voice/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          sessionId: this.sessionId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Получен ответ от API:', data.response?.intent);
      
      return data;
    } catch (error) {
      console.error('❌ Ошибка API голосового сообщения:', error);
      throw error;
    }
  }

  /**
   * Process text message (Dialogflow only, no audio)
   */
  async processTextMessage(text: string): Promise<TextResponse> {
    try {
      console.log('💬 Отправляем текстовое сообщение в API:', text.substring(0, 50) + '...');
      
      const response = await fetch(`${API_BASE_URL}/voice/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          sessionId: this.sessionId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Получен текстовый ответ от API:', data.response?.intent);
      
      return data;
    } catch (error) {
      console.error('❌ Ошибка API текстового сообщения:', error);
      throw error;
    }
  }

  /**
   * Generate audio from text (Text-to-Speech only)
   */
  async synthesizeSpeech(text: string): Promise<AudioResponse> {
    try {
      console.log('🎵 Синтезируем речь через API:', text.substring(0, 50) + '...');
      
      const response = await fetch(`${API_BASE_URL}/voice/synthesize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Получено аудио от API');
      
      return data;
    } catch (error) {
      console.error('❌ Ошибка синтеза речи:', error);
      throw error;
    }
  }

  /**
   * Check API health
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      console.log('🏥 Статус API:', data.status);
      return data.status === 'ok';
    } catch (error) {
      console.error('❌ API недоступен:', error);
      return false;
    }
  }

  /**
   * Play audio from base64 string
   */
  static playAudio(audioBase64: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Convert base64 to blob
        const audioData = atob(audioBase64);
        const audioArray = new Uint8Array(audioData.length);
        for (let i = 0; i < audioData.length; i++) {
          audioArray[i] = audioData.charCodeAt(i);
        }
        
        const audioBlob = new Blob([audioArray], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Create and play audio
        const audio = new Audio(audioUrl);
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          resolve();
        };
        audio.onerror = (error) => {
          URL.revokeObjectURL(audioUrl);
          reject(error);
        };
        
        audio.play().catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get session ID
   */
  getSessionId(): string {
    return this.sessionId;
  }
}

// Create singleton instance
export const voiceAPI = new VoiceAPIClient();
