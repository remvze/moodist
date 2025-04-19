import { BiSolidTrain, BiSolidPlaneAlt } from 'react-icons/bi/index';
import { FaCarSide } from 'react-icons/fa/index';
import { GiSubmarine, GiSailboat } from 'react-icons/gi/index';
import { TbSailboat } from 'react-icons/tb/index';

import type { Category } from '../types';

export const transport: Category = {
  icon: <FaCarSide />,
  id: 'transport',
  // 修改
  sounds: [
    {
      icon: <BiSolidTrain />,
      id: 'train',
      labelKey: 'sounds.transport.train',
      src: '/sounds/transport/train.mp3',
    },
    {
      icon: <BiSolidTrain />,
      id: 'inside-a-train',
      labelKey: 'sounds.transport.inside-a-train',
      src: '/sounds/transport/inside-a-train.mp3',
    },
    {
      icon: <BiSolidPlaneAlt />,
      id: 'airplane',
      labelKey: 'sounds.transport.airplane',
      src: '/sounds/transport/airplane.mp3',
    },
    {
      icon: <GiSubmarine />,
      id: 'submarine',
      labelKey: 'sounds.transport.submarine',
      src: '/sounds/transport/submarine.mp3',
    },
    {
      icon: <GiSailboat />,
      id: 'sailboat',
      labelKey: 'sounds.transport.sailboat',
      src: '/sounds/transport/sailboat.mp3',
    },
    {
      icon: <TbSailboat />,
      id: 'rowing-boat',
      labelKey: 'sounds.transport.rowing-boat',
      src: '/sounds/transport/rowing-boat.mp3',
    },
  ],
  titleKey: 'sounds.transport.title',
};
