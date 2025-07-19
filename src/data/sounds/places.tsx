import {
  BiSolidCoffeeAlt,
  BiSolidPlaneAlt,
  BiSolidDryer,
} from 'react-icons/bi/index';
import { FaChurch, FaSubway, FaShoppingBasket } from 'react-icons/fa/index';
import { TbScubaMask, TbBeerFilled } from 'react-icons/tb/index';
import { GiVillage, GiCarousel } from 'react-icons/gi/index';
import {
  MdTempleBuddhist,
  MdConstruction,
  MdLocationPin,
} from 'react-icons/md/index';
import { HiOfficeBuilding } from 'react-icons/hi/index';
import { AiFillExperiment } from 'react-icons/ai/index';
import { IoRestaurant } from 'react-icons/io5/index';
import { FaBookOpen } from 'react-icons/fa6/index';

import type { Category } from '../types';

import { getAssetPath } from '@/helpers/path';

export const places: Category = {
  icon: <MdLocationPin />,
  id: 'places',
  sounds: [
    {
      icon: <BiSolidCoffeeAlt />,
      id: 'cafe',
      label: 'Cafe',
      src: getAssetPath('/sounds/places/cafe.mp3'),
    },
    {
      icon: <BiSolidPlaneAlt />,
      id: 'airport',
      label: 'Airport',
      src: getAssetPath('/sounds/places/airport.mp3'),
    },
    {
      icon: <FaChurch />,
      id: 'church',
      label: 'Church',
      src: getAssetPath('/sounds/places/church.mp3'),
    },
    {
      icon: <MdTempleBuddhist />,
      id: 'temple',
      label: 'Temple',
      src: getAssetPath('/sounds/places/temple.mp3'),
    },
    {
      icon: <MdConstruction />,
      id: 'construction-site',
      label: 'Construction Site',
      src: getAssetPath('/sounds/places/construction-site.mp3'),
    },
    {
      icon: <TbScubaMask />,
      id: 'underwater',
      label: 'Underwater',
      src: getAssetPath('/sounds/places/underwater.mp3'),
    },
    {
      icon: <TbBeerFilled />,
      id: 'crowded-bar',
      label: 'Crowded Bar',
      src: getAssetPath('/sounds/places/crowded-bar.mp3'),
    },
    {
      icon: <GiVillage />,
      id: 'night-village',
      label: 'Night Village',
      src: getAssetPath('/sounds/places/night-village.mp3'),
    },
    {
      icon: <FaSubway />,
      id: 'subway-station',
      label: 'Subway Station',
      src: getAssetPath('/sounds/places/subway-station.mp3'),
    },
    {
      icon: <HiOfficeBuilding />,
      id: 'office',
      label: 'Office',
      src: getAssetPath('/sounds/places/office.mp3'),
    },
    {
      icon: <FaShoppingBasket />,
      id: 'supermarket',
      label: 'Supermarket',
      src: getAssetPath('/sounds/places/supermarket.mp3'),
    },
    {
      icon: <GiCarousel />,
      id: 'carousel',
      label: 'Carousel',
      src: getAssetPath('/sounds/places/carousel.mp3'),
    },
    {
      icon: <AiFillExperiment />,
      id: 'laboratory',
      label: 'Laboratory',
      src: getAssetPath('/sounds/places/laboratory.mp3'),
    },
    {
      icon: <BiSolidDryer />,
      id: 'laundry-room',
      label: 'Laundry Room',
      src: getAssetPath('/sounds/places/laundry-room.mp3'),
    },
    {
      icon: <IoRestaurant />,
      id: 'restaurant',
      label: 'Restaurant',
      src: getAssetPath('/sounds/places/restaurant.mp3'),
    },
    {
      icon: <FaBookOpen />,
      id: 'library',
      label: 'Library',
      src: getAssetPath('/sounds/places/library.mp3'),
    },
  ],
  title: 'Places',
};
