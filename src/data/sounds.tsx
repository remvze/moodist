import { BiSolidTree, BiWater, BiSolidCoffeeAlt } from 'react-icons/bi/index';
import { FaCity, FaCloudShowersHeavy, FaWater } from 'react-icons/fa/index';
import { PiBirdFill } from 'react-icons/pi/index';
import { MdOutlineThunderstorm } from 'react-icons/md/index';
import { GiCricket, GiSeagull, GiWindow } from 'react-icons/gi/index';
import { BsFire, BsAirplaneFill } from 'react-icons/bs/index';
// import { BsSoundwave } from 'react-icons/bs/index';

// const defaultIcon = <BsSoundwave />;

export const sounds: {
  categories: Array<{
    id: string;
    title: string;
    icon: React.ReactNode;
    sounds: Array<{
      label: string;
      src: string;
      icon: React.ReactNode;
      id: string;
    }>;
  }>;
} = {
  categories: [
    {
      icon: <BiSolidTree />,
      id: 'nature',
      sounds: [
        {
          icon: <FaCloudShowersHeavy />,
          id: 'rain',
          label: 'Rain',
          src: '/sounds/rain.mp3',
        },
        {
          icon: <PiBirdFill />,
          id: 'birds',
          label: 'Birds',
          src: '/sounds/birds.mp3',
        },
        {
          icon: <BiWater />,
          id: 'river',
          label: 'River',
          src: '/sounds/river.mp3',
        },
        {
          icon: <MdOutlineThunderstorm />,
          id: 'thunder',
          label: 'Thunder',
          src: '/sounds/thunder.mp3',
        },
        {
          icon: <GiCricket />,
          id: 'crickets',
          label: 'Crickets',
          src: '/sounds/crickets.mp3',
        },
        {
          icon: <FaWater />,
          id: 'waves',
          label: 'Waves',
          src: '/sounds/waves.mp3',
        },
        {
          icon: <GiSeagull />,
          id: 'seagulls',
          label: 'Seagulls',
          src: '/sounds/seagulls.mp3',
        },
        {
          icon: <BsFire />,
          id: 'campfire',
          label: 'Campfire',
          src: '/sounds/campfire.mp3',
        },
      ],
      title: 'Nature',
    },
    {
      icon: <FaCity />,
      id: 'urban',
      sounds: [
        {
          icon: <BsAirplaneFill />,
          id: 'airport',
          label: 'Airport',
          src: '/sounds/airport.mp3',
        },
        {
          icon: <BiSolidCoffeeAlt />,
          id: 'cafe',
          label: 'Cafe',
          src: '/sounds/cafe.mp3',
        },
        {
          icon: <GiWindow />,
          id: 'rain-on-window',
          label: 'Rain on Window',
          src: '/sounds/rain-on-window.mp3',
        },
      ],
      title: 'Urban',
    },
  ],
};
