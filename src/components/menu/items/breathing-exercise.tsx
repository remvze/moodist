import { MdOutlineTimer } from 'react-icons/md/index';

import { Item } from '../item';

interface BreathingExerciseProps {
  open: () => void;
}

export function BreathingExercise({ open }: BreathingExerciseProps) {
  return (
    <Item
      icon={<MdOutlineTimer />}
      label="Breathing Exercise"
      shortcut="Shift + B"
      onClick={open}
    />
  );
}
