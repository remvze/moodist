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

export const places: Category = {
  icon: <MdLocationPin />,
  id: 'places',
  // 修改
  sounds: [
    {
      icon: <BiSolidCoffeeAlt />,
      id: 'cafe',
      labelKey: 'sounds.places.cafe',
      src: '/sounds/places/cafe.mp3',
    },
    {
      icon: <BiSolidPlaneAlt />,
      id: 'airport',
      labelKey: 'sounds.places.airport',
      src: '/sounds/places/airport.mp3',
    },
    {
      icon: <FaChurch />,
      id: 'church',
      labelKey: 'sounds.places.church',
      src: '/sounds/places/church.mp3',
    },
    {
      icon: <MdTempleBuddhist />,
      id: 'temple',
      labelKey: 'sounds.places.temple',
      src: '/sounds/places/temple.mp3',
    },
    {
      icon: <MdConstruction />,
      id: 'construction-site',
      labelKey: 'sounds.places.construction-site',
      src: '/sounds/places/construction-site.mp3',
    },
    {
      icon: <TbScubaMask />,
      id: 'underwater',
      labelKey: 'sounds.places.underwater',
      src: '/sounds/places/underwater.mp3',
    },
    {
      icon: <TbBeerFilled />,
      id: 'crowded-bar',
      labelKey: 'sounds.places.crowded-bar',
      src: '/sounds/places/crowded-bar.mp3',
    },
    {
      icon: <GiVillage />,
      id: 'night-village',
      labelKey: 'sounds.places.night-village',
      src: '/sounds/places/night-village.mp3',
    },
    {
      icon: <FaSubway />,
      id: 'subway-station',
      labelKey: 'sounds.places.subway-station',
      src: '/sounds/places/subway-station.mp3',
    },
    {
      icon: <HiOfficeBuilding />,
      id: 'office',
      labelKey: 'sounds.places.office',
      src: '/sounds/places/office.mp3',
    },
    {
      icon: <FaShoppingBasket />,
      id: 'supermarket',
      labelKey: 'sounds.places.supermarket',
      src: '/sounds/places/supermarket.mp3',
    },
    {
      icon: <GiCarousel />,
      id: 'carousel',
      labelKey: 'sounds.places.carousel',
      src: '/sounds/places/carousel.mp3',
    },
    {
      icon: <AiFillExperiment />,
      id: 'laboratory',
      labelKey: 'sounds.places.laboratory',
      src: '/sounds/places/laboratory.mp3',
    },
    {
      icon: <BiSolidDryer />,
      id: 'laundry-room',
      labelKey: 'sounds.places.laundry-room',
      src: '/sounds/places/laundry-room.mp3',
    },
    {
      icon: <IoRestaurant />,
      id: 'restaurant',
      labelKey: 'sounds.places.restaurant',
      src: '/sounds/places/restaurant.mp3',
    },
    {
      icon: <FaBookOpen />,
      id: 'library',
      labelKey: 'sounds.places.library',
      src: '/sounds/places/library.mp3',
    },
  ],
  titleKey: 'sounds.places.title',
};
