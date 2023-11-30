import {
  GiCricket,
  GiSeagull,
  GiWindow,
  GiWaterfall,
  GiWolfHead,
  GiOwl,
  GiWindchimes,
  GiSoundWaves,
} from 'react-icons/gi/index';
import {
  BsFire,
  BsSoundwave,
  BsFillCloudRainFill,
  BsFillCloudRainHeavyFill,
  BsUmbrellaFill,
  BsFillKeyboardFill,
} from 'react-icons/bs/index';
import {
  BiSolidTree,
  BiWater,
  BiSolidCoffeeAlt,
  BiSolidTrain,
  BiSolidPlaneAlt,
} from 'react-icons/bi/index';
import {
  FaWater,
  FaWind,
  FaLeaf,
  FaDog,
  FaFrog,
  FaCity,
  FaRoad,
  FaKeyboard,
  FaClock,
} from 'react-icons/fa/index';
import {
  PiBirdFill,
  PiTentFill,
  PiRoadHorizonFill,
} from 'react-icons/pi/index';
import { MdOutlineThunderstorm, MdSmartToy } from 'react-icons/md/index';
import { TbScubaMask, TbBowlFilled } from 'react-icons/tb/index';
import { RiFilePaper2Fill } from 'react-icons/ri/index';

import type { Categories } from './types';

export const sounds: {
  categories: Categories;
} = {
  categories: [
    {
      icon: <BiSolidTree />,
      id: 'nature',
      sounds: [
        {
          icon: <BiWater />,
          id: 'river',
          label: 'River',
          src: '/sounds/nature/river.mp3',
        },
        {
          icon: <FaWater />,
          id: 'waves',
          label: 'Waves',
          src: '/sounds/nature/waves.mp3',
        },
        {
          icon: <BsFire />,
          id: 'campfire',
          label: 'Campfire',
          src: '/sounds/nature/campfire.mp3',
        },
        {
          icon: <FaWind />,
          id: 'wind',
          label: 'Wind',
          src: '/sounds/nature/wind.mp3',
        },
        {
          icon: <FaWind />,
          id: 'howling-wind',
          label: 'Howling Wind',
          src: '/sounds/nature/howling-wind.mp3',
        },
        {
          icon: <FaWind />,
          id: 'wind-in-trees',
          label: 'Wind in Trees',
          src: '/sounds/nature/wind-in-trees.mp3',
        },
        {
          icon: <GiWaterfall />,
          id: 'waterfall',
          label: 'Waterfall',
          src: '/sounds/nature/waterfall.mp3',
        },
        {
          icon: <TbScubaMask />,
          id: 'underwater',
          label: 'Underwater',
          src: '/sounds/nature/underwater.mp3',
        },
      ],
      title: 'Nature',
    },
    {
      icon: <BsFillCloudRainFill />,
      id: 'rain',
      sounds: [
        {
          icon: <BsFillCloudRainFill />,
          id: 'light-rain',
          label: 'Light Rain',
          src: '/sounds/rain/light-rain.mp3',
        },
        {
          icon: <BsFillCloudRainHeavyFill />,
          id: 'heavy-rain',
          label: 'Heavy Rain',
          src: '/sounds/rain/heavy-rain.mp3',
        },
        {
          icon: <MdOutlineThunderstorm />,
          id: 'thunder',
          label: 'Thunder',
          src: '/sounds/rain/thunder.mp3',
        },
        {
          icon: <GiWindow />,
          id: 'rain-on-window',
          label: 'Rain on Window',
          src: '/sounds/rain/rain-on-window.mp3',
        },
        {
          icon: <BsUmbrellaFill />,
          id: 'rain-on-umbrella',
          label: 'Rain on Umbrella',
          src: '/sounds/rain/rain-on-umbrella.mp3',
        },
        {
          icon: <PiTentFill />,
          id: 'rain-on-tent',
          label: 'Rain on Tent',
          src: '/sounds/rain/rain-on-tent.mp3',
        },
        {
          icon: <FaLeaf />,
          id: 'rain-on-leaves',
          label: 'Rain on Leaves',
          src: '/sounds/rain/rain-on-leaves.mp3',
        },
      ],
      title: 'Rain',
    },
    {
      icon: <FaDog />,
      id: 'animals',
      sounds: [
        {
          icon: <PiBirdFill />,
          id: 'birds',
          label: 'Birds',
          src: '/sounds/animals/birds.mp3',
        },
        {
          icon: <GiSeagull />,
          id: 'seagulls',
          label: 'Seagulls',
          src: '/sounds/animals/seagulls.mp3',
        },
        {
          icon: <GiCricket />,
          id: 'crickets',
          label: 'Crickets',
          src: '/sounds/animals/crickets.mp3',
        },
        {
          icon: <GiWolfHead />,
          id: 'wolf',
          label: 'Wolf',
          src: '/sounds/animals/wolf.mp3',
        },
        {
          icon: <GiOwl />,
          id: 'owl',
          label: 'Owl',
          src: '/sounds/animals/owl.mp3',
        },
        {
          icon: <FaFrog />,
          id: 'frog',
          label: 'Frog',
          src: '/sounds/animals/frog.mp3',
        },
      ],
      title: 'Animals',
    },
    {
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
      ],
      title: 'Urban',
    },
    {
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
      ],
      title: 'Things',
    },
    {
      icon: <BsSoundwave />,
      id: 'noise',
      sounds: [
        {
          icon: <GiSoundWaves />,
          id: 'white-noise',
          label: 'White Noise',
          src: '/sounds/noise/white-noise.wav',
        },
        {
          icon: <GiSoundWaves />,
          id: 'pink-noise',
          label: 'Pink Noise',
          src: '/sounds/noise/pink-noise.wav',
        },
        {
          icon: <GiSoundWaves />,
          id: 'brown-noise',
          label: 'Brown Noise',
          src: '/sounds/noise/brown-noise.wav',
        },
      ],
      title: 'Noise',
    },
  ],
};
