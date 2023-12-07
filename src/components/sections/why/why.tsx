import { useMemo } from 'react';
import { BiMoney, BiUserCircle, BiLogoGithub } from 'react-icons/bi/index';
import { BsSoundwave, BsStars } from 'react-icons/bs/index';
import { RxMixerHorizontal } from 'react-icons/rx/index';

import { Balancer } from 'react-wrap-balancer';

import { Container } from '@/components/container';
import { count as soundCount } from '@/lib/sounds';

import styles from './why.module.css';

export function Why() {
  const count = useMemo(soundCount, []);

  const reasons = [
    {
      body: "Immerse yourself in Moodist's ambient world without spending a dime. All features are accessible to everyone, ensuring a cost-free auditory journey.",
      icon: <BiMoney />,
      id: 'free-access',
      label: 'Free Access',
    },
    {
      body: 'Embrace simplicity – Moodist skips the registration process. No accounts, no hassle; just click, play, and enjoy the serenity.',
      icon: <BiUserCircle />,
      id: 'no-registration',
      label: 'No Registration',
    },
    {
      body: `With a curated collection of ${count} sounds, Moodist offers a spectrum of auditory experiences. From the tranquility of nature to the beat of urban life, find the perfect backdrop for your mood.`,
      icon: <BsSoundwave />,
      id: 'diverse-sounds',
      label: 'Diverse Sounds',
    },
    {
      body: 'Tailor your ambiance effortlessly. Moodist allows you to create personalized mixes, adjusting the blend of sounds to suit your focus or relaxation needs.',
      icon: <RxMixerHorizontal />,
      id: 'customizable-mixes',
      label: 'Customizable Mixes',
    },
    {
      body: 'Trust in transparency. Moodist is open-source, fostering collaboration and providing users with a platform they can explore and understand.',
      icon: <BiLogoGithub />,
      id: 'open-source',
      label: 'Open-Source',
      link: {
        label: 'Source Code',
        url: 'https://github.com/remvze/moodist',
      },
    },
    {
      body: 'Navigate with ease. Moodist provides a user-friendly interface, ensuring a smooth and hassle-free experience as you explore the diverse soundscape of calm and rhythm.',
      icon: <BsStars />,
      id: 'seamless-experience',
      label: 'Seamless Experience',
    },
  ];

  return (
    <div className={styles.why}>
      <Container>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Why use Moodist?</h2>
          <div className={styles.line} />
        </div>

        <div className={styles.reasons}>
          {reasons.map(reason => (
            <div className={styles.reason} key={reason.id}>
              <div className={styles.icon}>{reason.icon}</div>
              <h3 className={styles.label}>{reason.label}</h3>
              <p className={styles.body}>
                <Balancer>{reason.body}</Balancer>
              </p>
              {reason.link && (
                <a className={styles.link} href={reason.link.url}>
                  {reason.link.label} →
                </a>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
