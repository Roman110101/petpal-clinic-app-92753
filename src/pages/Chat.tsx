import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/PageHeader";
import { MessageCircle, Send, Phone, Video, User, Bot, Loader2 } from "lucide-react";
import { aiAssistant } from "@/lib/ai-assistant";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Привет! Я AI помощник клиники «Море». Отвечу на вопросы о записи, ценах, услугах и здоровье питомцев. Чем помочь?",
      time: "14:30"
    },
    {
      id: 2,
      type: "user",
      text: "Здравствуйте! У моего кота проблемы с аппетитом, что делать?",
      time: "14:32"
    },
    {
      id: 3,
      type: "bot",
      text: "Потеря аппетита - серьёзный симптом. Рекомендую срочно показать питомца врачу. Записаться можно через приложение.",
      time: "14:33"
    }
  ]);

  const handleSendMessage = async () => {
    if (message.trim() && !isLoading) {
      const userMessage = message;
      const newMessage = {
        id: messages.length + 1,
        type: "user" as const,
        text: userMessage,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage("");
      setIsLoading(true);
      
      try {
        // Получаем ответ от AI помощника
        const aiResponse = await aiAssistant.getResponse(userMessage);
        
        const botResponse = {
          id: messages.length + 2,
          type: "bot" as const,
          text: aiResponse,
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        const errorResponse = {
          id: messages.length + 2,
          type: "bot" as const,
          text: "Извините, произошла ошибка. Пожалуйста, попробуйте позже или позвоните нам: +7 (925) 092-02-72",
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const quickActions = [
    { text: "Записаться на приём", message: "Хочу записаться на приём к ветеринару" },
    { text: "Узнать режим работы", message: "Какой у вас режим работы?" },
    { text: "Экстренная помощь", message: "Мне нужна экстренная помощь для питомца" },
    { text: "Прайс-лист", message: "Можете показать прайс-лист на услуги?" }
  ];

  const handleQuickAction = async (quickMessage: string) => {
    if (!isLoading) {
      setMessage(quickMessage);
      
      // Небольшая задержка чтобы состояние обновилось
      setTimeout(() => {
        handleSendMessage();
      }, 100);
    }
  };

  return (
    <div className="bg-background min-h-screen pt-16 ios-scroll-fix flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0">
        <PageHeader 
          title="AI Помощник" 
          subtitle="Умный помощник клиники"
          icon={<Bot className="w-6 h-6" />}
        />
      </div>

      {/* Quick Actions */}
      <section className="px-4 mt-4 flex-shrink-0">
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.message)}
              disabled={isLoading}
              className="p-3 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {action.text}
            </button>
          ))}
        </div>
      </section>

      {/* Messages */}
      <section className="px-4 mt-4 flex-1 overflow-y-auto">
        <div className="space-y-4 pb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0">
                {msg.type === 'user' ? (
                  <User className="w-4 h-4 text-primary" />
                ) : (
                  <Bot className="w-4 h-4 text-primary" />
                )}
              </div>
              <div className={`max-w-[80%] ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div
                  className={`p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{msg.time}</div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="max-w-[80%]">
                <div className="p-3 rounded-lg bg-card border border-border">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Помощник печатает...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Message Input */}
      <section className="px-4 py-4 bg-background border-t border-border flex-shrink-0">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isLoading ? "Ожидайте ответа..." : "Напишите ваше сообщение..."}
            className="flex-1"
            disabled={isLoading}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !isLoading) {
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !message.trim()}
            className="px-3"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </section>

      {/* Contact Info */}
      <section className="px-4 pb-6 flex-shrink-0">
        <Card className="p-3 bg-muted/30">
          <div className="text-center text-sm text-muted-foreground">
            <div className="font-medium text-foreground mb-1 flex items-center justify-center gap-2">
              <Bot className="w-4 h-4 text-primary" />
              AI Помощник клиники "Море"
            </div>
            <div>Экстренные случаи: +7 (925) 092-02-72</div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Chat;
