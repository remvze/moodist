import { BiSolidCoffeeAlt, BiSolidPlaneAlt } from 'react-icons/bi/index';
import { FaChurch } from 'react-icons/fa/index';
import {
  MdTempleBuddhist,
  MdConstruction,
  MdLocationPin,
} from 'react-icons/md/index';

import type { Category } from '../types';

export const places: Category = {
  icon: <MdLocationPin />,
  id: 'places',
  sounds: [
    {
      icon: <BiSolidCoffeeAlt />,
      id: 'cafe',
      label: 'Cafe',
      src: '/sounds/places/cafe.mp3',
    },
    {
      icon: <BiSolidPlaneAlt />,
      id: 'airport',
      label: 'Airport',
      src: '/sounds/places/airport.mp3',
    },
    {
      icon: <FaChurch />,
      id: 'church',
      label: 'Church',
      src: '/sounds/places/church.mp3',
    },
    {
      icon: <MdTempleBuddhist />,
      id: 'temple',
      label: 'Temple',
      src: '/sounds/places/temple.mp3',
    },
    {
      icon: <MdConstruction />,
      id: 'construction-site',
      label: 'Construction Site',
      src: '/sounds/places/construction-site.mp3',
    },
  ],
  title: 'Places',
};
