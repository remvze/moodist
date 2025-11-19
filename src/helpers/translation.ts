import { useTranslation } from '@/hooks/useTranslation';

export function useTranslatedSounds() {
  const { t } = useTranslation();

  const translateCategory = (category: string) => {
    return t(`categories.${category.toLowerCase()}`);
  };

  const translateSound = (category: string, soundId: string) => {
    return t(`sounds.${category.toLowerCase()}.${soundId}`);
  };

  return {
    translateCategory,
    translateSound,
  };
}