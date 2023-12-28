import {
  BiSolidTrain,
  BiSolidPlaneAlt,
  BiSolidTraffic,
} from 'react-icons/bi/index';
import { FaCity, FaRoad } from 'react-icons/fa/index';
import { PiRoadHorizonFill, PiSirenBold } from 'react-icons/pi/index';
import { BsSoundwave, BsPeopleFill } from 'react-icons/bs/index';
import { GiSubmarine, GiSailboat } from 'react-icons/gi/index';

import type { Category } from '../types';

export const urban: Category = {
  icon: <FaCity />,
  id: 'urban',
  sounds: [
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
      id: 'airplane',
      label: 'Airplane',
      src: '/sounds/urban/airplane.mp3',
    },
    {
      icon: <BsSoundwave />,
      id: 'busy-street',
      label: 'Busy Street',
      src: '/sounds/urban/busy-street.mp3',
    },
    {
      icon: <GiSubmarine />,
      id: 'submarine',
      label: 'Submarine',
      src: '/sounds/urban/submarine.mp3',
    },
    {
      icon: <GiSailboat />,
      id: 'sailboat',
      label: 'Sailboat',
      src: '/sounds/urban/sailboat.mp3',
    },
    {
      icon: <BsPeopleFill />,
      id: 'crowd',
      label: 'Crowd',
      src: '/sounds/urban/crowd.mp3',
    },
    {
      icon: <BiSolidTraffic />,
      id: 'traffic',
      label: 'Traffic',
      src: '/sounds/urban/traffic.mp3',
    },
  ],
  title: 'Urban',
};
