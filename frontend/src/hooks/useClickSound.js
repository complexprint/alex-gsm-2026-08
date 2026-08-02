import { useCallback, useRef } from 'react';

const useClickSound = () => {
  const audioRef = useRef(null);

  const playClickSound = useCallback(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio('/button-click-dry-muted.mp3');
      audioRef.current.volume = 0.5;
    }
    
    // Reset and play
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((error) => {
      // Silently fail if autoplay is blocked
      console.log('Click sound blocked:', error);
    });
  }, []);

  return playClickSound;
};

export default useClickSound;
