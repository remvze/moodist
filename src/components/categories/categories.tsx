import { useMemo } from 'react';
import { BiSolidTree } from 'react-icons/bi';
import { FaCity } from 'react-icons/fa';

import { Container } from '@/components/container';
import { Category } from '@/components/category';

interface CategoriesProps {
  sounds: {
    [id: string]: {
      title: string;
      sounds: Array<{
        label: string;
        src: string;
      }>;
    };
  };
}

export function Categories({ sounds }: CategoriesProps) {
  const categories = useMemo(() => {
    const idToIcon: { [id: string]: React.ReactNode } = {
      nature: <BiSolidTree />,
      urban: <FaCity />,
    };

    const ids = Object.keys(sounds);
    const categories: Array<{
      icon: React.ReactNode;
      title: string;
      id: string;
      sounds: Array<{ label: string; src: string }>;
    }> = [];

    ids.forEach(id => {
      const category = sounds[id];

      categories.push({
        icon: idToIcon[id] || '-',
        id: id,
        ...category,
      });
    });

    return categories;
  }, [sounds]);

  return (
    <Container>
      <div>
        {categories.map(category => (
          <Category {...category} key={category.id} />
        ))}
      </div>
    </Container>
  );
}
