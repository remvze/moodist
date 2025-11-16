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

import { getAssetPath } from '@/helpers/path';

export const rain: Category = {
  icon: <BsFillCloudRainFill />,
  id: 'rain',
  sounds: [
    {
      icon: <BsFillCloudRainFill />,
      id: 'light-rain',
      label: 'Light Rain',
      dataI18n: 'sounds.rain.lightRain',
      src: getAssetPath('/sounds/rain/light-rain.mp3'),
    },
    {
      icon: <BsFillCloudRainHeavyFill />,
      id: 'moderate-rain',
      label: 'Moderate Rain',
      dataI18n: 'sounds.rain.moderateRain',
      src: getAssetPath('/sounds/rain/moderate-rain.mp3'),
    },
    {
      icon: <BsFillCloudRainHeavyFill />,
      id: 'heavy-rain',
      label: 'Heavy Rain',
      dataI18n: 'sounds.rain.heavyRain',
      src: getAssetPath('/sounds/rain/heavy-rain.mp3'),
    },
    {
      icon: <MdOutlineThunderstorm />,
      id: 'storm',
      label: 'Storm',
      dataI18n: 'sounds.rain.storm',
      src: getAssetPath('/sounds/rain/storm.mp3'),
    },
    {
      icon: <MdOutlineThunderstorm />,
      id: 'thunder',
      label: 'Thunder',
      dataI18n: 'sounds.rain.thunder',
      src: getAssetPath('/sounds/rain/thunder.mp3'),
    },
    {
      icon: <GiWindow />,
      id: 'rain-on-window',
      label: 'Rain on Window',
      dataI18n: 'sounds.rain.rainOnWindow',
      src: getAssetPath('/sounds/rain/rain-on-window.mp3'),
    },
    {
      icon: <FaCarSide />,
      id: 'rain-on-car-roof',
      label: 'Rain on Car Roof',
      dataI18n: 'sounds.rain.carRain',
      src: getAssetPath('/sounds/rain/rain-on-car-roof.mp3'),
    },
    {
      icon: <BsUmbrellaFill />,
      id: 'rain-on-umbrella',
      label: 'Rain on Umbrella',
      dataI18n: 'sounds.rain.rainOnUmbrella',
      src: getAssetPath('/sounds/rain/rain-on-umbrella.mp3'),
    },
    {
      icon: <PiTentFill />,
      id: 'rain-on-tent',
      label: 'Rain on Tent',
      dataI18n: 'sounds.rain.rainOnTent',
      src: getAssetPath('/sounds/rain/rain-on-tent.mp3'),
    },
    {
      icon: <FaLeaf />,
      id: 'rain-on-leaves',
      label: 'Rain on Leaves',
      dataI18n: 'sounds.rain.rainOnLeaves',
      src: getAssetPath('/sounds/rain/rain-on-leaves.mp3'),
    },
  ],
  title: 'Rain',
  dataI18n: 'categories.rain',
};
