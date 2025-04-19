import { GiSoundWaves } from 'react-icons/gi/index';
import { BsSoundwave } from 'react-icons/bs/index';

import type { Category } from '../types';

export const noise: Category = {
  icon: <BsSoundwave />,
  id: 'noise',
  // 修改
  sounds: [
    {
      icon: <GiSoundWaves />,
      id: 'white-noise',
      labelKey: 'sounds.noise.white-noise',
      src: '/sounds/noise/white-noise.wav',
    },
    {
      icon: <GiSoundWaves />,
      id: 'pink-noise',
      labelKey: 'sounds.noise.pink-noise',
      src: '/sounds/noise/pink-noise.wav',
    },
    {
      icon: <GiSoundWaves />,
      id: 'brown-noise',
      labelKey: 'sounds.noise.brown-noise',
      src: '/sounds/noise/brown-noise.wav',
    },
  ],
  titleKey: 'sounds.noise.title',
};
