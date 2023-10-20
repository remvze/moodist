import { AnimatePresence } from 'framer-motion';

import { Category } from '@/components/category';

interface CategoriesProps {
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
