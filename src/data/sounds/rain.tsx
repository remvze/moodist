import {
  BsFillCloudRainFill,
  BsFillCloudRainHeavyFill,
  BsUmbrellaFill,
} from 'react-icons/bs/index';
import { GiWindow } from 'react-icons/gi/index';
import { FaLeaf } from 'react-icons/fa/index';
import { PiTentFill } from 'react-icons/pi/index';
import { MdOutlineThunderstorm } from 'react-icons/md/index';

import type { Category } from '../types';

export const rain: Category = {
  icon: <BsFillCloudRainFill />,
  id: 'rain',
  sounds: [
    {
      icon: <BsFillCloudRainFill />,
      id: 'light-rain',
      label: 'Light Rain',
      src: '/sounds/rain/light-rain.mp3',
    },
    {
      icon: <BsFillCloudRainHeavyFill />,
      id: 'heavy-rain',
      label: 'Heavy Rain',
      src: '/sounds/rain/heavy-rain.mp3',
    },
    {
      icon: <MdOutlineThunderstorm />,
      id: 'thunder',
      label: 'Thunder',
      src: '/sounds/rain/thunder.mp3',
    },
    {
      icon: <GiWindow />,
      id: 'rain-on-window',
      label: 'Rain on Window',
      src: '/sounds/rain/rain-on-window.mp3',
    },
    {
      icon: <BsUmbrellaFill />,
      id: 'rain-on-umbrella',
      label: 'Rain on Umbrella',
      src: '/sounds/rain/rain-on-umbrella.mp3',
    },
    {
      icon: <PiTentFill />,
      id: 'rain-on-tent',
      label: 'Rain on Tent',
      src: '/sounds/rain/rain-on-tent.mp3',
    },
    {
      icon: <FaLeaf />,
      id: 'rain-on-leaves',
      label: 'Rain on Leaves',
      src: '/sounds/rain/rain-on-leaves.mp3',
    },
  ],
  title: 'Rain',
};
