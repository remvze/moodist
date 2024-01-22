import { GiWindchimes, GiFilmProjector } from 'react-icons/gi/index';
import { BsFillKeyboardFill } from 'react-icons/bs/index';
import { FaKeyboard, FaClock, FaFan } from 'react-icons/fa/index';
import { MdSmartToy } from 'react-icons/md/index';
import { TbBowlFilled } from 'react-icons/tb/index';
import { RiFilePaper2Fill } from 'react-icons/ri/index';
import { BiSolidDryer } from 'react-icons/bi/index';

import type { Category } from '../types';

export const things: Category = {
  icon: <MdSmartToy />,
  id: 'things',
  sounds: [
    {
      icon: <BsFillKeyboardFill />,
      id: 'keyboard',
      label: 'Keyboard',
      src: '/sounds/things/keyboard.mp3',
    },
    {
      icon: <FaKeyboard />,
      id: 'typewriter',
      label: 'Typewriter',
      src: '/sounds/things/typewriter.mp3',
    },
    {
      icon: <RiFilePaper2Fill />,
      id: 'paper',
      label: 'Paper',
      src: '/sounds/things/paper.mp3',
    },
    {
      icon: <FaClock />,
      id: 'clock',
      label: 'Clock',
      src: '/sounds/things/clock.mp3',
    },
    {
      icon: <GiWindchimes />,
      id: 'wind-chimes',
      label: 'Wind Chimes',
      src: '/sounds/things/wind-chimes.mp3',
    },
    {
      icon: <TbBowlFilled />,
      id: 'singing-bowl',
      label: 'Singing Bowl',
      src: '/sounds/things/singing-bowl.mp3',
    },
    {
      icon: <FaFan />,
      id: 'ceiling-fan',
      label: 'Ceiling Fan',
      src: '/sounds/things/ceiling-fan.mp3',
    },
    {
      icon: <BiSolidDryer />,
      id: 'dryer',
      label: 'Dryer',
      src: '/sounds/things/dryer.mp3',
    },
    {
      icon: <GiFilmProjector />,
      id: 'slide-projector',
      label: 'Slide Projector',
      src: '/sounds/things/slide-projector.mp3',
    },
  ],
  title: 'Things',
};
