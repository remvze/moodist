import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

import { Modal } from '@/components/modal/modal';

import styles from './lofi.module.css';
import { padNumber } from '@/helpers/number';

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

interface LofiProps {
  onClose: () => void;
  show: boolean;
}

const videos = [
  {
    channel: 'Lofi Girl',
    id: 'jfKfPfyJRdk',
    title: 'lofi hip hop radio',
  },
  {
    channel: 'Lofi Girl',
    id: '4xDzrJKXOOY',
    title: 'synthwave radio',
  },
  {
    channel: 'Lofi Girl',
    id: 'P6Segk8cr-c',
    title: 'sad lofi radio',
  },
  {
    channel: 'Lofi Girl',
    id: 'S_MOd40zlYU',
    title: 'dark ambient radio',
  },
  {
    channel: 'Lofi Girl',
    id: 'TtkFsfOP9QI',
    title: 'peaceful piano radio',
  },
];

export function LofiModal({ onClose, show }: LofiProps) {
  const [isAccepted, setIsAccepted] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

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

  // 获取本地化文本
  const titleText = currentLang === 'zh' ? 'Lofi音乐播放器' : 'Lofi Music Player';
  const noticeText = currentLang === 'zh' 
    ? '此功能使用嵌入式YouTube视频播放音乐。继续使用即表示您同意连接到YouTube，YouTube可能会根据其隐私政策收集数据。我们不控制或跟踪这些数据。'
    : 'This feature plays music using embedded YouTube videos. By continuing, you agree to connect to YouTube, which may collect data in accordance with their privacy policy. We do not control or track this data.';
  const cancelText = currentLang === 'zh' ? '取消' : 'Cancel';
  const continueText = currentLang === 'zh' ? '继续' : 'Continue';

  return (
    <Modal persist show={show} onClose={onClose}>
      <h1 className={styles.title}>{titleText}</h1>

      {!isAccepted ? (
        <div className={styles.notice}>
          <p>{noticeText}</p>

          <div className={styles.buttons}>
            <button onClick={onClose}>{cancelText}</button>
            <button
              className={styles.primary}
              onClick={() => setIsAccepted(true)}
            >
              {continueText}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.videos}>
          {videos.map((video, index) => (
            <div className={styles.video} key={video.id}>
              <h2>
                <span className={styles.index}>{padNumber(index + 1, 2)}</span>{' '}
                <strong>{video.channel}</strong> <span>/</span> {video.title}
              </h2>
              <div className={styles.container}>
                <YouTube iframeClassName={styles.iframe} videoId={video.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
