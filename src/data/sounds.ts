import { nature } from './sounds/nature';
import { rain } from './sounds/rain';
import { animals } from './sounds/animals';
import { urban } from './sounds/urban';
import { places } from './sounds/places';
import { things } from './sounds/things';
import { noise } from './sounds/noise';

import type { Categories } from './types';

export const sounds: {
  categories: Categories;
} = {
  categories: [nature, rain, animals, urban, places, things, noise],
};
