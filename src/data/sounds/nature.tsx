import { GiWaterfall, GiStonePile } from 'react-icons/gi/index';
import { BsFire, BsFillDropletFill } from 'react-icons/bs/index';
import { BiSolidTree, BiWater } from 'react-icons/bi/index';
import {
  FaWater,
  FaWind,
  FaLeaf,
  FaRegSnowflake,
  FaTree,
} from 'react-icons/fa/index';

import type { Category } from '../types';

export const nature: Category = {
  icon: <BiSolidTree />,
  id: 'nature',
  // 修改
  sounds: [
    {
      icon: <BiWater />,
      id: 'river',
      labelKey: 'sounds.nature.river',
      src: '/sounds/nature/river.mp3',
    },
    {
      icon: <FaWater />,
      id: 'waves',
      labelKey: 'sounds.nature.waves',
      src: '/sounds/nature/waves.mp3',
    },
    {
      icon: <BsFire />,
      id: 'campfire',
      labelKey: 'sounds.nature.campfire',
      src: '/sounds/nature/campfire.mp3',
    },
    {
      icon: <FaWind />,
      id: 'wind',
      labelKey: 'sounds.nature.wind',
      src: '/sounds/nature/wind.mp3',
    },
    {
      icon: <FaWind />,
      id: 'howling-wind',
      labelKey: 'sounds.nature.howling-wind',
      src: '/sounds/nature/howling-wind.mp3',
    },
    {
      icon: <BiSolidTree />,
      id: 'wind-in-trees',
      labelKey: 'sounds.nature.wind-in-trees',
      src: '/sounds/nature/wind-in-trees.mp3',
    },
    {
      icon: <GiWaterfall />,
      id: 'waterfall',
      labelKey: 'sounds.nature.waterfall',
      src: '/sounds/nature/waterfall.mp3',
    },
    {
      icon: <FaRegSnowflake />,
      id: 'walk-in-snow',
      labelKey: 'sounds.nature.walk-in-snow',
      src: '/sounds/nature/walk-in-snow.mp3',
    },
    {
      icon: <FaLeaf />,
      id: 'walk-on-leaves',
      labelKey: 'sounds.nature.walk-on-leaves',
      src: '/sounds/nature/walk-on-leaves.mp3',
    },
    {
      icon: <GiStonePile />,
      id: 'walk-on-gravel',
      labelKey: 'sounds.nature.walk-on-gravel',
      src: '/sounds/nature/walk-on-gravel.mp3',
    },
    {
      icon: <BsFillDropletFill />,
      id: 'droplets',
      labelKey: 'sounds.nature.droplets',
      src: '/sounds/nature/droplets.mp3',
    },
    {
      icon: <FaTree />,
      id: 'jungle',
      labelKey: 'sounds.nature.jungle',
      src: '/sounds/nature/jungle.mp3',
    },
  ],
  titleKey: 'sounds.nature.title',
};
