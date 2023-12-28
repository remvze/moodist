import { BiSolidTrain, BiSolidPlaneAlt } from 'react-icons/bi/index';
import { FaCarSide } from 'react-icons/fa/index';
import { GiSubmarine, GiSailboat } from 'react-icons/gi/index';
import { TbSailboat } from 'react-icons/tb/index';

import type { Category } from '../types';

export const transport: Category = {
  icon: <FaCarSide />,
  id: 'transport',
  sounds: [
    {
      icon: <BiSolidTrain />,
      id: 'train',
      label: 'Train',
      src: '/sounds/transport/train.mp3',
    },
    {
      icon: <BiSolidTrain />,
      id: 'inside-a-train',
      label: 'Inside a Train',
      src: '/sounds/transport/inside-a-train.mp3',
    },
    {
      icon: <BiSolidPlaneAlt />,
      id: 'airplane',
      label: 'Airplane',
      src: '/sounds/transport/airplane.mp3',
    },
    {
      icon: <GiSubmarine />,
      id: 'submarine',
      label: 'Submarine',
      src: '/sounds/transport/submarine.mp3',
    },
    {
      icon: <GiSailboat />,
      id: 'sailboat',
      label: 'Sailboat',
      src: '/sounds/transport/sailboat.mp3',
    },
    {
      icon: <TbSailboat />,
      id: 'rowing-boat',
      label: 'Rowing Boat',
      src: '/sounds/transport/rowing-boat.mp3',
    },
  ],
  title: 'Transport',
};
