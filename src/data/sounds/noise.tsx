import { GiSoundWaves } from 'react-icons/gi/index';
import { BsSoundwave } from 'react-icons/bs/index';

import type { Category } from '../types';

import { getAssetPath } from '@/helpers/path';

export const noise: Category = {
  icon: <BsSoundwave />,
  id: 'noise',
  sounds: [
    {
      icon: <GiSoundWaves />,
      id: 'white-noise',
      label: 'White Noise',
      dataI18n: 'sounds.noise.whiteNoise',
      src: getAssetPath('/sounds/noise/white-noise.wav'),
    },
    {
      icon: <GiSoundWaves />,
      id: 'pink-noise',
      label: 'Pink Noise',
      dataI18n: 'sounds.noise.pinkNoise',
      src: getAssetPath('/sounds/noise/pink-noise.wav'),
    },
    {
      icon: <GiSoundWaves />,
      id: 'brown-noise',
      label: 'Brown Noise',
      dataI18n: 'sounds.noise.brownNoise',
      src: getAssetPath('/sounds/noise/brown-noise.wav'),
    },
  ],
  title: 'Noise',
  dataI18n: 'categories.noise',
};
