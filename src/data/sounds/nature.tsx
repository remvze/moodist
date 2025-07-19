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

import { getAssetPath } from '@/helpers/path';

export const nature: Category = {
  icon: <BiSolidTree />,
  id: 'nature',
  sounds: [
    {
      icon: <BiWater />,
      id: 'river',
      label: 'River',
      src: getAssetPath('/sounds/nature/river.mp3'),
    },
    {
      icon: <FaWater />,
      id: 'waves',
      label: 'Waves',
      src: getAssetPath('/sounds/nature/waves.mp3'),
    },
    {
      icon: <BsFire />,
      id: 'campfire',
      label: 'Campfire',
      src: getAssetPath('/sounds/nature/campfire.mp3'),
    },
    {
      icon: <FaWind />,
      id: 'wind',
      label: 'Wind',
      src: getAssetPath('/sounds/nature/wind.mp3'),
    },
    {
      icon: <FaWind />,
      id: 'howling-wind',
      label: 'Howling Wind',
      src: getAssetPath('/sounds/nature/howling-wind.mp3'),
    },
    {
      icon: <BiSolidTree />,
      id: 'wind-in-trees',
      label: 'Wind in Trees',
      src: getAssetPath('/sounds/nature/wind-in-trees.mp3'),
    },
    {
      icon: <GiWaterfall />,
      id: 'waterfall',
      label: 'Waterfall',
      src: getAssetPath('/sounds/nature/waterfall.mp3'),
    },
    {
      icon: <FaRegSnowflake />,
      id: 'walk-in-snow',
      label: 'Walk in Snow',
      src: getAssetPath('/sounds/nature/walk-in-snow.mp3'),
    },
    {
      icon: <FaLeaf />,
      id: 'walk-on-leaves',
      label: 'Walk on Leaves',
      src: getAssetPath('/sounds/nature/walk-on-leaves.mp3'),
    },
    {
      icon: <GiStonePile />,
      id: 'walk-on-gravel',
      label: 'Walk on Gravel',
      src: getAssetPath('/sounds/nature/walk-on-gravel.mp3'),
    },
    {
      icon: <BsFillDropletFill />,
      id: 'droplets',
      label: 'Droplets',
      src: getAssetPath('/sounds/nature/droplets.mp3'),
    },
    {
      icon: <FaTree />,
      id: 'jungle',
      label: 'Jungle',
      src: getAssetPath('/sounds/nature/jungle.mp3'),
    },
  ],
  title: 'Nature',
};
