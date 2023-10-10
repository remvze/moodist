import { Container } from '@/components/container';
import { StoreConsumer } from '../store-consumer';
import { Category } from '@/components/category';
import { PlayButton } from '@/components/play-button';
import { PlayProvider } from '@/contexts/play';

import { sounds } from '@/data/sounds';

export function Categories() {
  const { categories } = sounds;

  return (
    <StoreConsumer>
      <PlayProvider>
        <Container>
          <PlayButton />

          <div>
            {categories.map(category => (
              <Category {...category} key={category.id} />
            ))}
          </div>
        </Container>
      </PlayProvider>
    </StoreConsumer>
  );
}
