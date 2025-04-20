import { TbWaveSine } from 'react-icons/tb/index';
import { BsSoundwave } from 'react-icons/bs/index';

import type { Category } from '../types';

export const binaural: Category = {
  icon: <TbWaveSine />,
  id: 'binaural',
  // 修改
  sounds: [
    {
      icon: <BsSoundwave />,
      id: 'binaural-delta',
      labelKey: 'sounds.binaural.binaural-delta',
      src: '/sounds/binaural/binaural-delta.wav',
    },
    {
      icon: <BsSoundwave />,
      id: 'binaural-theta',
      labelKey: 'sounds.binaural.binaural-theta',
      src: '/sounds/binaural/binaural-theta.wav',
    },
    {
      icon: <BsSoundwave />,
      id: 'binaural-alpha',
      labelKey: 'sounds.binaural.binaural-alpha',
      src: '/sounds/binaural/binaural-alpha.wav',
    },
    {
      icon: <BsSoundwave />,
      id: 'binaural-beta',
      labelKey: 'sounds.binaural.binaural-beta',
      src: '/sounds/binaural/binaural-beta.wav',
    },
    {
      icon: <BsSoundwave />,
      id: 'binaural-gamma',
      labelKey: 'sounds.binaural.binaural-gamma',
      src: '/sounds/binaural/binaural-gamma.wav',
    },
  ],
  titleKey: 'sounds.binaural.title',
};
