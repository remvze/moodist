import { GiSoundWaves } from 'react-icons/gi/index';
import { BsSoundwave } from 'react-icons/bs/index';

import type { Category } from '../types';

export const noise: Category = {
  icon: <BsSoundwave />,
  id: 'noise',
  sounds: [
    {
      icon: <GiSoundWaves />,
      id: 'white-noise',
      label: 'White Noise',
      src: '/sounds/noise/white-noise.wav',
    },
    {
      icon: <GiSoundWaves />,
      id: 'pink-noise',
      label: 'Pink Noise',
      src: '/sounds/noise/pink-noise.wav',
    },
    {
      icon: <GiSoundWaves />,
      id: 'brown-noise',
      label: 'Brown Noise',
      src: '/sounds/noise/brown-noise.wav',
    },
  ],
  title: 'Noise',
};
