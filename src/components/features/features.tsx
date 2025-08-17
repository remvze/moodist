import { BiMoney, BiUserCircle, BiLogoGithub } from 'react-icons/bi/index';
import { BsSoundwave, BsStars } from 'react-icons/bs/index';
import { RxMixerHorizontal } from 'react-icons/rx/index';
import { useState, useEffect } from 'react';

import { Balancer } from 'react-wrap-balancer';

import { Container } from '@/components/container';
import { count as soundCount } from '@/lib/sounds';

import styles from './features.module.css';

// 安全地获取localStorage
function getLocalStorageItem(key: string, defaultValue: string = 'en'): string {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      return localStorage.getItem(key) || defaultValue;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}

export function Features() {
  const [currentLang, setCurrentLang] = useState('en');
  const count = soundCount();

  // 在客户端初始化语言
  useEffect(() => {
    const lang = getLocalStorageItem('moodist-language');
    setCurrentLang(lang);
    
    // 监听语言变化
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail.language);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  // 获取本地化文本
  const comingSoonText = currentLang === 'zh' ? '即将推出' : 'Coming Soon';
  const featuresTitle = currentLang === 'zh' ? '功能特性' : 'Features';

  const features = [
    {
      Icon: BiMoney,
      body: currentLang === 'zh' ? '完全免费使用，无需花费一分钱即可沉浸在声音中。' : 'Immerse yourself in sound without spending a dime.',
      id: 'free-access',
      label: currentLang === 'zh' ? '免费使用' : 'Free Access',
    },
    {
      Icon: BiUserCircle,
      body: currentLang === 'zh' ? '直接开始使用，无需注册，没有繁琐的步骤。' : 'Dive right in, no sign-up hoops to jump through.',
      id: 'no-registration',
      label: currentLang === 'zh' ? '无需注册' : 'No Registration',
    },
    {
      Icon: BsSoundwave,
      body: currentLang === 'zh' ? `探索${count}个独特的音景，从雨林到城市景观。` : `Explore ${count} unique soundscapes, from rainforests to cityscapes.`,
      id: 'diverse-sounds',
      label: currentLang === 'zh' ? '丰富音效' : 'Diverse Sounds',
    },
    {
      Icon: RxMixerHorizontal,
      body: currentLang === 'zh' ? '通过混合和调整声音，打造您完美的音景。' : 'Craft your perfect soundscape by blending and adjusting sounds.',
      id: 'customizable-mixes',
      label: currentLang === 'zh' ? '自定义混音' : 'Customizable Mixes',
    },
    {
      Icon: BiLogoGithub,
      body: currentLang === 'zh' ? '贡献和协作，让最好的变得更好。' : 'Contribute and collaborate, making the best even better.',
      id: 'open-source',
      label: currentLang === 'zh' ? '开源项目' : 'Open-Source',
      link: {
        label: currentLang === 'zh' ? '源代码' : 'Source Code',
        url: 'https://github.com/remvze/moodist',
      },
    },
    {
      Icon: BsStars,
      body: currentLang === 'zh' ? '不间断的沉浸体验，专注于声音，而不是技术。' : 'Uninterrupted immersion, focus on the sounds, not the tech.',
      id: 'seamless-experience',
      label: currentLang === 'zh' ? '流畅体验' : 'Seamless Experience',
    },
    {
      Icon: BsStars,
      body: currentLang === 'zh' ? '传播平静，轻松分享您定制的音效组合。' : 'Spread the calm, easily share your customized sound blends.',
      id: 'share-selections',
      label: currentLang === 'zh' ? '分享选择' : 'Share Selections',
    },
    {
      Icon: BsStars,
      body: currentLang === 'zh' ? '锁定您最喜爱的混音，立即回到您的音效天堂。' : 'Lock in your favorite mixes for instant return to your sonic haven.',
      id: 'save-presets',
      label: currentLang === 'zh' ? '保存预设' : 'Save Presets',
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

        <h2 className={styles.title}>{featuresTitle}</h2>

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

              {feature.soon && <div className={styles.soon}>{comingSoonText}</div>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
