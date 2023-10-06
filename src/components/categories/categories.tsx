import { BiSolidTree } from 'react-icons/bi/index';
import { FaCity } from 'react-icons/fa/index';

import { Container } from '@/components/container';
import { Category } from '@/components/category';
import { PlayButton } from '@/components/play-button';
import { PlayProvider } from '@/contexts/play';

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
    <PlayProvider>
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

        <PlayButton />
      </Container>
    </PlayProvider>
  );
}
