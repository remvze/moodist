export const sounds: {
  categories: Array<{
    id: string;
    title: string;
    sounds: Array<{ label: string; src: string }>;
  }>;
} = {
  categories: [
    {
      id: 'nature',
      sounds: [
        {
          label: 'Rain',
          src: '/sounds/rain.mp3',
        },
        {
          label: 'Birds',
          src: '/sounds/birds.mp3',
        },
        {
          label: 'River',
          src: '/sounds/river.mp3',
        },
        {
          label: 'Thunder',
          src: '/sounds/thunder.mp3',
        },
        {
          label: 'Crickets',
          src: '/sounds/crickets.mp3',
        },
        {
          label: 'Waves',
          src: '/sounds/waves.mp3',
        },
        {
          label: 'Seagulls',
          src: '/sounds/seagulls.mp3',
        },
        {
          label: 'Campfire',
          src: '/sounds/campfire.mp3',
        },
      ],
      title: 'Nature',
    },
    {
      id: 'urban',
      sounds: [
        {
          label: 'Airport',
          src: '/sounds/airport.mp3',
        },
        {
          label: 'Cafe',
          src: '/sounds/cafe.mp3',
        },
        {
          label: 'Rain on Window',
          src: '/sounds/rain-on-window.mp3',
        },
      ],
      title: 'Urban',
    },
  ],
};
