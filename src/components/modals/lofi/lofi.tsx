import { Modal } from '@/components/modal';

import { padNumber } from '@/helpers/number';

import styles from './lofi.module.css';

interface LofiModalProps {
  onClose: () => void;
  show: boolean;
}

export function LofiModal({ onClose, show }: LofiModalProps) {
  const radios = [
    {
      src: 'https://www.youtube.com/embed/jfKfPfyJRdk?si=UiaAY0C8Rk6iBIsd',
    },
    {
      src: 'https://www.youtube.com/embed/4xDzrJKXOOY?si=zyZlOXnoMKr_MWfW',
    },
    {
      src: 'https://www.youtube.com/embed/S_MOd40zlYU?si=rf1_S-MMiAEIKJoi',
    },
  ];

  return (
    <Modal persist show={show} onClose={onClose}>
      <h2 className={styles.title}>Lofi Radios</h2>
      <p className={styles.desc}>A curated list of Lofi radios.</p>
      <p className={styles.notice}>Works best on desktop.</p>

      <div className={styles.radios}>
        {radios.map((radio, index) => (
          <div className={styles.radio} key={radio.src}>
            <div className={styles.label}>Radio {padNumber(index + 1)}</div>
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              src={radio.src}
              title="YouTube video player"
            />
          </div>
        ))}
      </div>
    </Modal>
  );
}
