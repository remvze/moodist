import { sounds } from '@/data/sounds';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi/index';

import styles from './category-icons.module.css';

import { Container } from '@/components/container';
import { OPEN_SOUND_SEARCH } from '@/constants/events';
import { dispatch } from '@/lib/event';

export default function CategoryIcons() {
  const categories = useMemo(() => sounds.categories, []);
  const categoriesRef = useRef<HTMLElement>(null);
  const [showStartFade, setShowStartFade] = useState(false);
  const [showEndFade, setShowEndFade] = useState(false);

  useEffect(() => {
    const nav = categoriesRef.current;
    if (!nav) return;

    const updateFade = () => {
      setShowStartFade(nav.scrollLeft > 2);
      setShowEndFade(nav.scrollLeft + nav.clientWidth < nav.scrollWidth - 2);
    };

    updateFade();
    nav.addEventListener('scroll', updateFade, { passive: true });
    const observer = new ResizeObserver(updateFade);
    observer.observe(nav);

    return () => {
      nav.removeEventListener('scroll', updateFade);
      observer.disconnect();
    };
  }, []);

  const goto = (id: string) => {
    const category = document.getElementById(`category-${id}`);
    category?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Browse sounds</h2>
            <p>Jump to any category.</p>
          </div>
          <button
            className={styles.searchButton}
            type="button"
            onClick={() => dispatch(OPEN_SOUND_SEARCH)}
          >
            <BiSearch aria-hidden="true" />
            Search<span className={styles.searchSuffix}> sounds</span>
          </button>
        </div>

        <nav
          aria-label="Sound categories"
          className={`${styles.categories} ${showStartFade ? styles.fadeStart : ''} ${showEndFade ? styles.fadeEnd : ''}`}
          ref={categoriesRef}
        >
          {categories.map(category => (
            <button
              className={styles.category}
              key={category.id}
              onClick={() => goto(category.id)}
            >
              <span aria-hidden="true" className={styles.icon}>
                {category.icon}
              </span>
              <span>{category.title}</span>
            </button>
          ))}
        </nav>
      </div>
    </Container>
  );
}
