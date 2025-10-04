import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Bot,
  User,
  Send,
  MessageCircle,
  Loader2,
  X
} from 'lucide-react';
import { toast } from "sonner";
import { aiAssistant } from '@/lib/ai-assistant';
import { voiceAPI, VoiceAPIClient } from '@/lib/voice-api';

interface VoiceMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isAudio?: boolean;
}

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ isOpen, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<VoiceMessage[]>([
    {
      id: '1',
      text: 'Привет! 😊 Я Дарья, ваша помощница! Чем могу помочь?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiConnected, setApiConnected] = useState(false);
  const [useCloudAPI, setUseCloudAPI] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Инициализация распознавания речи
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'ru-RU';

      recognitionRef.current.onstart = () => {
        console.log('🎤 Распознавание речи началось');
        setIsListening(true);
      };

      recognitionRef.current.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('🎤 Распознан текст:', transcript);
        
        // Добавляем сообщение пользователя
        const userMessage: VoiceMessage = {
          id: Date.now().toString(),
          text: transcript,
          sender: 'user',
          timestamp: new Date(),
          isAudio: true
        };
        
        setMessages(prev => [...prev, userMessage]);
        setIsProcessing(true);
        
        try {
          // Используем новую логику обработки сообщений с ElevenLabs
          await sendTextMessage(transcript);
          
        } catch (error) {
          console.error('Ошибка AI:', error);
          toast.error('Ошибка обработки запроса');
        } finally {
          setIsProcessing(false);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Ошибка распознавания:', event.error);
        setIsListening(false);
        toast.error('Ошибка распознавания речи');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn('Распознавание речи не поддерживается');
    }
  }, []);

  // Функции для управления распознаванием речи
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      toast.success('🎤 Слушаю...', { duration: 1000 });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      toast.info('🛑 Остановлено', { duration: 1000 });
    }
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      toast.info('🔇 Голос остановлен', { duration: 1000 });
    }
  };

  // Прокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Проверка подключения к API при открытии
  useEffect(() => {
    if (isOpen) {
      // Проверяем подключение к ElevenLabs API
      checkAPIConnection();
    }
  }, [isOpen]);

  // Автоматическое озвучивание приветственного сообщения при открытии
  useEffect(() => {
    if (isOpen && messages.length === 1) {
      // Небольшая задержка для загрузки голосов
      setTimeout(() => {
        speakText(messages[0].text);
      }, 1000);
    }
  }, [isOpen]);

  // Проверка подключения к API
  const checkAPIConnection = async () => {
    try {
      const connected = await voiceAPI.checkHealth();
      setApiConnected(connected);
      setUseCloudAPI(connected);
      
      if (connected) {
        toast.success('🚀 Подключено к ElevenLabs API!', { duration: 2000 });
      } else {
        toast.warning('⚠️ Используется локальный режим', { duration: 2000 });
      }
    } catch (error) {
      console.error('❌ Ошибка проверки API:', error);
      setApiConnected(false);
      setUseCloudAPI(false);
      toast.warning('⚠️ API недоступен, используется локальный режим', { duration: 2000 });
    }
  };


  // Озвучивание текста с улучшенным голосом
  const speakText = async (text: string) => {
    console.log('🎤 Попытка озвучить текст:', text);
    
    if (useCloudAPI && apiConnected) {
      // Используем ElevenLabs Text-to-Speech
      try {
        console.log('🎤 Используем ElevenLabs TTS');
        setIsSpeaking(true);
        toast.success('🔊 Дарья говорит...', { duration: 1000 });
        
        const response = await voiceAPI.synthesizeSpeech(text);
        
        if (response.success && response.audio) {
          await VoiceAPIClient.playAudio(response.audio);
          console.log('✅ ElevenLabs TTS воспроизведение завершено');
        } else {
          throw new Error('Не удалось получить аудио от API');
        }
      } catch (error) {
        console.error('❌ Ошибка ElevenLabs TTS:', error);
        toast.error('Ошибка синтеза речи через ElevenLabs');
        setIsSpeaking(false);
        return; // Не используем fallback на браузерный голос
      } finally {
        setIsSpeaking(false);
      }
    } else {
      // Если API не подключен, показываем ошибку вместо использования браузерного голоса
      console.log('❌ ElevenLabs API не подключен');
      toast.error('Голосовой ассистент недоступен. Проверьте подключение к API.');
    }
  };

  // Локальный синтез речи (fallback)
  const fallbackSpeechSynthesis = (text: string) => {
    console.log('🖥️ Используем локальный синтез речи');
    
    if (!('speechSynthesis' in window)) {
      console.error('❌ SpeechSynthesis не поддерживается');
      toast.error('Озвучивание речи не поддерживается в вашем браузере');
      return;
    }

    // Останавливаем предыдущее озвучивание
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    
    // Получаем голоса с задержкой для их загрузки
    const getVoices = () => {
      return new Promise<SpeechSynthesisVoice[]>((resolve) => {
        let voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          resolve(voices);
        } else {
          // Ждем загрузки голосов
          window.speechSynthesis.addEventListener('voiceschanged', () => {
            voices = window.speechSynthesis.getVoices();
            resolve(voices);
          }, { once: true });
        }
      });
    };

    getVoices().then((voices) => {
      console.log('🎵 Доступные голоса:', voices.map(v => `${v.name} (${v.lang})`));
      
      // Ищем лучший женский голос для максимально приятного звучания
      const allVoices = voices.filter(voice => 
        voice.lang.startsWith('ru') || 
        voice.lang.startsWith('en') ||
        voice.name.includes('Russian') || 
        voice.name.includes('Google') ||
        voice.name.includes('Microsoft') ||
        voice.name.includes('Samantha') ||
        voice.name.includes('Karen') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Kate') ||
        voice.name.includes('Zira') ||
        voice.name.includes('Female') ||
        voice.name.includes('Woman') ||
        voice.name.includes('Girl') ||
        voice.name.includes('Luna') ||
        voice.name.includes('Nova') ||
        voice.name.includes('Serena') ||
        voice.name.includes('Aria') ||
        voice.name.includes('Ivy') ||
        voice.name.includes('Ruby') ||
        voice.name.includes('Amber') ||
        voice.name.includes('Coral')
      );

      // Приоритет русским голосам
      const russianVoices = allVoices.filter(voice => voice.lang.startsWith('ru'));
      
      console.log('🇷🇺 Русские голоса:', russianVoices.map(v => v.name));
      
      // Выбираем лучший женский голос для максимально приятного звучания
      let selectedVoice = null;
      
      if (russianVoices.length > 0) {
        // Ищем лучший русский женский голос
        selectedVoice = russianVoices.find(voice => 
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('женский') ||
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('girl') ||
          voice.name.includes('Google') ||
          voice.name.includes('Samantha') ||
          voice.name.includes('Karen') ||
          voice.name.includes('Victoria') ||
          voice.name.includes('Kate') ||
          voice.name.includes('Zira') ||
          voice.name.includes('Luna') ||
          voice.name.includes('Nova') ||
          voice.name.includes('Serena') ||
          voice.name.includes('Aria') ||
          voice.name.includes('Ivy') ||
          voice.name.includes('Ruby') ||
          voice.name.includes('Amber') ||
          voice.name.includes('Coral')
        ) || russianVoices[0];
        
        console.log('🎤 Выбран русский женский голос:', selectedVoice?.name);
      } else if (allVoices.length > 0) {
        // Ищем лучший женский голос из всех доступных
        selectedVoice = allVoices.find(voice => 
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('girl') ||
          voice.name.includes('Samantha') ||
          voice.name.includes('Karen') ||
          voice.name.includes('Victoria') ||
          voice.name.includes('Kate') ||
          voice.name.includes('Zira') ||
          voice.name.includes('Luna') ||
          voice.name.includes('Nova') ||
          voice.name.includes('Serena') ||
          voice.name.includes('Aria') ||
          voice.name.includes('Ivy') ||
          voice.name.includes('Ruby') ||
          voice.name.includes('Amber') ||
          voice.name.includes('Coral') ||
          voice.name.includes('Google') ||
          voice.name.includes('Microsoft')
        ) || allVoices[0];
        
        console.log('🎤 Выбран женский голос:', selectedVoice?.name);
      } else {
        console.log('⚠️ Подходящие голоса не найдены, используем системный');
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      }
      
      // Максимально оптимизированные настройки для самого приятного женского голоса
      utterance.rate = 0.75;        // Еще медленнее для максимальной естественности
      utterance.pitch = 1.2;        // Выше для более женственного звучания
      utterance.volume = 0.85;      // Комфортная громкость
      
      // Дополнительные настройки для улучшения качества
      utterance.lang = selectedVoice?.lang || 'ru-RU';
      
      utterance.onstart = () => {
        console.log('🔊 Начало локального озвучивания');
        setIsSpeaking(true);
        toast.success('🔊 Дарья говорит...', { duration: 1000 });
      };
      
      utterance.onend = () => {
        console.log('✅ Локальное озвучивание завершено');
        setIsSpeaking(false);
      };
      
      utterance.onerror = (event) => {
        console.error('❌ Ошибка локального озвучивания:', event);
        setIsSpeaking(false);
        toast.error('Ошибка воспроизведения голоса');
      };
      
      synthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }).catch((error) => {
      console.error('❌ Ошибка получения голосов:', error);
      // Fallback - говорим без выбора голоса
      utterance.rate = 0.9;
      utterance.pitch = 1.05;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    });
  };




  // Отправка текстового сообщения
  const sendTextMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const userMessage: VoiceMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    try {
      let responseText: string;
      
      // Используем ElevenLabs API если доступен
      if (useCloudAPI && apiConnected) {
        try {
          console.log('🧠 Используем ElevenLabs AI');
          const response = await voiceAPI.processTextMessage(text);
          
          if (response.success) {
            responseText = response.response.text;
            console.log('✅ Получен ответ от Google Cloud AI');
          } else {
            throw new Error('Google API вернул ошибку');
          }
        } catch (error) {
          console.error('❌ Ошибка Google Cloud AI:', error);
          // Fallback на локальный AI
          responseText = aiAssistant.getResponse(text);
        }
      } else {
        // Используем локальный AI
        console.log('🧠 Используем локальный AI (умные ответы)');
        responseText = aiAssistant.getResponse(text);
      }
      
      const assistantMessage: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      // Автоматически говорим ответ после прослушивания
      await speakText(responseText);
      
    } catch (error) {
      console.error('❌ Ошибка обработки сообщения:', error);
      toast.error('Ошибка обработки запроса');
      
      // Fallback ответ
      const fallbackMessage: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        text: "Извините, произошла ошибка. Попробуйте еще раз.",
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999] p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col shadow-2xl border-teal-200 bg-gradient-to-b from-teal-50 to-white">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Дарья</h3>
              <p className="text-xs text-teal-100">AI Помощница</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Сообщения */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`px-3 py-2 rounded-lg text-sm ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                }`}>
                  {message.text}
                </div>
                <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  {message.isAudio && (
                    <Badge variant="secondary" className="text-xs">
                      {message.sender === 'user' ? '🎤' : '🔊'}
                    </Badge>
                  )}
                  <span>{message.timestamp.toLocaleTimeString('ru-RU', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}</span>
                </div>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Думаю...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Управление */}
        <div className="p-4 border-t space-y-3">
          {/* Голосовые кнопки */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant={isListening ? "destructive" : "default"}
              size="lg"
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              className="rounded-full w-16 h-16 shadow-lg bg-teal-500 hover:bg-teal-600 text-white"
            >
              {isListening ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </Button>
            
            {isSpeaking && (
              <Button
                variant="outline"
                size="sm"
                onClick={stopSpeaking}
                className="rounded-full border-teal-300 text-teal-600 hover:bg-teal-50"
              >
                <VolumeX className="w-4 h-4 mr-2" />
                Стоп
              </Button>
            )}
          </div>

          {/* Статус */}
          <div className="text-center space-y-1">
            {/* API Status */}
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge 
                variant="secondary" 
                className="bg-teal-100 text-teal-800"
              >
                {useCloudAPI && apiConnected ? "🎤 ElevenLabs" : "🎤 Улучшенный голос"}
              </Badge>
              
              <Badge 
                variant="secondary" 
                className="bg-blue-100 text-blue-800"
              >
                {useCloudAPI && apiConnected ? "🧠 ElevenLabs AI" : "🧠 Умный AI"}
              </Badge>
            </div>
            
            {/* Activity Status */}
            <div>
              {isListening && (
                <Badge variant="secondary" className="bg-red-100 text-red-800 animate-pulse">
                  🎤 Слушаю...
                </Badge>
              )}
              {isProcessing && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 animate-pulse">
                  🤔 Дарья думает...
                </Badge>
              )}
              {isSpeaking && (
                <Badge variant="secondary" className="bg-teal-100 text-teal-800 animate-pulse">
                  🔊 Дарья говорит...
                </Badge>
              )}
            </div>
          </div>

          {/* Быстрые действия */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => sendTextMessage('У моего кота пропал аппетит')}
              disabled={isProcessing}
              className="text-xs"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              Симптомы
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => sendTextMessage('Как записаться на приём?')}
              disabled={isProcessing}
              className="text-xs"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              Запись
            </Button>
          </div>

          {/* Текстовый ввод */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              placeholder="Напишите сообщение или используйте микрофон..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  if (input.value.trim()) {
                    sendTextMessage(input.value);
                    input.value = '';
                  }
                }
              }}
              disabled={isProcessing}
            />
            <Button
              size="sm"
              onClick={() => {
                const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                if (input && input.value.trim()) {
                  sendTextMessage(input.value);
                  input.value = '';
                }
              }}
              disabled={isProcessing}
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VoiceAssistant;
