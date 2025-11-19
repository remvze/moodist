import { BiSolidTrain, BiSolidPlaneAlt } from 'react-icons/bi/index';
import { FaCarSide } from 'react-icons/fa/index';
import { GiSubmarine, GiSailboat } from 'react-icons/gi/index';
import { TbSailboat } from 'react-icons/tb/index';

import type { Category } from '../types';

import { getAssetPath } from '@/helpers/path';

export const transport: Category = {
  icon: <FaCarSide />,
  id: 'transport',
  sounds: [
    {
      icon: <BiSolidTrain />,
      id: 'train',
      label: 'Train',
      dataI18n: 'sounds.transport.train',
      src: getAssetPath('/sounds/transport/train.mp3'),
    },
    {
      icon: <BiSolidTrain />,
      id: 'inside-a-train',
      label: 'Inside a Train',
      dataI18n: 'sounds.transport.insideTrain',
      src: getAssetPath('/sounds/transport/inside-a-train.mp3'),
    },
    {
      icon: <BiSolidPlaneAlt />,
      id: 'airplane',
      label: 'Airplane',
      dataI18n: 'sounds.transport.airplane',
      src: getAssetPath('/sounds/transport/airplane.mp3'),
    },
    {
      icon: <GiSubmarine />,
      id: 'submarine',
      label: 'Submarine',
      dataI18n: 'sounds.transport.submarine',
      src: getAssetPath('/sounds/transport/submarine.mp3'),
    },
    {
      icon: <GiSailboat />,
      id: 'sailboat',
      label: 'Sailboat',
      dataI18n: 'sounds.transport.sailboat',
      src: getAssetPath('/sounds/transport/sailboat.mp3'),
    },
    {
      icon: <TbSailboat />,
      id: 'rowing-boat',
      label: 'Rowing Boat',
      dataI18n: 'sounds.transport.rowingBoat',
      src: getAssetPath('/sounds/transport/rowing-boat.mp3'),
    },
  ],
  title: 'Transport',
  dataI18n: 'categories.transport',
};
