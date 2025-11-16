import { BiSolidTraffic } from 'react-icons/bi/index';
import { FaCity, FaRoad } from 'react-icons/fa/index';
import { PiRoadHorizonFill, PiSirenBold } from 'react-icons/pi/index';
import { BsSoundwave, BsPeopleFill } from 'react-icons/bs/index';
import { RiSparkling2Fill } from 'react-icons/ri/index';

import type { Category } from '../types';

import { getAssetPath } from '@/helpers/path';

export const urban: Category = {
  icon: <FaCity />,
  id: 'urban',
  sounds: [
    {
      icon: <PiRoadHorizonFill />,
      id: 'highway',
      label: 'Highway',
      dataI18n: 'sounds.urban.highway',
      src: getAssetPath('/sounds/urban/highway.mp3'),
    },
    {
      icon: <FaRoad />,
      id: 'road',
      label: 'Road',
      dataI18n: 'sounds.urban.road',
      src: getAssetPath('/sounds/urban/road.mp3'),
    },
    {
      icon: <PiSirenBold />,
      id: 'ambulance-siren',
      label: 'Ambulance Siren',
      dataI18n: 'sounds.urban.ambulanceSiren',
      src: getAssetPath('/sounds/urban/ambulance-siren.mp3'),
    },
    {
      icon: <BsSoundwave />,
      id: 'busy-street',
      label: 'Busy Street',
      dataI18n: 'sounds.urban.busyStreet',
      src: getAssetPath('/sounds/urban/busy-street.mp3'),
    },
    {
      icon: <BsPeopleFill />,
      id: 'crowd',
      label: 'Crowd',
      dataI18n: 'sounds.urban.crowd',
      src: getAssetPath('/sounds/urban/crowd.mp3'),
    },
    {
      icon: <BiSolidTraffic />,
      id: 'traffic',
      label: 'Traffic',
      dataI18n: 'sounds.urban.traffic',
      src: getAssetPath('/sounds/urban/traffic.mp3'),
    },
    {
      icon: <RiSparkling2Fill />,
      id: 'fireworks',
      label: 'Fireworks',
      dataI18n: 'sounds.urban.fireworks',
      src: getAssetPath('/sounds/urban/fireworks.mp3'),
    },
  ],
  title: 'Urban',
  dataI18n: 'categories.urban',
};
