import { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/modal';
import { Slider } from '@/components/slider';

import styles from './binaural.module.css';

interface BinauralProps {
  onClose: () => void;
  show: boolean;
}

interface Preset {
  baseFrequency: number;
  beatFrequency: number;
  name: string;
  translationKey: string;
}

const presets: Preset[] = [
  {
    baseFrequency: 100,
    beatFrequency: 2,
    name: 'Delta (Deep Sleep) 2 Hz',
    translationKey: 'modals.generators.presets.delta',
  },
  {
    baseFrequency: 100,
    beatFrequency: 5,
    name: 'Theta (Meditation) 5 Hz',
    translationKey: 'modals.generators.presets.theta',
  },
  {
    baseFrequency: 100,
    beatFrequency: 10,
    name: 'Alpha (Relaxation) 10 Hz',
    translationKey: 'modals.generators.presets.alpha',
  },
  {
    baseFrequency: 100,
    beatFrequency: 20,
    name: 'Beta (Focus) 20 Hz',
    translationKey: 'modals.generators.presets.beta',
  },
  {
    baseFrequency: 100,
    beatFrequency: 40,
    name: 'Gamma (Cognition) 40 Hz',
    translationKey: 'modals.generators.presets.gamma',
  },
  {
    baseFrequency: 440,
    beatFrequency: 10,
    name: 'Custom',
    translationKey: 'modals.generators.presets.custom',
  },
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
  const { t } = useTranslation();
  const [baseFrequency, setBaseFrequency] = useState<number>(440); // Default to A4 note
  const [beatFrequency, setBeatFrequency] = useState<number>(10); // Default to 10 Hz difference
  const [volume, setVolume] = useState<number>(0.5); // Default volume at 50%
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('Custom');

  const audioContextRef = useRef<AudioContext | null>(null);
  const leftOscillatorRef = useRef<OscillatorNode | null>(null);
  const rightOscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

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

    leftOscillatorRef.current?.stop();
    rightOscillatorRef.current?.stop();
    audioContextRef.current?.close();

    setIsPlaying(false);
  }, [isPlaying]);

  useEffect(() => {
    // Update gain node when volume changes
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  useEffect(() => {
    // Update base frequency for both left and right oscillators when it changes
    if (leftOscillatorRef.current && rightOscillatorRef.current) {
      const { leftFrequency, rightFrequency } =
        computeBinauralBeatOscillatorFrequencies(baseFrequency, beatFrequency);
      leftOscillatorRef.current.frequency.value = leftFrequency;
      rightOscillatorRef.current.frequency.value = rightFrequency;
    }
  }, [baseFrequency, beatFrequency]);

  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      if (isPlaying) {
        stopSound();
      }
    };
  }, [isPlaying, stopSound]);

  useEffect(() => {
    // Update frequencies when a preset is selected
    if (selectedPreset !== 'Custom') {
      const preset = presets.find(p => p.name === selectedPreset);
      if (preset) {
        setBaseFrequency(preset.baseFrequency);
        setBeatFrequency(preset.beatFrequency);
      }
    }
  }, [selectedPreset]);

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setSelectedPreset(selectedName);

    if (selectedName === 'Custom') {
      return;
    }

    const preset = presets.find(p => p.name === selectedName);
    if (preset) {
      setBaseFrequency(preset.baseFrequency);
      setBeatFrequency(preset.beatFrequency);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.title}>{t('modals.binaural.title')}</h2>
        <p className={styles.desc}>{t('modals.binaural.description')}</p>
      </header>

      <div className={styles.fieldWrapper}>
        <label>
          {t('modals.generators.presets-label')}
          <select value={selectedPreset} onChange={handlePresetChange}>
            {presets.map(preset => (
              <option key={preset.name} value={preset.name}>
                {t(preset.translationKey)}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedPreset === 'Custom' && (
        <>
          <div className={styles.fieldWrapper}>
            <label>
              {t('modals.generators.base-frequency-label')}
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
              {t('modals.binaural.beat-frequency-label')}
              <input
                max="40"
                min="0.1"
                step="0.1"
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
          {t('modals.generators.volume-label')}
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
          {t('common.start')}
        </button>
        <button disabled={!isPlaying} onClick={stopSound}>
          {t('common.stop')}
        </button>
      </div>
    </Modal>
  );
}
