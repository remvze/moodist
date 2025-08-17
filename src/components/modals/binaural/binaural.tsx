import { useEffect, useState, useRef, useCallback } from 'react';

import { Modal } from '@/components/modal';
import { Slider } from '@/components/slider';

import styles from './binaural.module.css';

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

interface BinauralProps {
  onClose: () => void;
  show: boolean;
}

interface Preset {
  baseFrequency: number;
  beatFrequency: number;
  name: string;
}

const presets: Preset[] = [
  { baseFrequency: 100, beatFrequency: 2, name: 'Delta (Deep Sleep) 2 Hz' },
  { baseFrequency: 100, beatFrequency: 5, name: 'Theta (Meditation) 5 Hz' },
  { baseFrequency: 100, beatFrequency: 10, name: 'Alpha (Relaxation) 10 Hz' },
  { baseFrequency: 100, beatFrequency: 20, name: 'Beta (Focus) 20 Hz' },
  { baseFrequency: 100, beatFrequency: 40, name: 'Gamma (Cognition) 40 Hz' },
  { baseFrequency: 440, beatFrequency: 10, name: 'Custom' },
];

function computeBinauralBeatOscillatorFrequencies(
  baseFrequency: number,
  beatFrequency: number,
) {
  return {
    leftFrequency: baseFrequency - beatFrequency / 2,
    rightFrequency: baseFrequency + beatFrequency / 2,
  };
}

export function BinauralModal({ onClose, show }: BinauralProps) {
  const [baseFrequency, setBaseFrequency] = useState<number>(440); // Default to A4 note
  const [beatFrequency, setBeatFrequency] = useState<number>(10); // Default to 10 Hz difference
  const [volume, setVolume] = useState<number>(0.5); // Default volume at 50%
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('Custom');
  const [currentLang, setCurrentLang] = useState('en');

  const audioContextRef = useRef<AudioContext | null>(null);
  const leftOscillatorRef = useRef<OscillatorNode | null>(null);
  const rightOscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

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

  const startSound = () => {
    if (isPlaying) return;

    // Initialize the AudioContext
    audioContextRef.current = new window.AudioContext();
    const audioContext = audioContextRef.current;

    if (!audioContext) return;

    // Create a gain node for volume control
    gainNodeRef.current = audioContext.createGain();
    gainNodeRef.current.gain.value = volume; // Set volume based on state

    // Create oscillators for left and right channels
    leftOscillatorRef.current = audioContext.createOscillator();
    rightOscillatorRef.current = audioContext.createOscillator();

    if (
      !leftOscillatorRef.current ||
      !rightOscillatorRef.current ||
      !gainNodeRef.current
    )
      return;

    const { leftFrequency, rightFrequency } =
      computeBinauralBeatOscillatorFrequencies(baseFrequency, beatFrequency);
    leftOscillatorRef.current.frequency.value = leftFrequency;
    rightOscillatorRef.current.frequency.value = rightFrequency;

    // Pan oscillators to left and right
    const leftPanner = audioContext.createStereoPanner();
    leftPanner.pan.value = -1;

    const rightPanner = audioContext.createStereoPanner();
    rightPanner.pan.value = 1;

    // Connect nodes
    leftOscillatorRef.current.connect(leftPanner).connect(gainNodeRef.current);
    rightOscillatorRef.current
      .connect(rightPanner)
      .connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContext.destination);

    // Start oscillators
    leftOscillatorRef.current.start();
    rightOscillatorRef.current.start();

    setIsPlaying(true);
  };

  const stopSound = useCallback(() => {
    if (!isPlaying) return;

    // Stop oscillators
    if (leftOscillatorRef.current) {
      leftOscillatorRef.current.stop();
      leftOscillatorRef.current = null;
    }
    if (rightOscillatorRef.current) {
      rightOscillatorRef.current.stop();
      rightOscillatorRef.current = null;
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setIsPlaying(false);
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSound();
    };
  }, [stopSound]);

  // Update volume when volume state changes
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  // Update frequencies when baseFrequency or beatFrequency changes
  useEffect(() => {
    if (leftOscillatorRef.current && rightOscillatorRef.current) {
      const { leftFrequency, rightFrequency } =
        computeBinauralBeatOscillatorFrequencies(baseFrequency, beatFrequency);
      leftOscillatorRef.current.frequency.value = leftFrequency;
      rightOscillatorRef.current.frequency.value = rightFrequency;
    }
  }, [baseFrequency, beatFrequency]);

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedPreset(selected);

    if (selected === 'Custom') {
      // Allow user to input custom frequencies
      return;
    }

    const preset = presets.find(p => p.name === selected);
    if (preset) {
      setBaseFrequency(preset.baseFrequency);
      setBeatFrequency(preset.beatFrequency);
    }
  };

  // 获取本地化文本
  const titleText = currentLang === 'zh' ? '双耳节拍' : 'Binaural Beat';
  const descText = currentLang === 'zh' ? '双耳节拍发生器。' : 'Binaural beat generator.';
  const presetsText = currentLang === 'zh' ? '预设:' : 'Presets:';
  const baseFreqText = currentLang === 'zh' ? '基础频率 (Hz):' : 'Base Frequency (Hz):';
  const beatFreqText = currentLang === 'zh' ? '节拍频率 (Hz):' : 'Beat Frequency (Hz):';
  const volumeText = currentLang === 'zh' ? '音量:' : 'Volume:';
  const startText = currentLang === 'zh' ? '开始' : 'Start';
  const stopText = currentLang === 'zh' ? '停止' : 'Stop';

  // 获取本地化的预设名称
  const getLocalizedPresetName = (preset: Preset) => {
    if (currentLang === 'zh') {
      switch (preset.name) {
        case 'Delta (Deep Sleep) 2 Hz':
          return 'Delta (深度睡眠) 2 Hz';
        case 'Theta (Meditation) 5 Hz':
          return 'Theta (冥想) 5 Hz';
        case 'Alpha (Relaxation) 10 Hz':
          return 'Alpha (放松) 10 Hz';
        case 'Beta (Focus) 20 Hz':
          return 'Beta (专注) 20 Hz';
        case 'Gamma (Cognition) 40 Hz':
          return 'Gamma (认知) 40 Hz';
        case 'Custom':
          return '自定义';
        default:
          return preset.name;
      }
    }
    return preset.name;
  };

  return (
    <Modal show={show} onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.title}>{titleText}</h2>
        <p className={styles.desc}>{descText}</p>
      </header>

      <div className={styles.fieldWrapper}>
        <label>
          {presetsText}
          <select value={selectedPreset} onChange={handlePresetChange}>
            {presets.map(preset => (
              <option key={preset.name} value={preset.name}>
                {getLocalizedPresetName(preset)}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedPreset === 'Custom' && (
        <>
          <div className={styles.fieldWrapper}>
            <label>
              {baseFreqText}
              <input
                max="1500"
                min="20"
                step="0.1"
                type="number"
                value={baseFrequency}
                onChange={e =>
                  setBaseFrequency(parseFloat(e.target.value || '0'))
                }
              />
            </label>
          </div>
          <div className={styles.fieldWrapper}>
            <label>
              {beatFreqText}
              <input
                max="40"
                min="0.1"
                step="0.01"
                type="number"
                value={beatFrequency}
                onChange={e =>
                  setBeatFrequency(parseFloat(e.target.value || '0'))
                }
              />
            </label>
          </div>
        </>
      )}
      <div className={styles.fieldWrapper}>
        <label>
          {volumeText}
          <Slider
            className={styles.volume}
            max={1}
            min={0}
            step={0.01}
            value={volume}
            onChange={value => setVolume(value)}
          />
        </label>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.primary}
          disabled={isPlaying}
          onClick={startSound}
        >
          {startText}
        </button>
        <button disabled={!isPlaying} onClick={stopSound}>
          {stopText}
        </button>
      </div>
    </Modal>
  );
}
