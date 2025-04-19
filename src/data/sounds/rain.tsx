import {
  BsFillCloudRainFill,
  BsFillCloudRainHeavyFill,
  BsUmbrellaFill,
} from 'react-icons/bs/index';
import { GiWindow } from 'react-icons/gi/index';
import { FaLeaf, FaCarSide } from 'react-icons/fa/index';
import { PiTentFill } from 'react-icons/pi/index';
import { MdOutlineThunderstorm } from 'react-icons/md/index';

import type { Category } from '../types';

export const rain: Category = {
  icon: <BsFillCloudRainFill />,
  id: 'rain',
  // 修改
  sounds: [
    {
      icon: <BsFillCloudRainFill />,
      id: 'light-rain',
      labelKey: 'sounds.rain.light-rain',
      src: '/sounds/rain/light-rain.mp3',
    },
    {
      icon: <BsFillCloudRainHeavyFill />,
      id: 'heavy-rain',
      labelKey: 'sounds.rain.heavy-rain',
      src: '/sounds/rain/heavy-rain.mp3',
    },
    {
      icon: <MdOutlineThunderstorm />,
      id: 'thunder',
      labelKey: 'sounds.rain.thunder',
      src: '/sounds/rain/thunder.mp3',
    },
    {
      icon: <GiWindow />,
      id: 'rain-on-window',
      labelKey: 'sounds.rain.rain-on-window',
      src: '/sounds/rain/rain-on-window.mp3',
    },
    {
      icon: <FaCarSide />,
      id: 'rain-on-car-roof',
      labelKey: 'sounds.rain.rain-on-car-roof',
      src: '/sounds/rain/rain-on-car-roof.mp3',
    },
    {
      icon: <BsUmbrellaFill />,
      id: 'rain-on-umbrella',
      labelKey: 'sounds.rain.rain-on-umbrella',
      src: '/sounds/rain/rain-on-umbrella.mp3',
    },
    {
      icon: <PiTentFill />,
      id: 'rain-on-tent',
      labelKey: 'sounds.rain.rain-on-tent',
      src: '/sounds/rain/rain-on-tent.mp3',
    },
    {
      icon: <FaLeaf />,
      id: 'rain-on-leaves',
      labelKey: 'sounds.rain.rain-on-leaves',
      src: '/sounds/rain/rain-on-leaves.mp3',
    },
  ],
  titleKey: 'sounds.rain.title',
};
