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
      text: 'Привет! Я голосовой помощник клиники "Море". Расскажите о симптомах вашего питомца, и я помогу собрать информацию для врача.',
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
          // Получаем ответ от AI
          const response = await aiAssistant.getResponse(transcript);
          
          // Добавляем ответ ассистента
          const assistantMessage: VoiceMessage = {
            id: (Date.now() + 1).toString(),
            text: response,
            sender: 'assistant',
            timestamp: new Date(),
            isAudio: true
          };
          
          setMessages(prev => [...prev, assistantMessage]);
          
          // Озвучиваем ответ
          speakText(response);
          
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

  // Прокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Озвучивание текста
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Останавливаем предыдущее озвучивание
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      
      synthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Остановка озвучивания
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Начало записи
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        toast.success('Говорите...', {
          description: 'Слушаю вас'
        });
      } catch (error) {
        console.error('Ошибка начала записи:', error);
        toast.error('Не удалось начать запись');
      }
    }
  };

  // Остановка записи
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
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
      const response = await aiAssistant.getResponse(text);
      
      const assistantMessage: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      speakText(response);
      
    } catch (error) {
      console.error('Ошибка AI:', error);
      toast.error('Ошибка обработки запроса');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999] p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col shadow-2xl">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Голосовой помощник</h3>
              <p className="text-xs text-blue-100">AI ассистент клиники</p>
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
              className="rounded-full w-16 h-16 shadow-lg"
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
                className="rounded-full"
              >
                <VolumeX className="w-4 h-4 mr-2" />
                Стоп
              </Button>
            )}
          </div>

          {/* Статус */}
          <div className="text-center">
            {isListening && (
              <Badge variant="secondary" className="bg-red-100 text-red-800 animate-pulse">
                🎤 Слушаю...
              </Badge>
            )}
            {isSpeaking && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 animate-pulse">
                🔊 Говорю...
              </Badge>
            )}
            {isProcessing && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 animate-pulse">
                🤔 Обрабатываю...
              </Badge>
            )}
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
        </div>
      </Card>
    </div>
  );
};

export default VoiceAssistant;
