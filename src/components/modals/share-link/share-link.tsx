import { useMemo, useEffect, useState } from 'react';
import { IoCopyOutline, IoCheckmark } from 'react-icons/io5/index';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/modal';

import { useCopy } from '@/hooks/use-copy';
import { useSoundStore } from '@/stores/sound';

import styles from './share-link.module.css';
import { Tooltip } from '@/components/tooltip'; // Import Tooltip

interface ShareLinkModalProps {
  onClose: () => void;
  show: boolean;
}

export function ShareLinkModal({ onClose, show }: ShareLinkModalProps) {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const sounds = useSoundStore(state => state.sounds);
  const { copy, copying } = useCopy();

  const selected = useMemo(() => {
    return Object.keys(sounds)
      .map(sound => ({
        id: sound,
        isSelected: sounds[sound].isSelected,
        volume: sounds[sound].volume.toFixed(2),
      }))
      .filter(sound => sound.isSelected);
  }, [sounds, JSON.stringify(sounds)]); // eslint-disable-line

  const string = useMemo(() => {
    const object: Record<string, number> = {};

    selected.forEach(sound => {
      object[sound.id] = Number(sound.volume);
    });

    return JSON.stringify(object);
  }, [selected]);

  const url = useMemo(() => {
    if (!isMounted)
      return `https://moodist.app/?share=${encodeURIComponent(string)}`;

    return `${window.location.protocol}//${
      window.location.host
    }/?share=${encodeURIComponent(string)}`;
  }, [string, isMounted]);

  useEffect(() => setIsMounted(true), []);

  return (
    <Modal show={show} onClose={onClose}>
      <h1 className={styles.heading}>{t('modals.share-link.title')}</h1>
      <p className={styles.desc}>{t('modals.share-link.description')}</p>
      <div className={styles.inputWrapper}>
        <input readOnly type="text" value={url} />
        <Tooltip
          content={copying ? t('common.copied') : t('common.copy')}
          showDelay={0}
        >
          <button
            aria-label={
              copying
                ? t('common.copied')
                : t('modals.share-link.copy-button-aria-label')
            }
            onClick={() => copy(url)}
          >
            {copying ? <IoCheckmark /> : <IoCopyOutline />}
          </button>
        </Tooltip>
      </div>
    </Modal>
  );
}
