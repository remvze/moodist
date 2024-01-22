import { GiWaterfall } from 'react-icons/gi/index';
import { BsFire, BsFillDropletFill } from 'react-icons/bs/index';
import { BiSolidTree, BiWater } from 'react-icons/bi/index';
import { FaWater, FaWind, FaLeaf, FaRegSnowflake } from 'react-icons/fa/index';

import type { Category } from '../types';

export const nature: Category = {
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
      label: 'Waves',
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
      id: 'howling-wind',
      label: 'Howling Wind',
      src: '/sounds/nature/howling-wind.mp3',
    },
    {
      icon: <BiSolidTree />,
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
      icon: <FaRegSnowflake />,
      id: 'walk-in-snow',
      label: 'Walk in Snow',
      src: '/sounds/nature/walk-in-snow.mp3',
    },
    {
      icon: <FaLeaf />,
      id: 'walk-on-leaves',
      label: 'Walk on Leaves',
      src: '/sounds/nature/walk-on-leaves.mp3',
    },
    {
      icon: <BsFillDropletFill />,
      id: 'droplets',
      label: 'Droplets',
      src: '/sounds/nature/droplets.mp3',
    },
  ],
  title: 'Nature',
};
