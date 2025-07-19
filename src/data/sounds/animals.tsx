import {
  GiCricket,
  GiSeagull,
  GiWolfHead,
  GiOwl,
  GiWhaleTail,
  GiTreeBeehive,
  GiEgyptianBird,
  GiChicken,
  GiCow,
  GiSheep,
} from 'react-icons/gi/index';
import {
  FaDog,
  FaFrog,
  FaHorseHead,
  FaCat,
  FaCrow,
} from 'react-icons/fa/index';
import { PiBirdFill, PiDogBold } from 'react-icons/pi/index';

import type { Category } from '../types';

import { getAssetPath } from '@/helpers/path';

export const animals: Category = {
  icon: <FaDog />,
  id: 'animals',
  sounds: [
    {
      icon: <PiBirdFill />,
      id: 'birds',
      label: 'Birds',
      src: getAssetPath('/sounds/animals/birds.mp3'),
    },
    {
      icon: <GiSeagull />,
      id: 'seagulls',
      label: 'Seagulls',
      src: getAssetPath('/sounds/animals/seagulls.mp3'),
    },
    {
      icon: <GiCricket />,
      id: 'crickets',
      label: 'Crickets',
      src: getAssetPath('/sounds/animals/crickets.mp3'),
    },
    {
      icon: <GiWolfHead />,
      id: 'wolf',
      label: 'Wolf',
      src: getAssetPath('/sounds/animals/wolf.mp3'),
    },
    {
      icon: <GiOwl />,
      id: 'owl',
      label: 'Owl',
      src: getAssetPath('/sounds/animals/owl.mp3'),
    },
    {
      icon: <FaFrog />,
      id: 'frog',
      label: 'Frog',
      src: getAssetPath('/sounds/animals/frog.mp3'),
    },
    {
      icon: <PiDogBold />,
      id: 'dog-barking',
      label: 'Dog Barking',
      src: getAssetPath('/sounds/animals/dog-barking.mp3'),
    },
    {
      icon: <FaHorseHead />,
      id: 'horse-gallop',
      label: 'Horse Gallop',
      src: getAssetPath('/sounds/animals/horse-gallop.mp3'),
    },
    {
      icon: <FaCat />,
      id: 'cat-purring',
      label: 'Cat Purring',
      src: getAssetPath('/sounds/animals/cat-purring.mp3'),
    },
    {
      icon: <FaCrow />,
      id: 'crows',
      label: 'Crows',
      src: getAssetPath('/sounds/animals/crows.mp3'),
    },
    {
      icon: <GiWhaleTail />,
      id: 'whale',
      label: 'Whale',
      src: getAssetPath('/sounds/animals/whale.mp3'),
    },
    {
      icon: <GiTreeBeehive />,
      id: 'beehive',
      label: 'Beehive',
      src: getAssetPath('/sounds/animals/beehive.mp3'),
    },
    {
      icon: <GiEgyptianBird />,
      id: 'woodpecker',
      label: 'Woodpecker',
      src: getAssetPath('/sounds/animals/woodpecker.mp3'),
    },
    {
      icon: <GiChicken />,
      id: 'chickens',
      label: 'Chickens',
      src: getAssetPath('/sounds/animals/chickens.mp3'),
    },
    {
      icon: <GiCow />,
      id: 'cows',
      label: 'Cows',
      src: getAssetPath('/sounds/animals/cows.mp3'),
    },
    {
      icon: <GiSheep />,
      id: 'sheep',
      label: 'Sheep',
      src: getAssetPath('/sounds/animals/sheep.mp3'),
    },
  ],
  title: 'Animals',
};
