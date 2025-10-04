import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneCall, 
  Camera, 
  CameraOff,
  Play,
  Pause,
  Square,
  Download,
  Share,
  MessageCircle,
  Heart,
  Activity,
  Thermometer,
  Eye,
  Ear,
  PawPrint,
  Clock,
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  Zap,
  Shield,
  Wifi,
  WifiOff,
  Send,
  Paperclip,
  Smile,
  X,
  RotateCcw,
  FlipHorizontal,
  Check
} from 'lucide-react';
import { toast } from "sonner";
import SymptomAnalyzer from "@/components/SymptomAnalyzer";
import { doctors as importedDoctors, type Doctor as ImportedDoctor } from "@/data/doctors";

interface VideoCallState {
  isConnected: boolean;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isRecording: boolean;
  callDuration: number;
  connectionQuality: 'excellent' | 'good' | 'poor' | 'disconnected';
  isConnecting: boolean;
  isFrontCamera: boolean;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  isOnline: boolean;
  experience: string;
}

interface SymptomAnalysis {
  detected: string[];
  confidence: number;
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high';
}

const Telemedicine = () => {
  const [callState, setCallState] = useState<VideoCallState>({
    isConnected: false,
    isVideoOn: true,
    isAudioOn: true,
    isRecording: false,
    callDuration: 0,
    connectionQuality: 'excellent',
    isConnecting: false,
    isFrontCamera: true
  });

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [symptomAnalysis, setSymptomAnalysis] = useState<SymptomAnalysis | null>(null);
  const [showSymptomDemo, setShowSymptomDemo] = useState(false);
  const [showSymptomAnalyzer, setShowSymptomAnalyzer] = useState(false);
  const [currentView, setCurrentView] = useState<'doctors' | 'call' | 'analysis'>('doctors');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState<Doctor | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      id: 1,
      text: "Привет! Готов к консультации. Расскажите, что беспокоит вашего питомца?",
      sender: 'doctor',
      timestamp: new Date(Date.now() - 300000), // 5 минут назад
      status: 'read'
    },
    {
      id: 2,
      text: "Здравствуйте! У моего кота в последние дни пропал аппетит, стал вялым",
      sender: 'user',
      timestamp: new Date(Date.now() - 240000), // 4 минуты назад
      status: 'read'
    },
    {
      id: 3,
      text: "Понимаю. А как давно это продолжается? Есть ли другие симптомы?",
      sender: 'doctor',
      timestamp: new Date(Date.now() - 180000), // 3 минуты назад
      status: 'read'
    },
    {
      id: 4,
      text: "Уже третий день. Еще он много пьет воды, но почти не ест",
      sender: 'user',
      timestamp: new Date(Date.now() - 120000), // 2 минуты назад
      status: 'delivered'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFilePicker, setShowFilePicker] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingRef = useRef<MediaRecorder | null>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Волкова Галина Николаевна',
      specialty: 'Главный врач, травматология, визуальная диагностика, эндоскопия',
      avatar: '/Img team/1.jpg',
      rating: 4.9,
      isOnline: true,
      experience: '15 лет опыта'
    },
    {
      id: '2', 
      name: 'Шкиль Светлана Леонидовна',
      specialty: 'Главный врач, кардиология',
      avatar: '/Img team/2.jpg',
      rating: 4.8,
      isOnline: true,
      experience: '12 лет опыта'
    },
    {
      id: '3',
      name: 'Ярославская Анастасия Михайловна',
      specialty: 'Главный ветеринарный врач, дерматология, эндокринология',
      avatar: '/Img team/3.jpg',
      rating: 4.9,
      isOnline: true,
      experience: '10 лет опыта'
    }
  ];

  // Симуляция анализа симптомов через AI
  const analyzeSymptoms = async () => {
    setSymptomAnalysis({
      detected: ['Вялость', 'Потеря аппетита', 'Учащенное дыхание'],
      confidence: 87,
      recommendations: [
        'Измерьте температуру',
        'Обеспечьте покой',
        'Обратите внимание на потребление воды'
      ],
      urgency: 'medium'
    });
    
    toast.success('Анализ симптомов завершен!', {
      description: 'Обнаружено 3 потенциальных симптома'
    });
  };

  // Простая проверка поддержки камеры (без блокировок)
  const checkCameraSupport = async () => {
    console.log('📷 Проверка камеры пропущена - демо режим');
    return true;
  };

  // Запуск видеозвонка
  const startVideoCall = async (doctor: Doctor) => {
    console.log('🚀 Начинаем видеозвонок с врачом:', doctor.name);
    
    // Проверяем поддержку камеры
    const cameraSupported = await checkCameraSupport();
    if (!cameraSupported) {
      return;
    }
    
    setIsCalling(true);
    setSelectedDoctor(doctor);
    setCurrentView('call');
    
    // Очищаем предыдущий поток если есть
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // Сразу устанавливаем состояние подключения
    setCallState(prev => ({ 
      ...prev, 
      isConnecting: true,
      isVideoOn: false,
      isAudioOn: false 
    }));
    
    toast.success('Запуск видеозвонка...', {
      description: 'Получаем доступ к камере'
    });
    
    try {
      // Запрашиваем доступ к камере и микрофону
      console.log('📹 Запрашиваем доступ к медиаустройствам...');
      
      const constraints = {
        video: {
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
          facingMode: 'user',
          frameRate: { ideal: 30, min: 15 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      };
      
      console.log('📋 Ограничения:', constraints);
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      console.log('✅ Получили поток:', stream);
      console.log('📹 Видео треки:', stream.getVideoTracks());
      console.log('🎤 Аудио треки:', stream.getAudioTracks());
      
      // Проверяем что есть видео треки
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length === 0) {
        throw new Error('Нет видео треков');
      }
      
      console.log('📹 Видео трек активен:', videoTracks[0].enabled);
      console.log('📹 Видео трек готов:', videoTracks[0].readyState);
      console.log('📹 Настройки видео:', videoTracks[0].getSettings());
      
      // Сохраняем поток
      streamRef.current = stream;
      
      // Подключаем поток к видео элементу
      if (videoRef.current) {
        console.log('🔗 Подключаем поток к видео элементу');
        
        // Очищаем предыдущий srcObject
        videoRef.current.srcObject = null;
        
        // Устанавливаем новый поток
        videoRef.current.srcObject = stream;
        
        // Настраиваем видео элемент
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
        videoRef.current.autoplay = true;
        videoRef.current.controls = false;
        
        // Ждем загрузки метаданных
        await new Promise((resolve, reject) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = resolve;
            videoRef.current.onerror = reject;
            
            // Таймаут для загрузки
            setTimeout(() => {
              if (videoRef.current?.readyState >= 1) {
                resolve(null);
              } else {
                reject(new Error('Таймаут загрузки видео'));
              }
            }, 5000);
          }
        });
        
        // Запускаем воспроизведение
        try {
          await videoRef.current.play();
          console.log('▶️ Видео успешно запущено');
          
          // Обновляем состояние
          setCallState(prev => ({ 
            ...prev, 
            isVideoOn: true,
            isAudioOn: true
          }));
          
          toast.success('Камера включена!', {
            description: 'Видео поток активен'
          });
          
          // Симуляция подключения врача
          setTimeout(() => {
            console.log('👨‍⚕️ Врач подключился');
            setCallState(prev => ({ 
              ...prev, 
              isConnected: true,
              isConnecting: false,
              isVideoOn: true,
              isAudioOn: true
            }));
            
            startCallTimer();
            
            toast.success('Врач подключился!', {
              description: 'Консультация началась'
            });
          }, 2000);
          
        } catch (playError) {
          console.error('❌ Ошибка воспроизведения видео:', playError);
          
          // Пробуем еще раз через задержку
          setTimeout(async () => {
            try {
              if (videoRef.current && videoRef.current.srcObject) {
                await videoRef.current.play();
                console.log('▶️ Видео запущено с задержкой');
                
                setCallState(prev => ({ 
                  ...prev, 
                  isVideoOn: true,
                  isAudioOn: true
                }));
              }
            } catch (retryError) {
              console.error('❌ Повторный запуск не удался:', retryError);
              toast.error('Не удалось запустить видео', {
                description: 'Попробуйте перезагрузить страницу'
              });
            }
          }, 1000);
        }
      } else {
        console.error('❌ Видео элемент не найден');
        throw new Error('Видео элемент не найден');
      }
      
    } catch (error) {
      console.error('❌ Ошибка получения медиапотока:', error);
      
      let errorMessage = 'Не удалось получить доступ к камере';
      let errorDescription = 'Попробуйте обновить страницу';
      
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Доступ к камере запрещен';
        errorDescription = 'Разрешите доступ к камере в настройках браузера и обновите страницу';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'Камера не найдена';
        errorDescription = 'Подключите камеру и обновите страницу';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'Камера используется';
        errorDescription = 'Закройте другие приложения, использующие камеру';
      } else if (error.name === 'OverconstrainedError') {
        errorMessage = 'Камера не поддерживает требуемые настройки';
        errorDescription = 'Попробуйте другую камеру или обновите драйверы';
      } else if (error.name === 'SecurityError') {
        errorMessage = 'Ошибка безопасности';
        errorDescription = 'Требуется HTTPS для доступа к камере';
      }
      
      toast.error(errorMessage, {
        description: errorDescription
      });
      
      // Продолжаем без камеры
      setCallState(prev => ({ 
        ...prev, 
        isConnected: true,
        isConnecting: false,
        isVideoOn: false,
        isAudioOn: false
      }));
      
      startCallTimer();
    }
    
    setIsCalling(false);
  };

  // Запуск записи консультации
  const startRecording = () => {
    if (!streamRef.current) return;
    
    try {
      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: 'video/webm;codecs=vp9'
      });
      
      recordingRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        // Автоматическое скачивание записи
        const a = document.createElement('a');
        a.href = url;
        a.download = `telemedicine-${new Date().toISOString().split('T')[0]}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        toast.success('Запись сохранена!', {
          description: 'Консультация скачана в папку Загрузки'
        });
      };
      
      mediaRecorder.start();
      setCallState(prev => ({ ...prev, isRecording: true }));
      
      toast.success('Запись начата', {
        description: 'Консультация записывается'
      });
      
    } catch (error) {
      toast.error('Ошибка записи', {
        description: 'Не удалось начать запись'
      });
    }
  };

  // Остановка записи
  const stopRecording = () => {
    if (recordingRef.current && recordingRef.current.state === 'recording') {
      recordingRef.current.stop();
      setCallState(prev => ({ ...prev, isRecording: false }));
    }
  };

  // Таймер звонка
  const startCallTimer = () => {
    callTimerRef.current = setInterval(() => {
      setCallState(prev => ({
        ...prev,
        callDuration: prev.callDuration + 1
      }));
    }, 1000);
  };

  // Форматирование времени
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Завершение звонка
  const endCall = () => {
    console.log('📞 Завершаем видеозвонок...');
    
    // Останавливаем запись если активна
    if (recordingRef.current && callState.isRecording) {
      console.log('🛑 Останавливаем запись...');
      stopRecording();
    }
    
    // Очищаем таймер
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
    
    // Останавливаем медиапоток
    if (streamRef.current) {
      console.log('🛑 Останавливаем медиапоток...');
      streamRef.current.getTracks().forEach(track => {
        console.log('🛑 Останавливаем трек:', track.kind, track.label);
        track.stop();
      });
      streamRef.current = null;
    }
    
    // Очищаем видео элемент
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    // Сбрасываем состояние
    setCallState({
      isConnected: false,
      isVideoOn: false,
      isAudioOn: false,
      isRecording: false,
      callDuration: 0,
      connectionQuality: 'excellent',
      isConnecting: false,
      isFrontCamera: true
    });
    
    setCurrentView('doctors');
    setSelectedDoctor(null);
    setIsCalling(false);
    
    toast.success('Звонок завершен', {
      description: 'Спасибо за использование телемедицины'
    });
  };

  // Переключение видео
  const toggleVideo = async () => {
    console.log('Переключение видео. Текущее состояние:', callState.isVideoOn);
    
    if (!callState.isVideoOn) {
      // Включаем видео
      console.log('Включаем камеру...');
      
      // Проверяем поддержку камеры
      const cameraSupported = await checkCameraSupport();
      if (!cameraSupported) {
        return;
      }
      
      try {
        const constraints = {
          video: {
            width: { ideal: 1280, min: 640 },
            height: { ideal: 720, min: 480 },
            facingMode: callState.isFrontCamera ? 'user' : 'environment',
            frameRate: { ideal: 30, min: 15 }
          },
          audio: false
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        console.log('Получили новый видео поток:', stream.getVideoTracks());
        
        if (streamRef.current) {
          // Останавливаем старые видео треки
          const oldVideoTracks = streamRef.current.getVideoTracks();
          oldVideoTracks.forEach(track => {
            track.stop();
            streamRef.current?.removeTrack(track);
          });
          
          // Добавляем новый видео трек
          const newVideoTrack = stream.getVideoTracks()[0];
          if (newVideoTrack) {
            streamRef.current.addTrack(newVideoTrack);
          }
          
          // Останавливаем аудио треки из нового потока (они нам не нужны)
          stream.getAudioTracks().forEach(track => track.stop());
        } else {
          // Создаем новый поток если его нет
          streamRef.current = stream;
        }
        
        if (videoRef.current) {
          videoRef.current.srcObject = streamRef.current;
          
          // Ждем загрузки метаданных
          await new Promise((resolve, reject) => {
            if (videoRef.current) {
              videoRef.current.onloadedmetadata = resolve;
              videoRef.current.onerror = reject;
              
              setTimeout(() => {
                if (videoRef.current?.readyState >= 1) {
                  resolve(null);
                } else {
                  reject(new Error('Таймаут загрузки видео'));
                }
              }, 3000);
            }
          });
          
          await videoRef.current.play();
          console.log('Видео включено успешно');
          setCallState(prev => ({ ...prev, isVideoOn: true }));
          
          toast.success('Камера включена!', {
            description: 'Видео поток активен'
          });
        }
        
      } catch (error) {
        console.error('Не удалось включить камеру:', error);
        
        let errorMessage = 'Не удалось включить камеру';
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Доступ к камере запрещен';
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'Камера не найдена';
        } else if (error.name === 'NotReadableError') {
          errorMessage = 'Камера используется другим приложением';
        }
        
        toast.error(errorMessage, {
          description: 'Проверьте разрешения и подключение камеры'
        });
      }
    } else {
      // Выключаем видео
      console.log('Выключаем камеру...');
      if (streamRef.current) {
        const videoTracks = streamRef.current.getVideoTracks();
        videoTracks.forEach(track => {
          track.stop();
          streamRef.current?.removeTrack(track);
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
      
      setCallState(prev => ({ ...prev, isVideoOn: false }));
      console.log('Камера выключена');
      
      toast.success('Камера выключена', {
        description: 'Видео поток остановлен'
      });
    }
  };

  // Переключение камеры (фронтальная/задняя)
  const toggleCamera = async () => {
    if (!callState.isVideoOn) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: 1280, 
          height: 720,
          facingMode: !callState.isFrontCamera ? 'user' : 'environment'
        },
        audio: false
      });
      
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack && streamRef.current) {
        // Заменяем видео трек
        const currentStream = streamRef.current;
        if (currentStream.getVideoTracks()[0]) {
          currentStream.removeTrack(currentStream.getVideoTracks()[0]);
        }
        currentStream.addTrack(videoTrack);
        
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
        }
      }
      
      setCallState(prev => ({ ...prev, isFrontCamera: !prev.isFrontCamera }));
      toast.success('Камера переключена', {
        description: callState.isFrontCamera ? 'Теперь задняя камера' : 'Теперь фронтальная камера'
      });
    } catch (error) {
      console.log('Не удалось переключить камеру');
      toast.error('Не удалось переключить камеру');
    }
  };

  // Переключение полноэкранного режима
  const toggleFullscreen = async () => {
    try {
      const videoContainer = document.querySelector('.video-container') as HTMLElement;
      if (!videoContainer) {
        toast.error('Элемент для полноэкранного режима не найден');
        return;
      }

      if (!document.fullscreenElement) {
        // Пробуем все возможные методы для входа в полноэкранный режим
        const methods = [
          () => videoContainer.requestFullscreen(),
          () => (videoContainer as any).webkitRequestFullscreen(),
          () => (videoContainer as any).mozRequestFullScreen(),
          () => (videoContainer as any).msRequestFullscreen(),
          () => {
            // Fallback для мобильных устройств
            if (videoContainer.requestFullscreen) {
              return videoContainer.requestFullscreen();
            }
            throw new Error('Fullscreen not supported');
          }
        ];

        let success = false;
        for (const method of methods) {
          try {
            await method();
            success = true;
            break;
          } catch (e) {
            continue;
          }
        }

        if (success) {
          setCallState(prev => ({ ...prev, isFullscreen: true }));
          toast.success('Полноэкранный режим включен');
        } else {
          throw new Error('Fullscreen not supported');
        }
      } else {
        // Выход из полноэкранного режима
        const methods = [
          () => document.exitFullscreen(),
          () => (document as any).webkitExitFullscreen(),
          () => (document as any).mozCancelFullScreen(),
          () => (document as any).msExitFullscreen()
        ];

        for (const method of methods) {
          try {
            await method();
            break;
          } catch (e) {
            continue;
          }
        }

        setCallState(prev => ({ ...prev, isFullscreen: false }));
        toast.success('Полноэкранный режим выключен');
      }
    } catch (error) {
      console.log('Ошибка полноэкранного режима:', error);
      
      // Если полноэкранный режим не поддерживается, показываем альтернативу
      if (callState.isFullscreen) {
        // Выход из псевдо-полноэкранного режима
        const fullscreenOverlay = document.getElementById('fullscreen-overlay');
        if (fullscreenOverlay) {
          fullscreenOverlay.remove();
        }
        
        // Скрываем полноэкранные кнопки управления
        const fullscreenControls = document.querySelector('.fullscreen-controls') as HTMLElement;
        if (fullscreenControls) {
          fullscreenControls.style.display = 'none';
        }
        
        setCallState(prev => ({ ...prev, isFullscreen: false }));
        toast.success('Полноэкранный режим выключен');
      } else {
        // Создаем псевдо-полноэкранный режим через CSS
        const videoContainer = document.querySelector('.video-container') as HTMLElement;
        if (videoContainer) {
          // Создаем полноэкранный оверлей
          const fullscreenOverlay = document.createElement('div');
          fullscreenOverlay.id = 'fullscreen-overlay';
          fullscreenOverlay.style.position = 'fixed';
          fullscreenOverlay.style.top = '0';
          fullscreenOverlay.style.left = '0';
          fullscreenOverlay.style.width = '100vw';
          fullscreenOverlay.style.height = '100vh';
          fullscreenOverlay.style.backgroundColor = 'black';
          fullscreenOverlay.style.zIndex = '9999';
          fullscreenOverlay.style.display = 'flex';
          fullscreenOverlay.style.alignItems = 'center';
          fullscreenOverlay.style.justifyContent = 'center';
          
          // Клонируем видео элемент
          const videoElement = videoRef.current;
          if (videoElement) {
            const videoClone = videoElement.cloneNode(true) as HTMLVideoElement;
            videoClone.style.width = '100%';
            videoClone.style.height = '100%';
            videoClone.style.objectFit = 'contain';
            fullscreenOverlay.appendChild(videoClone);
          }
          
          document.body.appendChild(fullscreenOverlay);
          
          // Показываем полноэкранные кнопки управления
          const fullscreenControls = document.querySelector('.fullscreen-controls') as HTMLElement;
          if (fullscreenControls) {
            fullscreenControls.style.display = 'flex';
          }
          
          setCallState(prev => ({ ...prev, isFullscreen: true }));
          toast.success('Полноэкранный режим включен');
        }
      }
    }
  };

  // Переключение микрофона
  const toggleAudio = () => {
    setCallState(prev => ({ ...prev, isAudioOn: !prev.isAudioOn }));
  };

  // Демонстрация симптомов
  const toggleSymptomDemo = () => {
    setShowSymptomDemo(!showSymptomDemo);
    if (!showSymptomDemo) {
      analyzeSymptoms();
    }
  };

  // Обработка результатов анализа симптомов
  const handleSymptomAnalysisComplete = (results: any[]) => {
    setSymptomAnalysis({
      detected: results.map(r => r.symptom),
      confidence: Math.round(results.reduce((acc, r) => acc + r.confidence, 0) / results.length),
      recommendations: results.map(r => r.recommendation),
      urgency: results.some(r => r.severity === 'high') ? 'high' : 
               results.some(r => r.severity === 'medium') ? 'medium' : 'low'
    });
    setShowSymptomAnalyzer(false);
    
    toast.success('Анализ завершен!', {
      description: `Обнаружено ${results.length} симптомов`
    });
  };

  // Открытие чата
  const openChat = (doctor: any) => {
    console.log('Opening chat for doctor:', doctor);
    setCurrentDoctor(doctor);
    setIsChatOpen(true);
  };

  // Закрытие чата
  const closeChat = () => {
    setIsChatOpen(false);
    setCurrentDoctor(null);
  };

  // Функции чата
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');

    // Симуляция ответа врача через 2 секунды
    setTimeout(() => {
      const responses = [
        "Понял, спасибо за информацию. Продолжаем наблюдение.",
        "Хорошо, это важные детали. Рекомендую показать питомца.",
        "Интересно. А как давно это началось?",
        "Спасибо за подробности. Это поможет в диагностике."
      ];
      
      const doctorMessage = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'doctor',
        timestamp: new Date(),
        status: 'read'
      };
      
      setChatMessages(prev => [...prev, doctorMessage]);
    }, 2000);
  };

const handleFileUpload = () => {
  setShowFilePicker(!showFilePicker);
  toast.success('Функция загрузки файлов', {
    description: 'В реальном приложении здесь будет выбор файлов'
  });
};

const handleEmojiClick = (emoji: string) => {
  setNewMessage(prev => prev + emoji);
  setShowEmojiPicker(false);
};

const emojis = ['😊', '😢', '😍', '🤔', '👍', '👎', '❤️', '🐱', '🐶', '💊', '🏥', '⚕️'];

  const formatChatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <div className="w-3 h-3 flex items-center justify-center">
          <Check className="w-2 h-2 text-gray-400" />
        </div>;
      case 'delivered':
        return <div className="w-3 h-3 flex items-center justify-center">
          <div className="flex">
            <Check className="w-2 h-2 text-gray-400" />
            <Check className="w-2 h-2 text-gray-400 ml-[-2px]" />
          </div>
        </div>;
      case 'read':
        return <div className="w-3 h-3 flex items-center justify-center">
          <div className="flex">
            <Check className="w-2 h-2 text-blue-500" />
            <Check className="w-2 h-2 text-blue-500 ml-[-2px]" />
          </div>
        </div>;
      default:
        return null;
    }
  };

  // Обработчик событий полноэкранного режима
  useEffect(() => {
    const handleFullscreenChange = () => {
      setCallState(prev => ({ 
        ...prev, 
        isFullscreen: !!document.fullscreenElement 
      }));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      console.log('🧹 Очищаем ресурсы при размонтировании...');
      
      // Очищаем таймер
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
        callTimerRef.current = null;
      }
      
      // Останавливаем запись
      if (recordingRef.current && recordingRef.current.state === 'recording') {
        recordingRef.current.stop();
        recordingRef.current = null;
      }
      
      // Останавливаем медиапоток
      if (streamRef.current) {
        console.log('🛑 Останавливаем медиапоток...');
        streamRef.current.getTracks().forEach(track => {
          console.log('🛑 Останавливаем трек:', track.kind, track.label);
          track.stop();
        });
        streamRef.current = null;
      }
      
      // Очищаем видео элемент
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  if (currentView === 'call') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-20 pb-20 overflow-x-hidden">
        {/* Заголовок звонка */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b mx-2 sm:mx-4 rounded-t-xl">
          <div className="w-full px-2 sm:px-4 py-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                  <AvatarImage 
                    src={selectedDoctor?.avatar} 
                    className="object-cover object-top"
                  />
                  <AvatarFallback className="text-sm font-semibold">
                    {selectedDoctor?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-base sm:text-lg font-semibold">{selectedDoctor?.name}</h2>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                      Онлайн
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground hidden sm:block">{selectedDoctor?.specialty}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-lg">
                  <Wifi className="w-3 h-3 text-green-500" />
                  <span className="text-xs font-medium capitalize">{callState.connectionQuality}</span>
                </div>
                
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-lg">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs font-medium">{formatTime(callState.callDuration)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-2 sm:px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4">
            {/* Основное видео */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden bg-black shadow-2xl border-0 video-container">
                <div className="video-content">
                <div className="relative aspect-video">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                    style={{ transform: 'scaleX(-1)' }} // Зеркальное отображение как в Skype
                    onLoadStart={() => console.log('📹 Видео начало загружаться')}
                    onLoadedMetadata={() => console.log('📹 Метаданные видео загружены')}
                    onCanPlay={() => console.log('📹 Видео готово к воспроизведению')}
                    onPlay={() => console.log('▶️ Видео воспроизводится')}
                    onError={(e) => console.error('❌ Ошибка видео:', e)}
                  />
                  
                  {/* Индикатор ожидания подключения */}
                  {callState.isConnecting && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80 flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center text-white">
                        <div className="relative mb-6">
                          <div className="w-20 h-20 mx-auto border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Phone className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Подключение к врачу...</h3>
                        <p className="text-blue-100 mb-4">Др. {selectedDoctor?.name}</p>
                        <div className="flex justify-center">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Наложение для демонстрации симптомов */}
                  {showSymptomDemo && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80 flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center text-white">
                        <div className="relative">
                          <Activity className="w-16 h-16 mx-auto mb-4 animate-pulse text-blue-300" />
                          <div className="absolute inset-0 w-16 h-16 mx-auto bg-blue-500/20 rounded-full animate-ping"></div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">AI Анализ симптомов</h3>
                        <p className="text-blue-100">Анализируем состояние питомца...</p>
                        <div className="mt-3 flex justify-center">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Индикаторы состояния */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {callState.isVideoOn && streamRef.current && streamRef.current.getVideoTracks().length > 0 ? (
                      <Badge variant="secondary" className="bg-green-500 text-white shadow-lg text-xs px-2 py-1">
                        <Video className="w-3 h-3 mr-1" />
                        Камера включена
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-red-500 text-white shadow-lg text-xs px-2 py-1">
                        <VideoOff className="w-3 h-3 mr-1" />
                        Камера выключена
                      </Badge>
                    )}
                    {!callState.isAudioOn && (
                      <Badge variant="secondary" className="bg-red-500 text-white shadow-lg text-xs px-2 py-1">
                        <MicOff className="w-3 h-3 mr-1" />
                        Микрофон выключен
                      </Badge>
                    )}
                    {callState.isAudioOn && (
                      <Badge variant="secondary" className="bg-green-500 text-white shadow-lg text-xs px-2 py-1">
                        <Mic className="w-3 h-3 mr-1" />
                        Микрофон включен
                      </Badge>
                    )}
                  </div>

                </div>
                </div>
              </Card>

              {/* Панель управления */}
              <Card className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 shadow-lg">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <Button
                    variant={callState.isVideoOn ? "default" : "destructive"}
                    size="sm"
                    onClick={toggleVideo}
                    className="rounded-full w-10 h-10 shadow-md hover:shadow-lg transition-all duration-200"
                    title="Камера"
                  >
                    {callState.isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={toggleCamera}
                    disabled={!callState.isVideoOn}
                    className="rounded-full w-10 h-10 shadow-md hover:shadow-lg transition-all duration-200 bg-blue-500 hover:bg-blue-600 text-white"
                    title="Переключить камеру"
                  >
                    <FlipHorizontal className="w-4 h-4" />
                  </Button>
                  
                  
                  <Button
                    variant={callState.isAudioOn ? "default" : "destructive"}
                    size="sm"
                    onClick={toggleAudio}
                    className="rounded-full w-10 h-10 shadow-md hover:shadow-lg transition-all duration-200"
                    title="Микрофон"
                  >
                    {callState.isAudioOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openChat(selectedDoctor)}
                    className="rounded-full w-10 h-10 shadow-md hover:shadow-lg transition-all duration-200 bg-green-500 hover:bg-green-600 text-white"
                    title="Чат"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={endCall}
                    className="rounded-full w-10 h-10 shadow-md hover:shadow-lg transition-all duration-200"
                    title="Завершить"
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </div>

            {/* Боковая панель */}
            <div className="space-y-2 sm:space-y-3">
              {/* Анализ симптомов */}
              {symptomAnalysis && (
                <Card className="p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <h3 className="font-semibold text-sm">AI Анализ</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Уверенность</span>
                        <span>{symptomAnalysis.confidence}%</span>
                      </div>
                      <Progress value={symptomAnalysis.confidence} className="h-1" />
                    </div>
                    
                    <div>
                      <p className="text-xs font-medium mb-1">Обнаруженные симптомы:</p>
                      <div className="space-y-1">
                        {symptomAnalysis.detected.map((symptom, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs font-medium mb-1">Рекомендации:</p>
                      <div className="space-y-1">
                        {symptomAnalysis.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start gap-2 text-xs">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <AlertCircle className={`w-3 h-3 ${
                          symptomAnalysis.urgency === 'high' ? 'text-red-500' :
                          symptomAnalysis.urgency === 'medium' ? 'text-yellow-500' : 'text-green-500'
                        }`} />
                        <span className="text-xs font-medium capitalize">
                          Срочность: {symptomAnalysis.urgency}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Информация о враче */}
              <Card className="p-3">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage 
                      src={selectedDoctor?.avatar} 
                      className="object-cover object-top"
                    />
                    <AvatarFallback className="text-xs font-semibold">
                      {selectedDoctor?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-sm">{selectedDoctor?.name}</h4>
                    <p className="text-xs text-muted-foreground">{selectedDoctor?.specialty}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Опыт:</span>
                    <span className="font-medium">{selectedDoctor?.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Рейтинг:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{selectedDoctor?.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>Статус:</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Онлайн
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Быстрые действия */}
              <Card className="p-3">
                <h4 className="font-semibold text-sm mb-3">Быстрые действия</h4>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs h-8"
                    onClick={() => setIsChatOpen(true)}
                  >
                    <MessageCircle className="w-3 h-3 mr-2" />
                    Отправить сообщение
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs h-8"
                    onClick={() => {
                      toast.success('Ссылка скопирована!', {
                        description: 'Запись консультации доступна по ссылке'
                      });
                    }}
                  >
                    <Share className="w-3 h-3 mr-2" />
                    Поделиться записью
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-xs h-8"
                    onClick={() => {
                      toast.success('Отчет скачивается...', {
                        description: 'PDF с анализом симптомов будет загружен'
                      });
                    }}
                  >
                    <Download className="w-3 h-3 mr-2" />
                    Скачать отчет
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Чат окно */}
        {isChatOpen && currentDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4" onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeChat();
            }
          }}>
            <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-sm h-[60vh] max-h-[500px] overflow-hidden flex flex-col shadow-2xl">
              {/* Заголовок чата */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-green-500 text-white">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage 
                      src={currentDoctor?.avatar} 
                      className="object-cover object-top"
                    />
                    <AvatarFallback className="text-xs bg-white text-green-500">
                      {currentDoctor?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm">{currentDoctor?.name}</h3>
                    <p className="text-xs text-green-100">В сети</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsChatOpen(false)}
                  className="h-8 w-8 p-0 text-white hover:bg-green-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Сообщения */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`px-3 py-2 rounded-lg text-sm ${
                        message.sender === 'user' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                      }`}>
                        {message.text}
                      </div>
                      <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span>{formatChatTime(message.timestamp)}</span>
                        {message.sender === 'user' && (
                          <div className="ml-1">
                            {getMessageStatusIcon(message.status)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            {/* Поле ввода */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 relative flex-shrink-0">
              {/* Эмодзи пикер */}
              {showEmojiPicker && (
                <div className="absolute bottom-12 left-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-2 shadow-lg z-10">
                  <div className="grid grid-cols-6 gap-2">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEmojiClick(emoji);
                        }}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileUpload();
                  }}
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && newMessage.trim()) {
                        sendMessage();
                      }
                    }}
                    placeholder="Введите сообщение..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEmojiPicker(!showEmojiPicker);
                  }}
                >
                  <Smile className="w-4 h-4" />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (newMessage.trim()) {
                      sendMessage();
                    }
                  }}
                  disabled={!newMessage.trim()}
                  className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-300"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            </div>
          </div>
        )}
        
        {/* Полноэкранные кнопки управления */}
        <div className="fullscreen-controls" style={{display: 'none', position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: '10000'}}>
          <div className="flex items-center gap-3 bg-black/90 backdrop-blur-sm rounded-full px-6 py-4 shadow-2xl border border-white/20">
            <Button
              variant={callState.isVideoOn ? "default" : "destructive"}
              size="sm"
              onClick={toggleVideo}
              className="rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-200"
              title="Камера"
            >
              {callState.isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleCamera}
              disabled={!callState.isVideoOn}
              className="rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-200 bg-blue-500 hover:bg-blue-600 text-white"
              title="Переключить камеру"
            >
              <FlipHorizontal className="w-5 h-5" />
            </Button>
            
            
            <Button
              variant={callState.isAudioOn ? "default" : "destructive"}
              size="sm"
              onClick={toggleAudio}
              className="rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-200"
              title="Микрофон"
            >
              {callState.isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={() => openChat(selectedDoctor)}
              className="rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-200 bg-green-500 hover:bg-green-600 text-white"
              title="Чат"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={endCall}
              className="rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-200"
              title="Завершить"
            >
              <Phone className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Список врачей
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-16 ios-scroll-fix">
      <div className="max-w-6xl mx-auto p-4">
        {/* Заголовок */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Video className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-xl font-bold">Телемедицина</h1>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Профессиональные видеоконсультации с ветеринарами в реальном времени. 
            AI-анализ симптомов, запись консультаций и многое другое.
          </p>
        </div>

        {/* Преимущества */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center">
            <Video className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Видеозвонки HD</h3>
            <p className="text-sm text-muted-foreground">Качественная связь 1080p</p>
          </Card>
          <Card className="p-4 text-center">
            <Activity className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">AI Анализ</h3>
            <p className="text-sm text-muted-foreground">Умное распознавание симптомов</p>
          </Card>
          <Card className="p-4 text-center">
            <Download className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Запись</h3>
            <p className="text-sm text-muted-foreground">Сохранение консультаций</p>
          </Card>
        </div>

        {/* Тест камеры */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Video className="w-5 h-5 text-blue-500" />
            Тест камеры
          </h3>
          <div className="space-y-4">
            <Button 
              onClick={async () => {
                console.log('🧪 Тестируем камеру...');
                
                // Проверяем поддержку камеры
                const cameraSupported = await checkCameraSupport();
                if (!cameraSupported) {
                  return;
                }
                
                try {
                  const constraints = {
                    video: {
                      width: { ideal: 1280, min: 640 },
                      height: { ideal: 720, min: 480 },
                      facingMode: 'user',
                      frameRate: { ideal: 30, min: 15 }
                    },
                    audio: false
                  };
                  
                  console.log('📋 Тестовые ограничения:', constraints);
                  const stream = await navigator.mediaDevices.getUserMedia(constraints);
                  
                  console.log('✅ Тест камеры успешен:', stream);
                  console.log('📹 Видео треки:', stream.getVideoTracks());
                  
                  // Получаем информацию о камере
                  const videoTrack = stream.getVideoTracks()[0];
                  if (videoTrack) {
                    const settings = videoTrack.getSettings();
                    console.log('📹 Настройки камеры:', settings);
                    
                    toast.success('Камера работает отлично!', {
                      description: `Разрешение: ${settings.width}x${settings.height}, FPS: ${settings.frameRate}`
                    });
                  } else {
                    toast.success('Камера работает!', {
                      description: 'Доступ к камере получен успешно'
                    });
                  }
                  
                  // Останавливаем тестовый поток
                  stream.getTracks().forEach(track => track.stop());
                } catch (error) {
                  console.error('❌ Тест камеры не удался:', error);
                  
                  let errorMessage = 'Ошибка доступа к камере';
                  let errorDescription = error.message;
                  
                  if (error.name === 'NotAllowedError') {
                    errorMessage = 'Доступ к камере запрещен';
                    errorDescription = 'Разрешите доступ к камере в настройках браузера';
                  } else if (error.name === 'NotFoundError') {
                    errorMessage = 'Камера не найдена';
                    errorDescription = 'Подключите камеру и попробуйте снова';
                  } else if (error.name === 'NotReadableError') {
                    errorMessage = 'Камера используется';
                    errorDescription = 'Закройте другие приложения, использующие камеру';
                  } else if (error.name === 'SecurityError') {
                    errorMessage = 'Ошибка безопасности';
                    errorDescription = 'Требуется HTTPS для доступа к камере';
                  }
                  
                  toast.error(errorMessage, {
                    description: errorDescription
                  });
                }
              }}
              className="w-full"
            >
              <Video className="w-4 h-4 mr-2" />
              Проверить камеру
            </Button>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Нажмите кнопку выше, чтобы проверить доступ к камере перед видеозвонком
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Убедитесь, что сайт открыт по HTTPS</p>
                <p>• Разрешите доступ к камере в браузере</p>
                <p>• Закройте другие приложения, использующие камеру</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Список врачей */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage 
                    src={doctor.avatar} 
                    className="object-cover object-top"
                  />
                  <AvatarFallback className="text-lg font-semibold">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{doctor.name}</h3>
                    {doctor.isOnline ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        Онлайн
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-1"></div>
                        Офлайн
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{doctor.specialty}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{doctor.rating}</span>
                    </div>
                    <span className="text-muted-foreground">{doctor.experience}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => startVideoCall(doctor)}
                    disabled={!doctor.isOnline || isCalling}
                  >
                    <PhoneCall className="w-4 h-4 mr-2" />
                    {isCalling ? 'Подключение...' : 'Видеозвонок'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => openChat(doctor)}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Доступен сейчас</span>
                    <span>От 2500₽/час</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Дополнительная информация */}
        <Card className="mt-8 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Безопасность и конфиденциальность
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Шифрование всех видеозвонков</li>
                <li>• Соответствие GDPR</li>
                <li>• Безопасное хранение записей</li>
                <li>• Конфиденциальность данных</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                Возможности платформы
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• AI-анализ симптомов в реальном времени</li>
                <li>• Запись и сохранение консультаций</li>
                <li>• Мгновенные рекомендации</li>
                <li>• Интеграция с медицинскими картами</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Простой чат */}
      {isChatOpen && currentDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeChat}>
          <div className="bg-white rounded-lg w-full max-w-md h-[500px] flex flex-col shadow-xl">
            {/* Заголовок */}
            <div className="flex items-center justify-between p-4 bg-green-500 text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={currentDoctor.avatar} />
                  <AvatarFallback>{currentDoctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{currentDoctor.name}</h3>
                  <p className="text-xs text-green-100">Онлайн</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={closeChat} className="text-white hover:bg-green-600">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`px-3 py-2 rounded-lg text-sm ${
                      message.sender === 'user' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    }`}>
                      {message.text}
                    </div>
                    <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      <span>{formatChatTime(message.timestamp)}</span>
                      {message.sender === 'user' && (
                        <div className="ml-1">
                          {getMessageStatusIcon(message.status)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Поле ввода */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 relative flex-shrink-0">
              {/* Эмодзи пикер */}
              {showEmojiPicker && (
                <div className="absolute bottom-12 left-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-2 shadow-lg z-10">
                  <div className="grid grid-cols-6 gap-2">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEmojiClick(emoji);
                        }}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFileUpload();
                  }}
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && newMessage.trim()) {
                        sendMessage();
                      }
                    }}
                    placeholder="Введите сообщение..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEmojiPicker(!showEmojiPicker);
                  }}
                >
                  <Smile className="w-4 h-4" />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (newMessage.trim()) {
                      sendMessage();
                    }
                  }}
                  disabled={!newMessage.trim()}
                  className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-300"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Компонент анализатора симптомов */}
      <SymptomAnalyzer
        isActive={showSymptomAnalyzer}
        onAnalysisComplete={handleSymptomAnalysisComplete}
        onClose={() => setShowSymptomAnalyzer(false)}
      />
    </div>
  );
};

export default Telemedicine;
