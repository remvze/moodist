import { AnimatePresence } from 'framer-motion';

import { Category } from '@/components/category';

import type { Categories } from '@/data/types';

interface CategoriesProps {
  categories: Categories;
}

export function Categories({ categories }: CategoriesProps) {
  return (
    <AnimatePresence initial={false}>
      {categories.map(category => (
        <Category
          functional={category.id !== 'favorites'}
          {...category}
          key={category.id}
        />
      ))}
    </AnimatePresence>
  );
}
