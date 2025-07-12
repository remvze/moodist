import { useState } from 'react';
import YouTube from 'react-youtube';

import { Modal } from '@/components/modal/modal';

import styles from './lofi.module.css';
import { padNumber } from '@/helpers/number';

interface LofiProps {
  onClose: () => void;
  show: boolean;
}

const videos = [
  {
    channel: 'Lofi Girl',
    id: 'jfKfPfyJRdk',
    title: 'lofi hip hop radio',
  },
  {
    channel: 'Lofi Girl',
    id: '4xDzrJKXOOY',
    title: 'synthwave radio',
  },
  {
    channel: 'Lofi Girl',
    id: 'P6Segk8cr-c',
    title: 'sad lofi radio',
  },
  {
    channel: 'Lofi Girl',
    id: 'S_MOd40zlYU',
    title: 'dark ambient radio',
  },
  {
    channel: 'Lofi Girl',
    id: 'TtkFsfOP9QI',
    title: 'peaceful piano radio',
  },
];

export function LofiModal({ onClose, show }: LofiProps) {
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <Modal persist show={show} onClose={onClose}>
      <h1 className={styles.title}>Lofi Music Player</h1>

      {!isAccepted ? (
        <div className={styles.notice}>
          <p>
            This feature plays music using embedded YouTube videos. By
            continuing, you agree to connect to YouTube, which may collect data
            in accordance with their privacy policy. We do not control or track
            this data.
          </p>

          <div className={styles.buttons}>
            <button onClick={onClose}>Cancel</button>
            <button
              className={styles.primary}
              onClick={() => setIsAccepted(true)}
            >
              Continue
            </button>
          </div>
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
