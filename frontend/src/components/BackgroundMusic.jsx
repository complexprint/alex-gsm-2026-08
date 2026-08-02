import React, { useEffect, useRef, useState } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check if music has already been played in this session
    const musicPlayed = sessionStorage.getItem('musicPlayed');
    if (musicPlayed) {
      setHasPlayed(true);
      return;
    }

    const playMusic = () => {
      if (audioRef.current && !hasPlayed) {
        audioRef.current.volume = 0.3; // Set volume to 30%
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasPlayed(true);
            sessionStorage.setItem('musicPlayed', 'true');
            // Remove event listeners after successful play
            document.removeEventListener('click', playMusic);
            document.removeEventListener('keydown', playMusic);
            document.removeEventListener('scroll', playMusic);
            document.removeEventListener('touchstart', playMusic);
          })
          .catch((error) => {
            console.log('Audio playback failed:', error);
          });
      }
    };

    // Try to autoplay first (some browsers allow it)
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasPlayed(true);
          sessionStorage.setItem('musicPlayed', 'true');
        })
        .catch(() => {
          // Autoplay blocked, wait for user interaction
          document.addEventListener('click', playMusic, { once: true });
          document.addEventListener('keydown', playMusic, { once: true });
          document.addEventListener('scroll', playMusic, { once: true });
          document.addEventListener('touchstart', playMusic, { once: true });
        });
    }

    return () => {
      document.removeEventListener('click', playMusic);
      document.removeEventListener('keydown', playMusic);
      document.removeEventListener('scroll', playMusic);
      document.removeEventListener('touchstart', playMusic);
    };
  }, [hasPlayed]);

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  if (hasPlayed && !isPlaying) {
    return null; // Hide control after music finished
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/terminator.mp3"
        onEnded={handleEnded}
        preload="auto"
      />
      {isPlaying && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-4 right-4 z-50 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/20"
          title="Mute music"
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
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        </button>
      )}
    </>
  );
};

export default BackgroundMusic;
