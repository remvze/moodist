import { IoMdFlower } from 'react-icons/io/index';
import { useTranslation } from 'react-i18next';
import { Item } from '../item';

interface BreathingExerciseProps {
  open: () => void;
}

export function BreathingExercise({ open }: BreathingExerciseProps) {
  const { t } = useTranslation();

  return (
    <Item
      icon={<IoMdFlower />}
      label={t('toolbar.items.breathing')}
      shortcut="Shift + B"
      onClick={open}
    />
  );
}
