import { FiShuffle } from 'react-icons/fi/index';
import { AnimatePresence, motion } from 'motion/react';

import { useSoundStore } from '@/stores/sound';
import { cn } from '@/helpers/styles';
import { fade } from '@/lib/motion';

import styles from './random-speed.module.css';

import { useKeyboardButton } from '@/hooks/use-keyboard-button';
import { random } from '@/helpers/random';

interface RandomSpeedProps {
  id: string;
  label: string;
  baseSpeed: number;
  baseRate: number;
  baseVolume: number;
}

export function RandomSpeed({ id, label, baseSpeed, baseRate, baseVolume }: RandomSpeedProps) {
  const isRandomSpeed = useSoundStore(state => state.sounds[id].isRandomSpeed);
  const isRandomVolume = useSoundStore(state => state.sounds[id].isRandomVolume);
  const isRandomRate = useSoundStore(state => state.sounds[id].isRandomRate);
  const toggleAllRandom = useSoundStore(state => state.toggleAllRandom);
  const setSpeed = useSoundStore(state => state.setSpeed);
  const setRate = useSoundStore(state => state.setRate);
  const setVolume = useSoundStore(state => state.setVolume);

  const hasAnyRandom = isRandomSpeed || isRandomVolume || isRandomRate;

  const handleToggle = () => {
    toggleAllRandom(id);

    if (!hasAnyRandom) {
      // 启用随机时，立即设置随机值
      if (isRandomSpeed) {
        const randomSpeed = random(baseSpeed - 0.25, baseSpeed + 0.25);
        setSpeed(id, Math.max(0.5, Math.min(2.0, randomSpeed)));
      }
      if (isRandomRate) {
        const randomRate = random(baseRate - 0.25, baseRate + 0.25);
        setRate(id, Math.max(0.5, Math.min(2.0, randomRate)));
      }
      if (isRandomVolume) {
        const randomVolume = random(baseVolume * 0.3, baseVolume * 0.7);
        setVolume(id, Math.max(0.0, Math.min(1.0, randomVolume)));
      }
    } else {
      // 禁用随机时，恢复基础值
      setSpeed(id, baseSpeed);
      setRate(id, baseRate);
      setVolume(id, baseVolume);
    }
  };

  const variants = fade();

  const handleKeyDown = useKeyboardButton(handleToggle);

  return (
    <AnimatePresence initial={false} mode="wait">
      <button
        className={cn(styles.randomSpeedButton, hasAnyRandom && styles.isRandomSpeed)}
        aria-label={
          hasAnyRandom
            ? `Disable Random Effects for ${label} Sound`
            : `Enable Random Effects for ${label} Sound`
        }
        onKeyDown={handleKeyDown}
        onClick={e => {
          e.stopPropagation();
          handleToggle();
        }}
      >
        <motion.span
          animate="show"
          aria-hidden="true"
          exit="hidden"
          initial="hidden"
          key={hasAnyRandom ? `${id}-is-random` : `${id}-not-random`}
          variants={variants}
        >
          <FiShuffle />
        </motion.span>
      </button>
    </AnimatePresence>
  );
}