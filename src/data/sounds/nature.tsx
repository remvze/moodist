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
      dataI18n: 'sounds.nature.river',
      src: getAssetPath('/sounds/nature/river.mp3'),
    },
    {
      icon: <FaWater />,
      id: 'waves',
      label: 'Waves',
      dataI18n: 'sounds.nature.waves',
      src: getAssetPath('/sounds/nature/waves.mp3'),
    },
    {
      icon: <BsFire />,
      id: 'campfire',
      label: 'Campfire',
      dataI18n: 'sounds.nature.campfire',
      src: getAssetPath('/sounds/nature/campfire.mp3'),
    },
    {
      icon: <FaWind />,
      id: 'wind',
      label: 'Wind',
      dataI18n: 'sounds.nature.wind',
      src: getAssetPath('/sounds/nature/wind.mp3'),
    },
    {
      icon: <FaWind />,
      id: 'howling-wind',
      label: 'Howling Wind',
      dataI18n: 'sounds.nature.howlingWind',
      src: getAssetPath('/sounds/nature/howling-wind.mp3'),
    },
    {
      icon: <BiSolidTree />,
      id: 'wind-in-trees',
      label: 'Wind in Trees',
      dataI18n: 'sounds.nature.windInTrees',
      src: getAssetPath('/sounds/nature/wind-in-trees.mp3'),
    },
    {
      icon: <GiWaterfall />,
      id: 'waterfall',
      label: 'Waterfall',
      dataI18n: 'sounds.nature.waterfall',
      src: getAssetPath('/sounds/nature/waterfall.mp3'),
    },
    {
      icon: <FaRegSnowflake />,
      id: 'walk-in-snow',
      label: 'Walk in Snow',
      dataI18n: 'sounds.nature.walkInSnow',
      src: getAssetPath('/sounds/nature/walk-in-snow.mp3'),
    },
    {
      icon: <FaLeaf />,
      id: 'walk-on-leaves',
      label: 'Walk on Leaves',
      dataI18n: 'sounds.nature.walkOnLeaves',
      src: getAssetPath('/sounds/nature/walk-on-leaves.mp3'),
    },
    {
      icon: <GiStonePile />,
      id: 'walk-on-gravel',
      label: 'Walk on Gravel',
      dataI18n: 'sounds.nature.walkOnGravel',
      src: getAssetPath('/sounds/nature/walk-on-gravel.mp3'),
    },
    {
      icon: <BsFillDropletFill />,
      id: 'droplets',
      label: 'Droplets',
      dataI18n: 'sounds.nature.droplets',
      src: getAssetPath('/sounds/nature/droplets.mp3'),
    },
    {
      icon: <FaTree />,
      id: 'jungle',
      label: 'Jungle',
      dataI18n: 'sounds.nature.jungle',
      src: getAssetPath('/sounds/nature/jungle.mp3'),
    },
  ],
  title: 'Nature',
  dataI18n: 'categories.nature',
};
