import { useState } from 'react';
import YouTube from 'react-youtube';

import {
  Modal,
  ModalActions,
  ModalButton,
  ModalHeader,
  ModalTitle,
} from '@/components/modal';

import styles from './lofi.module.css';
import { padNumber } from '@/helpers/number';

interface LofiProps {
  onClose: () => void;
  show: boolean;
}

const videos = [
  {
    channel: 'Lofi Girl',
    id: 'X4VbdwhkE10',
    title: 'lofi hip hop radio',
  },
  {
    channel: 'Lofi Girl',
    id: '4xDzrJKXOOY',
    title: 'synthwave radio',
  },
  {
    channel: 'Lofi Girl',
    id: 'CwPCy1GLS38',
    title: 'sad lofi radio',
  },
  {
    channel: 'Lofi Girl',
    id: 'S_MOd40zlYU',
    title: 'dark ambient radio',
  },
  {
    channel: 'Lofi Girl',
    id: 'N0snMcR6aaA',
    title: 'relaxing piano radio',
  },
];

export function LofiModal({ onClose, show }: LofiProps) {
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <Modal persist show={show} onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Lofi Music Player</ModalTitle>
      </ModalHeader>

      {!isAccepted ? (
        <div className={styles.notice}>
          <p>
            This feature plays music using embedded YouTube videos. By
            continuing, you agree to connect to YouTube, which may collect data
            in accordance with their privacy policy. We do not control or track
            this data.
          </p>

          <ModalActions>
            <ModalButton onClick={onClose}>Cancel</ModalButton>
            <ModalButton variant="primary" onClick={() => setIsAccepted(true)}>
              Continue
            </ModalButton>
          </ModalActions>
        </div>
      ) : (
        <div className={styles.videos}>
          {videos.map((video, index) => (
            <div className={styles.video} key={video.id}>
              <h2>
                <span className={styles.index}>{padNumber(index + 1, 2)}</span>{' '}
                <strong>{video.channel}</strong> <span>/</span> {video.title}
              </h2>
              <div className={styles.container}>
                <YouTube iframeClassName={styles.iframe} videoId={video.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
