import { createContext, useContext, useState, useCallback } from 'react';

export const PlayContext = createContext({
  isPlaying: false,
  pause: () => {},
  play: () => {},
  toggle: () => {},
});

export const usePlay = () => useContext(PlayContext);

interface PlayProviderProps {
  children: React.ReactNode;
}

export function PlayProvider({ children }: PlayProviderProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const toggle = useCallback(
    () => (isPlaying ? pause() : play()),
    [isPlaying, play, pause],
  );

  return (
    <PlayContext.Provider value={{ isPlaying, pause, play, toggle }}>
      {children}
    </PlayContext.Provider>
  );
}
