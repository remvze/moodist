import { useMemo, useEffect, useState } from 'react';
import { IoCopyOutline, IoCheckmark } from 'react-icons/io5/index';

import { Modal } from '@/components/modal';

import { useCopy } from '@/hooks/use-copy';
import { useSoundStore } from '@/stores/sound';

import styles from './share-link.module.css';

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

interface ShareLinkModalProps {
  onClose: () => void;
  show: boolean;
}

export function ShareLinkModal({ onClose, show }: ShareLinkModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const sounds = useSoundStore(state => state.sounds);
  const { copy, copying } = useCopy();

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

  const selected = useMemo(() => {
    return Object.keys(sounds)
      .map(sound => ({
        id: sound,
        isSelected: sounds[sound].isSelected,
        volume: sounds[sound].volume.toFixed(2),
      }))
      .filter(sound => sound.isSelected);
  }, [sounds, JSON.stringify(sounds)]); // eslint-disable-line

  const string = useMemo(() => {
    const object: Record<string, number> = {};

    selected.forEach(sound => {
      object[sound.id] = Number(sound.volume);
    });

    return JSON.stringify(object);
  }, [selected]);

  const url = useMemo(() => {
    if (!isMounted)
      return `https://moodist.app/?share=${encodeURIComponent(string)}`;

    return `${window.location.protocol}//${
      window.location.host
    }/?share=${encodeURIComponent(string)}`;
  }, [string, isMounted]);

  useEffect(() => setIsMounted(true), []);

  // 获取本地化文本
  const headingText = currentLang === 'zh' ? '分享您的音效选择！' : 'Share your sound selection!';
  const descText = currentLang === 'zh' 
    ? '复制以下链接并发送给您想要分享选择的人。'
    : 'Copy and send the following link to the person you want to share your selection with.';

  return (
    <Modal show={show} onClose={onClose}>
      <h1 className={styles.heading}>{headingText}</h1>
      <p className={styles.desc}>
        {descText}
      </p>
      <div className={styles.inputWrapper}>
        <input readOnly type="text" value={url} />
        <button onClick={() => copy(url)}>
          {copying ? <IoCheckmark /> : <IoCopyOutline />}
        </button>
      </div>
    </Modal>
  );
}
