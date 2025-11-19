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

import { getAssetPath } from '@/helpers/path';

export const things: Category = {
  icon: <MdSmartToy />,
  id: 'things',
  sounds: [
    {
      icon: <BsFillKeyboardFill />,
      id: 'keyboard',
      label: 'Keyboard',
      dataI18n: 'sounds.things.keyboard',
      src: getAssetPath('/sounds/things/keyboard.mp3'),
    },
    {
      icon: <FaKeyboard />,
      id: 'typewriter',
      label: 'Typewriter',
      dataI18n: 'sounds.things.typewriter',
      src: getAssetPath('/sounds/things/typewriter.mp3'),
    },
    {
      icon: <RiFilePaper2Fill />,
      id: 'paper',
      label: 'Paper',
      dataI18n: 'sounds.things.paper',
      src: getAssetPath('/sounds/things/paper.mp3'),
    },
    {
      icon: <FaClock />,
      id: 'clock',
      label: 'Clock',
      dataI18n: 'sounds.things.clock',
      src: getAssetPath('/sounds/things/clock.mp3'),
    },
    {
      icon: <GiWindchimes />,
      id: 'wind-chimes',
      label: 'Wind Chimes',
      dataI18n: 'sounds.things.windChimes',
      src: getAssetPath('/sounds/things/wind-chimes.mp3'),
    },
    {
      icon: <TbBowlFilled />,
      id: 'singing-bowl',
      label: 'Singing Bowl',
      dataI18n: 'sounds.things.singingBowl',
      src: getAssetPath('/sounds/things/singing-bowl.mp3'),
    },
    {
      icon: <FaFan />,
      id: 'ceiling-fan',
      label: 'Ceiling Fan',
      dataI18n: 'sounds.things.ceilingFan',
      src: getAssetPath('/sounds/things/ceiling-fan.mp3'),
    },
    {
      icon: <BiSolidDryer />,
      id: 'dryer',
      label: 'Dryer',
      dataI18n: 'sounds.things.dryer',
      src: getAssetPath('/sounds/things/dryer.mp3'),
    },
    {
      icon: <GiFilmProjector />,
      id: 'slide-projector',
      label: 'Slide Projector',
      dataI18n: 'sounds.things.slideProjector',
      src: getAssetPath('/sounds/things/slide-projector.mp3'),
    },
    {
      icon: <MdWaterDrop />,
      id: 'boiling-water',
      label: 'Boiling Water',
      dataI18n: 'sounds.things.boilingWater',
      src: getAssetPath('/sounds/things/boiling-water.mp3'),
    },
    {
      icon: <RiBubbleChartFill />,
      id: 'bubbles',
      label: 'Bubbles',
      dataI18n: 'sounds.things.bubbles',
      src: getAssetPath('/sounds/things/bubbles.mp3'),
    },
    {
      icon: <MdRadio />,
      id: 'tuning-radio',
      label: 'Tuning Radio',
      dataI18n: 'sounds.things.tuningRadio',
      src: getAssetPath('/sounds/things/tuning-radio.mp3'),
    },
    {
      icon: <IoIosRadio />,
      id: 'morse-code',
      label: 'Morse Code',
      dataI18n: 'sounds.things.morseCode',
      src: getAssetPath('/sounds/things/morse-code.mp3'),
    },
    {
      icon: <GiWashingMachine />,
      id: 'washing-machine',
      label: 'Washing Machine',
      dataI18n: 'sounds.things.washingMachine',
      src: getAssetPath('/sounds/things/washing-machine.mp3'),
    },
    {
      icon: <PiVinylRecord />,
      id: 'vinyl-effect',
      label: 'Vinyl Effect',
      dataI18n: 'sounds.things.vinylEffect',
      src: getAssetPath('/sounds/things/vinyl-effect.mp3'),
    },
    {
      icon: <TbWiper />,
      id: 'windshield-wipers',
      label: 'Windshield Wipers',
      dataI18n: 'sounds.things.windshieldWipers',
      src: getAssetPath('/sounds/things/windshield-wipers.mp3'),
    },
  ],
  title: 'Things',
  dataI18n: 'categories.things',
};
