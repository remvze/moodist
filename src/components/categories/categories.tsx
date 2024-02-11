import { AnimatePresence } from 'framer-motion';

import { Category } from '@/components/category';
import { Donate } from './donate';

import type { Categories } from '@/data/types';

interface CategoriesProps {
  categories: Categories;
}

export function Categories({ categories }: CategoriesProps) {
  return (
    <AnimatePresence initial={false}>
      {categories.map((category, index) => (
        <div key={category.id}>
          <Category functional={category.id !== 'favorites'} {...category} />

          {index === 3 && <Donate />}
        </div>
      ))}
    </AnimatePresence>
  );
}
