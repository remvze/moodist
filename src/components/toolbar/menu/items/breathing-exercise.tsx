import { IoMdFlower } from 'react-icons/io/index';

import { Item } from '../item';
import { useTranslation } from '@/hooks/useTranslation';

interface BreathingExerciseProps {
  open: () => void;
}

export function BreathingExercise({ open }: BreathingExerciseProps) {
  const { t } = useTranslation();

  return (
    <Item
      icon={<IoMdFlower />}
      label={t('breathingExercise')}
      shortcut="Shift + B"
      onClick={open}
    />
  );
}
