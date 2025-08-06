import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';

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
  'Resonant Breathing': { exhale: 5, inhale: 5 }, // No holdExhale
};

const PHASE_LABELS: Record<Phase, string> = {
  exhale: 'Exhale',
  holdExhale: 'Hold',
  holdInhale: 'Hold',
  inhale: 'Inhale',
};

export function Exercise() {
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
        <p className={styles.phase}>{PHASE_LABELS[currentPhase]}</p>
      </div>

      <div className={styles.selectWrapper}>
        <select
          className={styles.selectBox}
          value={selectedExercise}
          onChange={e => setSelectedExercise(e.target.value as Exercise)}
        >
          {Object.keys(EXERCISE_PHASES).map(exercise => (
            <option key={exercise} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
