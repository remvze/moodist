import { BiMoney, BiUserCircle, BiLogoGithub } from 'react-icons/bi/index';
import { Balancer } from 'react-wrap-balancer';

import { Container } from '@/components/container';

import styles from './why.module.css';

export function Why() {
  const reasons = [
    {
      body: 'Moodist pampers your senses without emptying your wallet. Enjoy our rich collection of ambient sounds at no cost.',
      icon: <BiMoney />,
      id: 'free',
      label: 'Completely Free',
    },
    {
      body: 'Say goodbye to the hassle of signing up; Moodist is ready to enhance your experience without any registration requirements, ensuring quick and easy access.',
      icon: <BiUserCircle />,
      id: 'registration-free',
      label: 'Without Registration',
    },
    {
      body: "Moodist's open-source nature means you can trust its transparency and contribute to its improvement, making it a community-driven tool for everyone's benefit.",
      icon: <BiLogoGithub />,
      id: 'open-source',
      label: 'Open Source',
      link: {
        label: 'Source Code',
        url: 'https://github.com/remvze/moodist',
      },
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
