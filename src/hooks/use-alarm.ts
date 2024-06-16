import { useCallback } from 'react';

import { useSound } from './use-sound';
import { useAlarmStore } from '@/stores/alarm';

export function useAlarm() {
  const { play: playSound } = useSound(
    '/sounds/alarm.mp3',
    { volume: 1 },
    true,
  );
  const isPlaying = useAlarmStore(state => state.isPlaying);
  const play = useAlarmStore(state => state.play);
  const stop = useAlarmStore(state => state.stop);

  const playAlarm = useCallback(() => {
    if (!isPlaying) {
      playSound(stop);
      play();
    }
  }, [isPlaying, playSound, play, stop]);

  return playAlarm;
}
