import { useCallback, useEffect, forwardRef, useMemo } from 'react';
import { ImSpinner9 } from 'react-icons/im/index';

import { Range } from './range';
import { Favorite } from './favorite';
import { RandomSpeed } from './random-speed';

import { useSound } from '@/hooks/use-sound';
import { useSoundStore } from '@/stores/sound';
import { useLoadingStore } from '@/stores/loading';
import { cn } from '@/helpers/styles';

import styles from './sound.module.css';

import type { Sound as SoundType } from '@/data/types';

import { useKeyboardButton } from '@/hooks/use-keyboard-button';

interface SoundProps extends SoundType {
  functional: boolean;
  hidden: boolean;
  selectHidden: (key: string) => void;
  unselectHidden: (key: string) => void;
  displayMode?: boolean; // 新增：展示模式参数
}

export const Sound = forwardRef<HTMLDivElement, SoundProps>(function Sound(
  { functional, hidden, icon, id, label, selectHidden, src, unselectHidden, displayMode = false },
  ref,
) {
  const isPlaying = useSoundStore(state => state.isPlaying);
  const play = useSoundStore(state => state.play);
  const selectSound = useSoundStore(state => state.select);
  const unselectSound = useSoundStore(state => state.unselect);
  const setVolume = useSoundStore(state => state.setVolume);
  const setSpeed = useSoundStore(state => state.setSpeed);
  const setRate = useSoundStore(state => state.setRate);
  const isSelected = useSoundStore(state => state.sounds[id].isSelected);
  const locked = useSoundStore(state => state.locked);

  const volume = useSoundStore(state => state.sounds[id].volume);
  const speed = useSoundStore(state => state.sounds[id].speed);
  const rate = useSoundStore(state => state.sounds[id].rate);
  const isRandomSpeed = useSoundStore(state => state.sounds[id].isRandomSpeed);
  const isRandomVolume = useSoundStore(state => state.sounds[id].isRandomVolume);
  const isRandomRate = useSoundStore(state => state.sounds[id].isRandomRate);
  const globalVolume = useSoundStore(state => state.globalVolume);
  const adjustedVolume = useMemo(
    () => volume * globalVolume,
    [volume, globalVolume],
  );
  const actualPlaybackRate = useMemo(
    () => speed * rate,
    [speed, rate],
  );

  const isLoading = useLoadingStore(state => state.loaders[src]);

  const sound = useSound(src, { loop: true, volume: adjustedVolume, speed: actualPlaybackRate });

  useEffect(() => {
    if (locked) return;

    // 在展示模式下或者功能模式下，只要选中且在播放就应该播放
    const shouldPlay = isSelected && isPlaying && (functional || displayMode);

    if (shouldPlay) {
      sound?.play();
    } else {
      sound?.pause();
    }
  }, [isSelected, sound, isPlaying, functional, displayMode, locked]);

  useEffect(() => {
    if (hidden && isSelected) selectHidden(label);
    else if (hidden && !isSelected) unselectHidden(label);
  }, [label, isSelected, hidden, selectHidden, unselectHidden]);

  // 改进的随机逻辑 - 每次只随机调整一个参数，频率为1分钟
  useEffect(() => {
    const hasAnyRandom = isRandomSpeed || isRandomVolume || isRandomRate;
    const isActiveMode = functional || displayMode;
    if (!hasAnyRandom || !isSelected || !isPlaying || !isActiveMode) return;

    const interval = setInterval(() => {
      // 获取当前启用的随机选项列表
      const randomOptions = [];
      if (isRandomSpeed) randomOptions.push('speed');
      if (isRandomRate) randomOptions.push('rate');
      if (isRandomVolume) randomOptions.push('volume');

      if (randomOptions.length === 0) return;

      // 随机选择一个要调整的参数
      const selectedOption = randomOptions[Math.floor(Math.random() * randomOptions.length)];

      switch (selectedOption) {
        case 'speed': {
          const baseSpeed = 1.0;
          const randomSpeed = Math.random() * 0.5 + baseSpeed - 0.25; // baseSpeed ± 0.25
          const clampedSpeed = Math.max(0.5, Math.min(2.0, randomSpeed));
          setSpeed(id, clampedSpeed);
          break;
        }
        case 'rate': {
          const baseRate = 1.0;
          const randomRate = Math.random() * 0.5 + baseRate - 0.25; // baseRate ± 0.25
          const clampedRate = Math.max(0.5, Math.min(2.0, randomRate));
          setRate(id, clampedRate);
          break;
        }
        case 'volume': {
          const baseVolume = 0.5;
          const randomVolume = Math.random() * 0.4 + baseVolume * 0.3; // 30% - 70% 范围
          const clampedVolume = Math.max(0.0, Math.min(1.0, randomVolume));
          setVolume(id, clampedVolume);
          break;
        }
      }
    }, 60000 + Math.random() * 30000); // 每 60-90 秒更新一次，大约1分钟

    return () => clearInterval(interval);
  }, [isRandomSpeed, isRandomVolume, isRandomRate, isSelected, isPlaying, id, setSpeed, setRate, setVolume]);

  const select = useCallback(() => {
    if (locked) return;
    selectSound(id);
    play();
  }, [selectSound, play, id, locked]);

  const unselect = useCallback(() => {
    if (locked) return;
    unselectSound(id);
    setVolume(id, 0.5);
    setSpeed(id, 1.0);
    setRate(id, 1.0);

    // 确保所有随机模式都被重置
    const { toggleRandomSpeed, toggleRandomVolume, toggleRandomRate } = useSoundStore.getState();
    const sound = useSoundStore.getState().sounds[id];

    if (sound?.isRandomSpeed) toggleRandomSpeed(id);
    if (sound?.isRandomVolume) toggleRandomVolume(id);
    if (sound?.isRandomRate) toggleRandomRate(id);
  }, [unselectSound, setVolume, setSpeed, setRate, id, locked]);

  const toggle = useCallback(() => {
    if (locked) return;
    if (isSelected) unselect();
    else select();
  }, [isSelected, select, unselect, locked]);

  const handleClick = useCallback(() => {
    toggle();
  }, [toggle]);

  const handleKeyDown = useKeyboardButton(() => {
    toggle();
  });

  return (
    <div
      aria-label={`${label} sound`}
      ref={ref}
      role="button"
      tabIndex={0}
      className={cn(
        styles.sound,
        isSelected && styles.selected,
        hidden && styles.hidden,
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.controlsContainer}>
        <Favorite id={id} label={label} />
        <RandomSpeed id={id} label={label} baseSpeed={speed} baseRate={rate} baseVolume={volume} />
      </div>
      <div className={styles.icon}>
        {isLoading ? (
          <span aria-hidden="true" className={styles.spinner}>
            <ImSpinner9 />
          </span>
        ) : (
          <span aria-hidden="true">{icon}</span>
        )}
      </div>
      <div className={styles.label} id={id}>
        {label}
      </div>
      <Range id={id} label={label} />
    </div>
  );
});
