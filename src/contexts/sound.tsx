import React, { createContext, useContext, useEffect, useState } from 'react';
import { Howler } from 'howler';

// Define the context's interface
interface SoundContextType {
  connectBufferSource: (bufferSource: AudioBufferSourceNode) => void;
}

// Create the SoundContext with an empty initial value
const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Custom hook to use the SoundContext
export const useSoundContext = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
};

// Props for the SoundProvider component
interface SoundProviderProps {
  children: React.ReactNode;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  const [dest, setDest] = useState<MediaStreamAudioDestinationNode | null>(
    null,
  );
  const [audioTag, setAudioTag] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get the Howler.js AudioContext after the component is mounted
      const audioCtx = Howler.ctx;

      if (audioCtx) {
        const mediaDest = audioCtx.createMediaStreamDestination();
        setDest(mediaDest);

        // Create an audio element to trick iOS
        const audioElement = document.createElement('audio');
        audioElement.srcObject = mediaDest.stream;
        audioElement.style.display = 'none'; // Hide the audio element
        document.body.appendChild(audioElement);
        setAudioTag(audioElement);

        return () => {
          // Clean up the audio element on unmount
          document.body.removeChild(audioElement);
        };
      }
    }
  }, []);

  // Function to connect a buffer source to the MediaStreamDestination
  const connectBufferSource = (bufferSource: AudioBufferSourceNode) => {
    if (dest) {
      bufferSource.connect(dest);

      // Start playing the audio once the first buffer connects
      if (audioTag && audioTag.paused) {
        audioTag.play().catch(() => console.error('Failed to play audio'));
      }
    }
  };

  return (
    <SoundContext.Provider value={{ connectBufferSource }}>
      {children}
    </SoundContext.Provider>
  );
};
