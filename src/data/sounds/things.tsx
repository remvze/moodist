import {
  GiWindchimes,
  GiFilmProjector,
  GiWashingMachine,
} from 'react-icons/gi/index';
import { BsFillKeyboardFill } from 'react-icons/bs/index';
import { FaKeyboard, FaClock, FaFan } from 'react-icons/fa/index';
import { MdSmartToy, MdWaterDrop, MdRadio } from 'react-icons/md/index';
import { TbBowlFilled, TbWiper } from 'react-icons/tb/index';
import { RiFilePaper2Fill, RiBubbleChartFill } from 'react-icons/ri/index';
import { BiSolidDryer } from 'react-icons/bi/index';
import { IoIosRadio } from 'react-icons/io/index';
import { PiVinylRecord } from 'react-icons/pi/index';

import type { Category } from '../types';

export const things: Category = {
  icon: <MdSmartToy />,
  id: 'things',
  // 修改
  sounds: [
    {
      icon: <BsFillKeyboardFill />,
      id: 'keyboard',
      labelKey: 'sounds.things.keyboard',
      src: '/sounds/things/keyboard.mp3',
    },
    {
      icon: <FaKeyboard />,
      id: 'typewriter',
      labelKey: 'sounds.things.typewriter',
      src: '/sounds/things/typewriter.mp3',
    },
    {
      icon: <RiFilePaper2Fill />,
      id: 'paper',
      labelKey: 'sounds.things.paper',
      src: '/sounds/things/paper.mp3',
    },
    {
      icon: <FaClock />,
      id: 'clock',
      labelKey: 'sounds.things.clock',
      src: '/sounds/things/clock.mp3',
    },
    {
      icon: <GiWindchimes />,
      id: 'wind-chimes',
      labelKey: 'sounds.things.wind-chimes',
      src: '/sounds/things/wind-chimes.mp3',
    },
    {
      icon: <TbBowlFilled />,
      id: 'singing-bowl',
      labelKey: 'sounds.things.singing-bowl',
      src: '/sounds/things/singing-bowl.mp3',
    },
    {
      icon: <FaFan />,
      id: 'ceiling-fan',
      labelKey: 'sounds.things.ceiling-fan',
      src: '/sounds/things/ceiling-fan.mp3',
    },
    {
      icon: <BiSolidDryer />,
      id: 'dryer',
      labelKey: 'sounds.things.dryer',
      src: '/sounds/things/dryer.mp3',
    },
    {
      icon: <GiFilmProjector />,
      id: 'slide-projector',
      labelKey: 'sounds.things.slide-projector',
      src: '/sounds/things/slide-projector.mp3',
    },
    {
      icon: <MdWaterDrop />,
      id: 'boiling-water',
      labelKey: 'sounds.things.boiling-water',
      src: '/sounds/things/boiling-water.mp3',
    },
    {
      icon: <RiBubbleChartFill />,
      id: 'bubbles',
      labelKey: 'sounds.things.bubbles',
      src: '/sounds/things/bubbles.mp3',
    },
    {
      icon: <MdRadio />,
      id: 'tuning-radio',
      labelKey: 'sounds.things.tuning-radio',
      src: '/sounds/things/tuning-radio.mp3',
    },
    {
      icon: <IoIosRadio />,
      id: 'morse-code',
      labelKey: 'sounds.things.morse-code',
      src: '/sounds/things/morse-code.mp3',
    },
    {
      icon: <GiWashingMachine />,
      id: 'washing-machine',
      labelKey: 'sounds.things.washing-machine',
      src: '/sounds/things/washing-machine.mp3',
    },
    {
      icon: <PiVinylRecord />,
      id: 'vinyl-effect',
      labelKey: 'sounds.things.vinyl-effect',
      src: '/sounds/things/vinyl-effect.mp3',
    },
    {
      icon: <TbWiper />,
      id: 'windshield-wipers',
      labelKey: 'sounds.things.windshield-wipers',
      src: '/sounds/things/windshield-wipers.mp3',
    },
  ],
  titleKey: 'sounds.things.title',
};
