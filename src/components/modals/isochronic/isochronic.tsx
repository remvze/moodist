import { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/modal';
import { Slider } from '@/components/slider';

import styles from './isochornic.module.css';

interface IsochronicProps {
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

export function IsochronicModal({ onClose, show }: IsochronicProps) {
  const { t } = useTranslation();
  const [baseFrequency, setBaseFrequency] = useState<number>(440); // Default A4 note
  const [beatFrequency, setBeatFrequency] = useState<number>(10); // Default 10 Hz beat
  const [volume, setVolume] = useState<number>(0.5); // Default volume at 50%
  const [waveform] = useState<OscillatorType>('sine'); // Default waveform
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('Custom');

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const beatGainRef = useRef<GainNode | null>(null);
  const modulatorRef = useRef<OscillatorNode | null>(null);

  const startSound = () => {
    if (isPlaying) return;

    audioContextRef.current = new window.AudioContext();
    const audioContext = audioContextRef.current;

    if (!audioContext) return;

    // Main gain node for volume control
    gainNodeRef.current = audioContext.createGain();
    gainNodeRef.current.gain.value = volume;

    // Oscillator for the base tone
    oscillatorRef.current = audioContext.createOscillator();
    oscillatorRef.current.frequency.value = baseFrequency;
    oscillatorRef.current.type = waveform;

    // Gain node to create isochronic beats
    beatGainRef.current = audioContext.createGain();
    beatGainRef.current.gain.value = 0; // Start with silence

    // Oscillator for modulation
    modulatorRef.current = audioContext.createOscillator();
    modulatorRef.current.frequency.value = beatFrequency;
    modulatorRef.current.type = 'square'; // Square wave for on/off effect

    // Modulator gain to adjust modulation depth
    const modulatorGain = audioContext.createGain();
    modulatorGain.gain.value = 0.5; // Modulation depth

    // Connect modulator to the beat gain node
    modulatorRef.current
      .connect(modulatorGain)
      .connect(beatGainRef.current.gain);

    // Connect oscillator through beat gain and main gain to destination
    oscillatorRef.current
      .connect(beatGainRef.current)
      .connect(gainNodeRef.current)
      .connect(audioContext.destination);

    // Start oscillators
    oscillatorRef.current.start();
    modulatorRef.current.start();

    setIsPlaying(true);
  };

  const stopSound = useCallback(() => {
    if (!isPlaying) return;

    oscillatorRef.current?.stop();
    modulatorRef.current?.stop();
    audioContextRef.current?.close();

    setIsPlaying(false);
  }, [isPlaying]);

  useEffect(() => {
    // Update gain when volume changes
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  useEffect(() => {
    // Update base frequency when it changes
    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.value = baseFrequency;
    }
  }, [baseFrequency]);

  useEffect(() => {
    // Update beat frequency when it changes
    if (modulatorRef.current) {
      modulatorRef.current.frequency.value = beatFrequency;
    }
  }, [beatFrequency]);

  useEffect(() => {
    // Update waveform when it changes
    if (oscillatorRef.current) {
      oscillatorRef.current.type = waveform;
    }
  }, [waveform]);

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

  return (
    <Modal show={show} onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.title}>{t('modals.isochronic.title')}</h2>
        <p className={styles.desc}>{t('modals.isochronic.description')}</p>
      </header>

      <div className={styles.fieldWrapper}>
        <label>
          {t('modals.generators.presets-label')} {/* Use common key */}
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
              {t('modals.generators.base-frequency-label')}{' '}
              {/* Use common key */}
              <input
                max="2000"
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
              {t('modals.isochronic.tone-frequency-label')}{' '}
              {/* Use isochronic specific key */}
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
          {/* <div className={styles.fieldWrapper}>
            <label>
              Waveform:
              <select
                value={waveform}
                onChange={e => setWaveform(e.target.value as OscillatorType)}
              >
                <option value="sine">Sine</option>
                <option value="square">Square</option>
                <option value="sawtooth">Sawtooth</option>
                <option value="triangle">Triangle</option>
              </select>
            </label>
          </div> */}
        </>
      )}
      <div className={styles.fieldWrapper}>
        <label>
          {t('modals.generators.volume-label')} {/* Use common key */}
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
