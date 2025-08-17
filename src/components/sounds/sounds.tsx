import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { Sound } from './sound';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/helpers/styles';
import { fade, mix, scale } from '@/lib/motion';

import styles from './sounds.module.css';

import type { Sound as SoundType } from '@/data/types';

interface SoundsProps {
  functional: boolean;
  id: string;
  sounds: SoundType[];
}

// 安全地获取localStorage
function getLocalStorageItem(key: string, defaultValue: string = 'en'): string {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      return localStorage.getItem(key) || defaultValue;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}

export function Sounds({ functional, id, sounds }: SoundsProps) {
  const [currentLang, setCurrentLang] = useState('en');
  const [showAll, setShowAll] = useLocalStorage(`${id}-show-more`, false);
  const [clickedMore, setClickedMore] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);

  const firstNewSound = useRef<HTMLDivElement>(null);

  // 在客户端初始化语言
  useEffect(() => {
    const lang = getLocalStorageItem('moodist-language');
    setCurrentLang(lang);
    
    // 监听语言变化
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail.language);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (showAll && clickedMore) {
      firstNewSound.current?.focus();
      setClickedMore(false);
    }
  }, [showAll, clickedMore]);

  const showMoreButton = useRef<HTMLButtonElement>(null);

  const [hiddenSelections, setHiddenSelections] = useState<{
    [key: string]: boolean;
  }>({});

  const hasHiddenSelection = useMemo(() => {
    const keys = Object.keys(hiddenSelections);

    return keys.some(key => hiddenSelections[key]);
  }, [hiddenSelections]);

  const selectHidden = useCallback((key: string) => {
    setHiddenSelections(prev => ({
      ...prev,
      [key]: true,
    }));
  }, []);

  const unselectHidden = useCallback((key: string) => {
    setHiddenSelections(prev => ({
      ...prev,
      [key]: false,
    }));
  }, []);

  const toggleMore = () => {
    if (!isAnimating) {
      setShowAll(prev => !prev);
      setClickedMore(true);
    }
  };

  const variants = mix(fade(), scale(0.9));

  // 获取本地化文本
  const showMoreText = currentLang === 'zh' ? '显示更多' : 'Show More';
  const showLessText = currentLang === 'zh' ? '收起' : 'Show Less';

  return (
    <div>
      <div className={styles.sounds}>
        {sounds.map((sound, index) => (
          <Sound
            key={sound.label}
            {...sound}
            functional={functional}
            hidden={!showAll && index > 5}
            ref={index === 6 ? firstNewSound : undefined}
            selectHidden={selectHidden}
            unselectHidden={unselectHidden}
          />
        ))}

        {sounds.length < 2 &&
          new Array(2 - sounds.length)
            .fill(null)
            .map((_, index) => <div key={index} />)}
      </div>

      {sounds.length > 6 && (
        <button
          ref={showMoreButton}
          className={cn(
            styles.button,
            hasHiddenSelection && !showAll && styles.active,
          )}
          onClick={toggleMore}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              animate="show"
              exit="hidden"
              initial="hidden"
              key={showAll ? `${id}-show-less` : `${id}-show-more`}
              variants={variants}
              onAnimationComplete={() => setIsAnimating(false)}
              onAnimationStart={() => setIsAnimating(true)}
            >
              {showAll ? showLessText : showMoreText}
            </motion.span>
          </AnimatePresence>
        </button>
      )}
    </div>
  );
}
