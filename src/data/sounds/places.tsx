import { BiSolidCoffeeAlt, BiSolidPlaneAlt } from 'react-icons/bi/index';
import { FaChurch, FaSubway } from 'react-icons/fa/index';
import { TbScubaMask, TbBeerFilled } from 'react-icons/tb/index';
import { GiVillage } from 'react-icons/gi/index';
import {
  MdTempleBuddhist,
  MdConstruction,
  MdLocationPin,
} from 'react-icons/md/index';
import { HiOfficeBuilding } from 'react-icons/hi/index';

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
    {
      icon: <TbScubaMask />,
      id: 'underwater',
      label: 'Underwater',
      src: '/sounds/places/underwater.mp3',
    },
    {
      icon: <TbBeerFilled />,
      id: 'crowded-bar',
      label: 'Crowded Bar',
      src: '/sounds/places/crowded-bar.mp3',
    },
    {
      icon: <GiVillage />,
      id: 'night-village',
      label: 'Night Village',
      src: '/sounds/places/night-village.mp3',
    },
    {
      icon: <FaSubway />,
      id: 'subway-station',
      label: 'Subway Station',
      src: '/sounds/places/subway-station.mp3',
    },
    {
      icon: <HiOfficeBuilding />,
      id: 'office',
      label: 'Office',
      src: '/sounds/places/office.mp3',
    },
  ],
  title: 'Places',
};
