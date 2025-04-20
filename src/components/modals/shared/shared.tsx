import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/modal';

import { useSoundStore } from '@/stores/sound';
import { useSnackbar } from '@/contexts/snackbar';
import { useCloseListener } from '@/hooks/use-close-listener';
import { cn } from '@/helpers/styles';
import { sounds } from '@/data/sounds';

import styles from './shared.module.css';

export function SharedModal() {
  const { t } = useTranslation(); // Get t function
  const override = useSoundStore(state => state.override);
  const showSnackbar = useSnackbar();

  const [isOpen, setIsOpen] = useState(false);

  const [sharedSounds, setSharedSounds] = useState<
    Array<{
      id: string;
      labelKey: string;
      volume: number;
    }>
  >([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const share = searchParams.get('share');

    if (share) {
      try {
        const parsed = JSON.parse(decodeURIComponent(share));
        // Map sound IDs to their labelKeys for quick lookup
        const allSoundLabelKeys: Record<string, string> = {};
        sounds.categories.forEach(category => {
          category.sounds.forEach(sound => {
            allSoundLabelKeys[sound.id] = sound.labelKey; // Get the labelKey
          });
        });

        const _sharedSounds: Array<{
          id: string;
          labelKey: string;
          volume: number;
        }> = [];
        Object.keys(parsed).forEach(soundId => {
          // Check if the soundId exists and has a labelKey
          if (allSoundLabelKeys[soundId]) {
            _sharedSounds.push({
              id: soundId,
              labelKey: allSoundLabelKeys[soundId], // Store the key
              volume: Number(parsed[soundId]),
            });
          }
        });

        if (_sharedSounds.length) {
          setIsOpen(true);
          setSharedSounds(_sharedSounds);
        }
      } catch (error) {
        console.error('Error parsing shared URL:', error); // Log error
        return; // Stop execution if parsing fails
      } finally {
        history.pushState({}, '', location.href.split('?')[0]);
      }
    }
  }, []); // Run only once on mount

  const handleOverride = () => {
    const newSounds: Record<string, number> = {};

    sharedSounds.forEach(sound => {
      newSounds[sound.id] = sound.volume;
    });

    override(newSounds);
    setIsOpen(false);
    showSnackbar(t('modals.shared.snackbar-message'));
  };

  useCloseListener(() => setIsOpen(false));

  return (
    <Modal show={isOpen} onClose={() => setIsOpen(false)}>
      <h1 className={styles.heading}>{t('modals.shared.title')}</h1>
      <p className={styles.desc}>{t('modals.shared.description')}</p>
      <div className={styles.sounds}>
        {sharedSounds.map(sound => (
          <div className={styles.sound} key={sound.id}>
            {t(sound.labelKey)}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <button className={cn(styles.button)} onClick={() => setIsOpen(false)}>
          {t('common.cancel')}
        </button>
        <button
          className={cn(styles.button, styles.primary)}
          onClick={handleOverride}
        >
          {t('common.override')}
        </button>
      </div>
    </Modal>
  );
}
