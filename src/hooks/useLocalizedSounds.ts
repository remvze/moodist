import { useMemo } from 'react';
import { sounds } from '@/data/sounds';
import type { Category, Sound } from '@/data/types';
import { useTranslation } from './useTranslation';

export function useLocalizedSounds() {
  const { t } = useTranslation();

  const localizedSounds = useMemo(() => {
    return sounds.categories.map((category: Category): Category => {
      // Translate category title
      const categoryKey = `categories.${category.id}`;
      const translatedTitle = t(categoryKey as any);

      // Translate sounds
      const translatedSounds = category.sounds.map((sound: Sound): Sound => {
        if (sound.dataI18n) {
          return {
            ...sound,
            label: t(sound.dataI18n as any) || sound.label
          };
        }
        return sound;
      });

      return {
        ...category,
        title: translatedTitle,
        sounds: translatedSounds
      };
    });
  }, [t]);

  return localizedSounds;
}