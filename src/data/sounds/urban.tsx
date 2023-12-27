import {
  BiSolidCoffeeAlt,
  BiSolidTrain,
  BiSolidPlaneAlt,
} from 'react-icons/bi/index';
import { FaCity, FaRoad, FaChurch } from 'react-icons/fa/index';
import { PiRoadHorizonFill, PiSirenBold } from 'react-icons/pi/index';
import { MdTempleBuddhist } from 'react-icons/md';
import { BsSoundwave } from 'react-icons/bs/index';

import type { Category } from '../types';

export const urban: Category = {
  icon: <FaCity />,
  id: 'urban',
  sounds: [
    {
      icon: <BiSolidCoffeeAlt />,
      id: 'cafe',
      label: 'Cafe',
      src: '/sounds/urban/cafe.mp3',
    },
    {
      icon: <PiRoadHorizonFill />,
      id: 'highway',
      label: 'Highway',
      src: '/sounds/urban/highway.mp3',
    },
    {
      icon: <FaRoad />,
      id: 'road',
      label: 'Road',
      src: '/sounds/urban/road.mp3',
    },
    {
      icon: <PiSirenBold />,
      id: 'ambulance-siren',
      label: 'Ambulance Siren',
      src: '/sounds/urban/ambulance-siren.mp3',
    },
    {
      icon: <BiSolidTrain />,
      id: 'train',
      label: 'Train',
      src: '/sounds/urban/train.mp3',
    },
    {
      icon: <BiSolidTrain />,
      id: 'inside-a-train',
      label: 'Inside a Train',
      src: '/sounds/urban/inside-a-train.mp3',
    },
    {
      icon: <BiSolidPlaneAlt />,
      id: 'airport',
      label: 'Airport',
      src: '/sounds/urban/airport.mp3',
    },
    {
      icon: <BiSolidPlaneAlt />,
      id: 'airplane',
      label: 'Airplane',
      src: '/sounds/urban/airplane.mp3',
    },
    {
      icon: <FaChurch />,
      id: 'church',
      label: 'Church',
      src: '/sounds/urban/church.mp3',
    },
    {
      icon: <MdTempleBuddhist />,
      id: 'temple',
      label: 'Temple',
      src: '/sounds/urban/temple.mp3',
    },
    {
      icon: <BsSoundwave />,
      id: 'busy-street',
      label: 'Busy Street',
      src: '/sounds/urban/busy-street.mp3',
    },
  ],
  title: 'Urban',
};
