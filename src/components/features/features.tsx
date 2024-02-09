import { BiMoney, BiUserCircle, BiLogoGithub } from 'react-icons/bi/index';
import { BsSoundwave, BsStars } from 'react-icons/bs/index';
import { RxMixerHorizontal } from 'react-icons/rx/index';

import { Balancer } from 'react-wrap-balancer';

import { Container } from '@/components/container';
import { count as soundCount } from '@/lib/sounds';

import styles from './features.module.css';

export function Features() {
  const count = soundCount();

  const features = [
    {
      Icon: BiMoney,
      body: 'Immerse yourself in sound without spending a dime.',
      id: 'free-access',
      label: 'Free Access',
    },
    {
      Icon: BiUserCircle,
      body: 'Dive right in, no sign-up hoops to jump through.',
      id: 'no-registration',
      label: 'No Registration',
    },
    {
      Icon: BsSoundwave,
      body: `Explore ${count} unique soundscapes, from rainforests to cityscapes.`,
      id: 'diverse-sounds',
      label: 'Diverse Sounds',
    },
    {
      Icon: RxMixerHorizontal,
      body: 'Craft your perfect soundscape by blending and adjusting sounds.',
      id: 'customizable-mixes',
      label: 'Customizable Mixes',
    },
    {
      Icon: BiLogoGithub,
      body: 'Contribute and collaborate, making the best even better.',
      id: 'open-source',
      label: 'Open-Source',
      link: {
        label: 'Source Code',
        url: 'https://github.com/remvze/moodist',
      },
    },
    {
      Icon: BsStars,
      body: 'Uninterrupted immersion, focus on the sounds, not the tech.',
      id: 'seamless-experience',
      label: 'Seamless Experience',
    },
    {
      Icon: BsStars,
      body: 'Spread the calm, easily share your customized sound blends.',
      id: 'share-selections',
      label: 'Share Selections',
    },
    {
      Icon: BsStars,
      body: 'Lock in your favorite mixes for instant return to your sonic haven.',
      id: 'save-presets',
      label: 'Save Presets',
      soon: true,
    },
  ];

  return (
    <section className={styles.featuresSection}>
      <Container>
        <div className={styles.iconContainer}>
          <div className={styles.tail} />
          <div className={styles.icon}>
            <BsStars />
          </div>
        </div>

        <h2 className={styles.title}>Features</h2>

        <div className={styles.features}>
          {features.map(feature => (
            <div className={styles.reason} key={feature.id}>
              <div className={styles.icon}>
                <feature.Icon />
              </div>
              <h3 className={styles.label}>{feature.label}</h3>
              <p className={styles.body}>
                <Balancer>{feature.body}</Balancer>
              </p>

              {feature.link && (
                <a className={styles.link} href={feature.link.url}>
                  {feature.link.label}
                </a>
              )}

              {feature.soon && <div className={styles.soon}>Coming Soon</div>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
