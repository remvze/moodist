import { sounds } from '@/data/sounds';
import { useMemo } from 'react';
import styles from './category-icons.module.css';
import { Container } from '@/components/container';
import { Tooltip } from '@/components/tooltip';

export default function CategoryIcons() {
  const categories = useMemo(() => sounds.categories, []);

  return (
    <Container>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Categories</h3>
        <div className={styles.categoryIconsWrapper}>
          <Tooltip.Provider delayDuration={0}>
            {categories.map(category => {
              return (
                <a href={`#category-${category.id}`} key={category.id}>
                  <Tooltip content={category.title} placement="bottom">
                    <div className={styles.icon}>{category.icon}</div>
                  </Tooltip>
                </a>
              );
            })}
          </Tooltip.Provider>
        </div>
      </div>
    </Container>
  );
}
