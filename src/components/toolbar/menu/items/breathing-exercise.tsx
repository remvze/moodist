import { IoMdFlower } from 'react-icons/io/index';

import { Item } from '../item';
import { getLocalizedText } from '@/utils/language';

interface BreathingExerciseProps {
  open: () => void;
}

export function BreathingExercise({ open }: BreathingExerciseProps) {
  const label = getLocalizedText('breathingExercise');

  return (
    <Item
      icon={<IoMdFlower />}
      label={label}
      shortcut="Shift + B"
      onClick={open}
    />
  );
}
