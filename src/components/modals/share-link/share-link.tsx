import { useMemo } from 'react';
import { IoCopyOutline, IoCheckmark } from 'react-icons/io5/index';

import { Modal } from '@/components/modal';

import { useCopy } from '@/hooks/use-copy';
import { useSoundStore } from '@/store';

import styles from './share-link.module.css';

interface ShareLinkModalProps {
  onClose: () => void;
  show: boolean;
}

export function ShareLinkModal({ onClose, show }: ShareLinkModalProps) {
  const sounds = useSoundStore(state => state.sounds);
  const { copy, copying } = useCopy();

  const selected = useMemo(() => {
    return Object.keys(sounds)
      .map(sound => ({
        id: sound,
        isSelected: sounds[sound].isSelected,
        volume: sounds[sound].volume.toFixed(1),
      }))
      .filter(sound => sound.isSelected);
  }, [sounds]);

  const string = useMemo(() => {
    const object: Record<string, number> = {};

    selected.forEach(sound => {
      object[sound.id] = Number(sound.volume);
    });

    return JSON.stringify(object);
  }, [selected]);

  const url = useMemo(() => {
    return `https://moodist.app/?share=${encodeURIComponent(string)}`;
  }, [string]);

  return (
    <Modal show={show} onClose={onClose}>
      <h1 className={styles.heading}>Share your sound selection!</h1>
      <p className={styles.desc}>
        Copy and send the following link to the person you want to share your
        selection with.
      </p>
      <div className={styles.inputWrapper}>
        <input readOnly type="text" value={url} />
        <button onClick={() => copy(url)}>
          {copying ? <IoCheckmark /> : <IoCopyOutline />}
        </button>
      </div>
    </Modal>
  );
}
