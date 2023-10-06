import { BiSolidTree } from 'react-icons/bi';
import { FaCity } from 'react-icons/fa';

import { Container } from '@/components/container';
import { Category } from '@/components/category';

interface CategoriesProps {
  categories: Array<{
    id: string;
    title: string;
    sounds: Array<{
      label: string;
      src: string;
    }>;
  }>;
}

export function Categories({ categories }: CategoriesProps) {
  const idToIcon: { [id: string]: React.ReactNode } = {
    nature: <BiSolidTree />,
    urban: <FaCity />,
  };

  return (
    <Container>
      <div>
        {categories.map(category => (
          <Category
            {...category}
            icon={idToIcon[category.id] || idToIcon.nature}
            key={category.id}
          />
        ))}
      </div>
    </Container>
  );
}
