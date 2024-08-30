import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import styles from './exercise.module.css';

type Exercise = 'Box Breathing' | 'Resonant Breathing' | '4-7-8 Breathing';
type Phase = 'inhale' | 'exhale' | 'holdInhale' | 'holdExhale';

export function Exercise() {
  const [selectedExercise, setSelectedExercise] =
    useState<Exercise>('4-7-8 Breathing');

  const getAnimationPhases = (
    exercise: Exercise,
  ): Array<'inhale' | 'holdInhale' | 'exhale' | 'holdExhale'> => {
    switch (exercise) {
      case 'Box Breathing':
        return ['inhale', 'holdInhale', 'exhale', 'holdExhale'];
      case 'Resonant Breathing':
        return ['inhale', 'exhale'];
      case '4-7-8 Breathing':
        return ['inhale', 'holdInhale', 'exhale'];
      default:
        return ['inhale', 'holdInhale', 'exhale', 'holdExhale'];
    }
  };

  const getAnimationDurations = (exercise: Exercise) => {
    switch (exercise) {
      case 'Box Breathing':
        return { exhale: 4, holdExhale: 4, holdInhale: 4, inhale: 4 };
      case 'Resonant Breathing':
        return { exhale: 5, inhale: 5 };
      case '4-7-8 Breathing':
        return { exhale: 8, holdInhale: 7, inhale: 4 };
      default:
        return { exhale: 4, holdExhale: 4, holdInhale: 4, inhale: 4 };
    }
  };

  const getLabel = (phase: Phase) => {
    switch (phase) {
      case 'inhale':
        return 'Inhale';
      case 'exhale':
        return 'Exhale';
      default:
        return 'Hold';
    }
  };

  const [phase, setPhase] = useState<Phase>('inhale');
  const [durations, setDurations] = useState(
    getAnimationDurations(selectedExercise),
  );

  const animationVariants = {
    exhale: {
      transform: 'translate(-50%, -50%) scale(1)',
      transition: { duration: durations.exhale },
    },
    holdExhale: {
      transform: 'translate(-50%, -50%) scale(1)',
      transition: { duration: durations.holdExhale || 4 },
    },
    holdInhale: {
      transform: 'translate(-50%, -50%) scale(1.5)',
      transition: { duration: durations.holdInhale || 4 },
    },
    inhale: {
      transform: 'translate(-50%, -50%) scale(1.5)',
      transition: { duration: durations.inhale },
    },
  };

  useEffect(() => {
    setDurations(getAnimationDurations(selectedExercise));
  }, [selectedExercise]);

  useEffect(() => {
    const phases = getAnimationPhases(selectedExercise);

    let phaseIndex = 0;

    setPhase(phases[phaseIndex]);

    const interval = setInterval(
      () => {
        phaseIndex = (phaseIndex + 1) % phases.length;

        setPhase(phases[phaseIndex]);
      },
      (durations[phases[phaseIndex]] || 4) * 1000,
    );

    return () => clearInterval(interval);
  }, [selectedExercise, durations]);

  return (
    <>
      <div className={styles.exercise}>
        <motion.div
          animate={phase}
          className={styles.circle}
          key={selectedExercise}
          variants={animationVariants}
        />
        <p className={styles.phase}>{getLabel(phase)}</p>
      </div>

      <select
        className={styles.selectBox}
        value={selectedExercise}
        onChange={e => setSelectedExercise(e.target.value as Exercise)}
      >
        <option value="Box Breathing">Box Breathing</option>
        <option value="Resonant Breathing">Resonant Breathing</option>
        <option value="4-7-8 Breathing">4-7-8 Breathing</option>
      </select>
    </>
  );
}
