import React, { useEffect, useRef, useState } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [awaitingUserInteraction, setAwaitingUserInteraction] = useState(true);

  useEffect(() => {
    // Проверяем, была ли уже музыка в этой сессии
    const musicPlayed = sessionStorage.getItem('musicPlayed');
    if (musicPlayed) {
      setHasPlayed(true);
      setAwaitingUserInteraction(false);
      return;
    }

    const playMusic = async () => {
      if (audioRef.current && !hasPlayed && awaitingUserInteraction) {
        try {
          audioRef.current.volume = 0.3;
          await audioRef.current.play();
          setIsPlaying(true);
          setHasPlayed(true);
          setAwaitingUserInteraction(false);
          sessionStorage.setItem('musicPlayed', 'true');
          
          // Удаляем все listeners после успешного воспроизведения
          ['click', 'keydown', 'touchstart'].forEach(event => {
            document.removeEventListener(event, playMusic);
          });
        } catch (error) {
          console.log('Audio playback failed:', error);
        }
      }
    };

    // Ждём только пользовательского взаимодействия (без autoplay)
    const events = ['click', 'keydown', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, playMusic, { 
        once: true, 
        passive: true 
      });
    });

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, playMusic);
      });
    };
  }, []); // Убрали все зависимости кроме пустого массива

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const toggleMusic = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Toggle play failed:', error);
        }
      }
    }
  };

  // Показываем кнопку ожидания, если не было взаимодействия
  if (awaitingUserInteraction) {
    return (
      <>
        <audio
          ref={audioRef}
          src="/terminator.mp3"
          onEnded={handleEnded}
          preload="auto"
        />
        <button
          onClick={() => {
            // Принудительно запускаем после клика по кнопке
            const playMusic = async () => {
              if (audioRef.current && !hasPlayed) {
                try {
                  audioRef.current.volume = 0.3;
                  await audioRef.current.play();
                  setIsPlaying(true);
                  setHasPlayed(true);
                  setAwaitingUserInteraction(false);
                  sessionStorage.setItem('musicPlayed', 'true');
                } catch (error) {
                  console.log('Button play failed:', error);
                }
              }
            };
            playMusic();
          }}
          className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 backdrop-blur-sm border-2 border-white/30 animate-pulse"
          title="Click to enable music"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="rotate-0 group-hover:rotate-180 transition-transform duration-300"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.74 12.71l6.36-6.36-6.36-6.36"></path>
            <path d="M20.27 6.27L23.73 9.73l-6.36 6.36"></path>
          </svg>
        </button>
      </>
    );
  }

  // Скрываем контрол если музыка закончилась и не играет
  if (hasPlayed && !isPlaying) {
    return null;
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/terminator.mp3"
        onEnded={handleEnded}
        preload="auto"
      />
      <button
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 z-50 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/20"
        title={isPlaying ? "Mute music" : "Play music"}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {isPlaying ? (
            <>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </>
          ) : (
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          )}
        </svg>
      </button>
    </>
  );
};

export default BackgroundMusic;

