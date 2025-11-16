import { AnimatePresence } from 'motion/react';

import { Category } from './category';

import type { Categories } from '@/data/types';

interface CategoriesProps {
  categories: Categories;
}

export function Categories({ categories }: CategoriesProps) {
  return (
    <AnimatePresence initial={false}>
      {categories.map((category) => (
        <Category key={category.id} functional={category.id !== 'favorites'} {...category} />
      ))}
    </AnimatePresence>
  );
}
