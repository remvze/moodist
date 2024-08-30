import { IoMdFlower } from 'react-icons/io/index';

import { Item } from '../item';

export function BreathingExercise() {
  return (
    <Item
      href="/tools/breathing-exercises"
      icon={<IoMdFlower />}
      label="Breathing Exercise"
    />
  );
}
