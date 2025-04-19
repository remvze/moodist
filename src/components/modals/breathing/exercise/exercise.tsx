import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Import
import { padNumber } from '@/helpers/number';
import styles from './exercise.module.css';

type Exercise = 'Box Breathing' | 'Resonant Breathing' | '4-7-8 Breathing';
type Phase = 'inhale' | 'exhale' | 'holdInhale' | 'holdExhale';

const EXERCISE_PHASES: Record<Exercise, Phase[]> = {
  '4-7-8 Breathing': ['inhale', 'holdInhale', 'exhale'],
  'Box Breathing': ['inhale', 'holdInhale', 'exhale', 'holdExhale'],
  'Resonant Breathing': ['inhale', 'exhale'],
};

const EXERCISE_DURATIONS: Record<Exercise, Partial<Record<Phase, number>>> = {
  '4-7-8 Breathing': { exhale: 8, holdInhale: 7, inhale: 4 },
  'Box Breathing': { exhale: 4, holdExhale: 4, holdInhale: 4, inhale: 4 },
  'Resonant Breathing': { exhale: 5, inhale: 5 },
};

const PHASE_LABEL_KEYS: Record<Phase, string> = {
  exhale: 'modals.breathing.phases.exhale',
  holdExhale: 'modals.breathing.phases.hold',
  holdInhale: 'modals.breathing.phases.hold',
  inhale: 'modals.breathing.phases.inhale',
};

const EXERCISE_SELECT_OPTIONS: { key: string; value: Exercise }[] = [
  { key: 'modals.breathing.exercises.478', value: '4-7-8 Breathing' },
  { key: 'modals.breathing.exercises.box', value: 'Box Breathing' },
  { key: 'modals.breathing.exercises.resonant', value: 'Resonant Breathing' },
];

export function Exercise() {
  const { t } = useTranslation();
  const [selectedExercise, setSelectedExercise] =
    useState<Exercise>('4-7-8 Breathing');
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phases = useMemo(
    () => EXERCISE_PHASES[selectedExercise],
    [selectedExercise],
  );
  const durations = useMemo(
    () => EXERCISE_DURATIONS[selectedExercise],
    [selectedExercise],
  );

  const currentPhase = phases[phaseIndex];

  const animationVariants = useMemo(
    () => ({
      exhale: {
        transform: 'translate(-50%, -50%) scale(1)',
        transition: { duration: durations.exhale },
      },
      holdExhale: {
        transform: 'translate(-50%, -50%) scale(1)',
        transition: { duration: durations.holdExhale },
      },
      holdInhale: {
        transform: 'translate(-50%, -50%) scale(1.5)',
        transition: { duration: durations.holdInhale },
      },
      inhale: {
        transform: 'translate(-50%, -50%) scale(1.5)',
        transition: { duration: durations.inhale },
      },
    }),
    [durations],
  );

  const resetExercise = useCallback(() => {
    setPhaseIndex(0);
  }, []);

  const updatePhase = useCallback(() => {
    setPhaseIndex(prevIndex => (prevIndex + 1) % phases.length);
  }, [phases.length]);

  useEffect(() => {
    resetExercise();
  }, [selectedExercise, resetExercise]);

  useEffect(() => {
    const intervalDuration = (durations[currentPhase] || 4) * 1000;
    const interval = setInterval(updatePhase, intervalDuration);

    return () => clearInterval(interval);
  }, [currentPhase, durations, updatePhase]);

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer(prev => prev + 1), 1000);

    return () => clearInterval(interval);
  }, []);

  const currentPhaseLabel = t(PHASE_LABEL_KEYS[currentPhase]);

  return (
    <>
      <div className={styles.exercise}>
        <div className={styles.timer}>
          {padNumber(Math.floor(timer / 60))}:{padNumber(timer % 60)}
        </div>

        <motion.div
          animate={currentPhase}
          className={styles.circle}
          key={selectedExercise}
          variants={animationVariants}
        />
        <p className={styles.phase}>{currentPhaseLabel}</p>
      </div>

      <div className={styles.selectWrapper}>
        <select
          className={styles.selectBox}
          value={selectedExercise}
          onChange={e => setSelectedExercise(e.target.value as Exercise)}
        >
          {EXERCISE_SELECT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {t(option.key)}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
