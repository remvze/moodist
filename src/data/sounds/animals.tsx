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

export const animals: Category = {
  icon: <FaDog />,
  id: 'animals',
  // 修改
  sounds: [
    {
      icon: <PiBirdFill />,
      id: 'birds',
      labelKey: 'sounds.animals.birds',
      src: '/sounds/animals/birds.mp3',
    },
    {
      icon: <GiSeagull />,
      id: 'seagulls',
      labelKey: 'sounds.animals.seagulls',
      src: '/sounds/animals/seagulls.mp3',
    },
    {
      icon: <GiCricket />,
      id: 'crickets',
      labelKey: 'sounds.animals.crickets',
      src: '/sounds/animals/crickets.mp3',
    },
    {
      icon: <GiWolfHead />,
      id: 'wolf',
      labelKey: 'sounds.animals.wolf',
      src: '/sounds/animals/wolf.mp3',
    },
    {
      icon: <GiOwl />,
      id: 'owl',
      labelKey: 'sounds.animals.owl',
      src: '/sounds/animals/owl.mp3',
    },
    {
      icon: <FaFrog />,
      id: 'frog',
      labelKey: 'sounds.animals.frog',
      src: '/sounds/animals/frog.mp3',
    },
    {
      icon: <PiDogBold />,
      id: 'dog-barking',
      labelKey: 'sounds.animals.dog-barking',
      src: '/sounds/animals/dog-barking.mp3',
    },
    {
      icon: <FaHorseHead />,
      id: 'horse-galopp',
      labelKey: 'sounds.animals.horse-galopp',
      src: '/sounds/animals/horse-galopp.mp3',
    },
    {
      icon: <FaCat />,
      id: 'cat-purring',
      labelKey: 'sounds.animals.cat-purring',
      src: '/sounds/animals/cat-purring.mp3',
    },
    {
      icon: <FaCrow />,
      id: 'crows',
      labelKey: 'sounds.animals.crows',
      src: '/sounds/animals/crows.mp3',
    },
    {
      icon: <GiWhaleTail />,
      id: 'whale',
      labelKey: 'sounds.animals.whale',
      src: '/sounds/animals/whale.mp3',
    },
    {
      icon: <GiTreeBeehive />,
      id: 'beehive',
      labelKey: 'sounds.animals.beehive',
      src: '/sounds/animals/beehive.mp3',
    },
    {
      icon: <GiEgyptianBird />,
      id: 'woodpecker',
      labelKey: 'sounds.animals.woodpecker',
      src: '/sounds/animals/woodpecker.mp3',
    },
    {
      icon: <GiChicken />,
      id: 'chickens',
      labelKey: 'sounds.animals.chickens',
      src: '/sounds/animals/chickens.mp3',
    },
    {
      icon: <GiCow />,
      id: 'cows',
      labelKey: 'sounds.animals.cows',
      src: '/sounds/animals/cows.mp3',
    },
    {
      icon: <GiSheep />,
      id: 'sheep',
      labelKey: 'sounds.animals.sheep',
      src: '/sounds/animals/sheep.mp3',
    },
  ],
  titleKey: 'sounds.animals.title',
};
