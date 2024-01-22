import { GiCricket, GiSeagull, GiWolfHead, GiOwl } from 'react-icons/gi/index';
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
    {
      icon: <PiDogBold />,
      id: 'dog-barking',
      label: 'Dog Barking',
      src: '/sounds/animals/dog-barking.mp3',
    },
    {
      icon: <FaHorseHead />,
      id: 'horse-galopp',
      label: 'Horse Galopp',
      src: '/sounds/animals/horse-galopp.mp3',
    },
    {
      icon: <FaCat />,
      id: 'cat-purring',
      label: 'Cat Purring',
      src: '/sounds/animals/cat-purring.mp3',
    },
    {
      icon: <FaCrow />,
      id: 'crows',
      label: 'Crows',
      src: '/sounds/animals/crows.mp3',
    },
  ],
  title: 'Animals',
};
