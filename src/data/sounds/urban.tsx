import { BiSolidTraffic } from 'react-icons/bi/index';
import { FaCity, FaRoad } from 'react-icons/fa/index';
import { PiRoadHorizonFill, PiSirenBold } from 'react-icons/pi/index';
import { BsSoundwave, BsPeopleFill } from 'react-icons/bs/index';
import { RiSparkling2Fill } from 'react-icons/ri/index';

import type { Category } from '../types';

export const urban: Category = {
  icon: <FaCity />,
  id: 'urban',
  // 修改
  sounds: [
    {
      icon: <PiRoadHorizonFill />,
      id: 'highway',
      labelKey: 'sounds.urban.highway',
      src: '/sounds/urban/highway.mp3',
    },
    {
      icon: <FaRoad />,
      id: 'road',
      labelKey: 'sounds.urban.road',
      src: '/sounds/urban/road.mp3',
    },
    {
      icon: <PiSirenBold />,
      id: 'ambulance-siren',
      labelKey: 'sounds.urban.ambulance-siren',
      src: '/sounds/urban/ambulance-siren.mp3',
    },
    {
      icon: <BsSoundwave />,
      id: 'busy-street',
      labelKey: 'sounds.urban.busy-street',
      src: '/sounds/urban/busy-street.mp3',
    },
    {
      icon: <BsPeopleFill />,
      id: 'crowd',
      labelKey: 'sounds.urban.crowd',
      src: '/sounds/urban/crowd.mp3',
    },
    {
      icon: <BiSolidTraffic />,
      id: 'traffic',
      labelKey: 'sounds.urban.traffic',
      src: '/sounds/urban/traffic.mp3',
    },
    {
      icon: <RiSparkling2Fill />,
      id: 'fireworks',
      labelKey: 'sounds.urban.fireworks',
      src: '/sounds/urban/fireworks.mp3',
    },
  ],
  titleKey: 'sounds.urban.title',
};
