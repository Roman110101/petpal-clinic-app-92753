import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

interface VoiceMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
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

      recognitionRef.current.onresult = async (event) => {
        try {
          const transcript = event.results[0][0].transcript;
          console.log('🎤 Распознан текст:', transcript);
          
          const userMessage: VoiceMessage = {
            id: Date.now().toString(),
            text: transcript,
            sender: 'user',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, userMessage]);
          await sendTextMessage(transcript);
        } catch (error) {
          console.error('Ошибка обработки результата распознавания:', error);
          toast.error('Ошибка обработки речи');
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

  // Прокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startListening = () => {
    try {
      // Инициализация аудио контекста для iOS
      if (typeof window !== 'undefined' && window.AudioContext) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
      }

      if (recognitionRef.current && !isListening) {
        recognitionRef.current.start();
        setIsListening(true);
        toast.success('🎤 Слушаю...', { duration: 1000 });
      }
    } catch (error) {
      console.error('Ошибка при запуске распознавания:', error);
      setIsListening(false);
      toast.error('Ошибка запуска микрофона');
    }
  };

  const stopListening = () => {
    try {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
        toast.info('🛑 Остановлено', { duration: 1000 });
      }
    } catch (error) {
      console.error('Ошибка при остановке распознавания:', error);
      setIsListening(false);
    }
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      toast.info('🔇 Голос остановлен', { duration: 1000 });
    }
  };

  // Озвучивание текста через ElevenLabs
  const speakText = async (text: string) => {
    try {
      setIsSpeaking(true);
      toast.success('🔊 Дарья говорит...', { duration: 1000 });

      // Пытаемся использовать ElevenLabs API
      const response = await fetch('/api/synthesize-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.success && data.audio) {
          // Воспроизводим аудио от ElevenLabs
          const audioData = atob(data.audio);
          const audioArray = new Uint8Array(audioData.length);
          for (let i = 0; i < audioData.length; i++) {
            audioArray[i] = audioData.charCodeAt(i);
          }

          const audioBlob = new Blob([audioArray], { type: 'audio/mpeg' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);

          // Настройки для iOS совместимости
          audio.preload = 'auto';
          audio.crossOrigin = 'anonymous';

          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            setIsSpeaking(false);
          };

          audio.onerror = (error) => {
            console.error('Ошибка воспроизведения аудио:', error);
            URL.revokeObjectURL(audioUrl);
            setIsSpeaking(false);
            // Fallback на браузерный голос
            fallbackSpeechSynthesis(text);
          };

          // Попытка воспроизведения с обработкой ошибок iOS
          try {
            await audio.play();
          } catch (playError) {
            console.warn('iOS: Не удалось автоматически воспроизвести аудио:', playError);
            
            // Для iOS - показываем кнопку воспроизведения
            if (playError.name === 'NotAllowedError') {
              toast.error('🔊 Нажмите для воспроизведения голоса', { 
                duration: 3000,
                action: {
                  label: '▶️ Воспроизвести',
                  onClick: async () => {
                    try {
                      await audio.play();
                    } catch (e) {
                      console.error('Ошибка ручного воспроизведения:', e);
                      fallbackSpeechSynthesis(text);
                    }
                  }
                }
              });
              return;
            }
            
            // Другие ошибки - fallback
            fallbackSpeechSynthesis(text);
          }
          return;
        }
      }

      // Если ElevenLabs не работает, используем браузерный голос
      console.log('⚠️ ElevenLabs недоступен, используем браузерный голос');
      fallbackSpeechSynthesis(text);

    } catch (error) {
      console.error('Ошибка ElevenLabs:', error);
      setIsSpeaking(false);
      // Fallback на браузерный голос
      fallbackSpeechSynthesis(text);
    }
  };

  // Fallback - браузерный голос
  const fallbackSpeechSynthesis = (text: string) => {
    try {
      if (!('speechSynthesis' in window)) {
        toast.error('Озвучивание речи не поддерживается в вашем браузере');
        return;
      }

      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      utterance.volume = 0.9;

      // Безопасный выбор голоса
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const russianVoices = voices.filter(voice => voice && voice.lang && voice.lang.startsWith('ru'));
          
          if (russianVoices.length > 0) {
            const femaleVoice = russianVoices.find(voice => 
              voice.name && (
                voice.name.toLowerCase().includes('женский') || 
                voice.name.toLowerCase().includes('female') ||
                voice.name.toLowerCase().includes('anna') ||
                voice.name.toLowerCase().includes('katya')
              )
            );
            
            if (femaleVoice) {
              utterance.voice = femaleVoice;
            } else {
              utterance.voice = russianVoices[0];
            }
          }
        }
      } catch (voiceError) {
        console.warn('Не удалось выбрать голос:', voiceError);
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        toast.success('🔊 Дарья говорит (браузерный голос)...', { duration: 1000 });
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = (event) => {
        console.error('Ошибка браузерного голоса:', event);
        setIsSpeaking(false);
        toast.error('Ошибка воспроизведения голоса');
      };

      synthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Ошибка fallback голоса:', error);
      setIsSpeaking(false);
    }
  };

  // Отправка текстового сообщения
  const sendTextMessage = async (text: string) => {
    if (!text.trim()) return;

    // Инициализация аудио контекста для iOS при первом взаимодействии
    if (typeof window !== 'undefined' && window.AudioContext) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    }

    setIsProcessing(true);
    
    try {
      const responseText = aiAssistant.getResponse(text);
      
      const assistantMessage: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Автоматически говорим ответ через ElevenLabs
      setTimeout(async () => {
        try {
          await speakText(responseText);
        } catch (speakError) {
          console.error('Ошибка при озвучивании:', speakError);
        }
      }, 500);
      
    } catch (error) {
      console.error('Ошибка обработки сообщения:', error);
      toast.error('Ошибка обработки запроса');
      
      // Добавляем сообщение об ошибке
      const errorMessage: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        text: "Извините, произошла ошибка. Попробуйте еще раз.",
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999] p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col shadow-2xl">
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
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {message.text}
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-3 py-2 rounded-lg">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Управление */}
        <div className="p-4 border-t bg-gray-50 space-y-3">
          {/* Кнопки голоса */}
          <div className="flex justify-center gap-2">
            {!isListening ? (
              <Button
                onClick={startListening}
                disabled={isSpeaking || isProcessing}
                className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-6"
              >
                <Mic className="w-4 h-4 mr-2" />
                Говорить
              </Button>
            ) : (
              <Button
                onClick={stopListening}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6"
              >
                <MicOff className="w-4 h-4 mr-2" />
                Слушаю...
              </Button>
            )}
            
            {isSpeaking && (
              <Button
                variant="outline"
                onClick={stopSpeaking}
                className="rounded-full border-red-300 text-red-600 hover:bg-red-50"
              >
                <VolumeX className="w-4 h-4 mr-2" />
                Стоп
              </Button>
            )}
          </div>

          {/* Быстрые действия */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/symptoms'}
              className="text-xs"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              Симптомы
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/appointment'}
              className="text-xs"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              Запись
            </Button>
          </div>

          {/* Текстовый ввод */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Напишите сообщение..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
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