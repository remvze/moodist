import {
  GiCricket,
  GiSeagull,
  GiWindow,
  GiWaterfall,
  GiWolfHead,
  GiOwl,
} from 'react-icons/gi/index';
import {
  BsFire,
  // BsSoundwave,
  BsFillCloudRainFill,
  BsFillCloudRainHeavyFill,
  BsUmbrellaFill,
} from 'react-icons/bs/index';
import { BiSolidTree, BiWater } from 'react-icons/bi/index';
import { FaWater, FaWind, FaLeaf, FaDog, FaFrog } from 'react-icons/fa/index';
import { PiBirdFill, PiTentFill } from 'react-icons/pi/index';
import { MdOutlineThunderstorm } from 'react-icons/md/index';
import { TbScubaMask } from 'react-icons/tb/index';

// const defaultIcon = <BsSoundwave />;

import type { Categories } from './types';

export const sounds: {
  categories: Categories;
} = {
  categories: [
    {
      icon: <BiSolidTree />,
      id: 'nature',
      sounds: [
        {
          icon: <BiWater />,
          id: 'river',
          label: 'River',
          src: '/sounds/nature/river.mp3',
        },
        {
          icon: <FaWater />,
          id: 'waves',
          label: 'waves',
          src: '/sounds/nature/waves.mp3',
        },
        {
          icon: <BsFire />,
          id: 'campfire',
          label: 'Campfire',
          src: '/sounds/nature/campfire.mp3',
        },
        {
          icon: <FaWind />,
          id: 'wind',
          label: 'Wind',
          src: '/sounds/nature/wind.mp3',
        },
        {
          icon: <FaWind />,
          id: 'wind-in-trees',
          label: 'Wind in Trees',
          src: '/sounds/nature/wind-in-trees.mp3',
        },
        {
          icon: <GiWaterfall />,
          id: 'waterfall',
          label: 'Waterfall',
          src: '/sounds/nature/waterfall.mp3',
        },
        {
          icon: <TbScubaMask />,
          id: 'underwater',
          label: 'Underwater',
          src: '/sounds/nature/underwater.mp3',
        },
      ],
      title: 'Nature',
    },
    {
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
    },
    {
      icon: <FaDog />,
      id: 'animals',
      sounds: [
        {
          icon: <PiBirdFill />,
          id: 'birds',
          label: 'Birds',
          src: '/sounds/animals/birds.mp3',
        },
        {
          icon: <GiSeagull />,
          id: 'seagulls',
          label: 'Seagulls',
          src: '/sounds/animals/seagulls.mp3',
        },
        {
          icon: <GiCricket />,
          id: 'crickets',
          label: 'Crickets',
          src: '/sounds/animals/crickets.mp3',
        },
        {
          icon: <GiWolfHead />,
          id: 'wolf',
          label: 'Wolf',
          src: '/sounds/animals/wolf.mp3',
        },
        {
          icon: <GiOwl />,
          id: 'owl',
          label: 'Owl',
          src: '/sounds/animals/owl.mp3',
        },
        {
          icon: <FaFrog />,
          id: 'frog',
          label: 'Frog',
          src: '/sounds/animals/frog.mp3',
        },
      ],
      title: 'Animals',
    },
  ],
};
