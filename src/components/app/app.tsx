import { useMemo, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { BiSolidHeart } from 'react-icons/bi/index';
import { Howler } from 'howler';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '@/i18n';

import { useSoundStore } from '@/stores/sound';

import { Container } from '@/components/container';
import { StoreConsumer } from '@/components/store-consumer';
import { Buttons } from '@/components/buttons';
import { Categories } from '@/components/categories';
import { SharedModal } from '@/components/modals/shared';
import { Toolbar } from '@/components/toolbar';
import { SnackbarProvider } from '@/contexts/snackbar';
import { MediaControls } from '@/components/media-controls';

import { sounds } from '@/data/sounds';
import { FADE_OUT } from '@/constants/events';

import type { Sound, Category as CategoryType } from '@/data/types';
import { subscribe } from '@/lib/event';

interface AppProps {
  locale: string; // 接收来自 Astro 的 locale
}

export function App({ locale }: AppProps) {
  if (locale && i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }
  const { t } = useTranslation();

  const categoriesData = useMemo(() => sounds.categories, []);
  const categories = categoriesData; // 暂时不翻译

  const favorites = useSoundStore(useShallow(state => state.getFavorites()));
  const pause = useSoundStore(state => state.pause);
  const lock = useSoundStore(state => state.lock);
  const unlock = useSoundStore(state => state.unlock);

  const favoriteSounds = useMemo(() => {
    const allFlatSounds = categoriesData
      .map(category => category.sounds)
      .flat();
    const favoriteSoundsData = allFlatSounds.filter(sound =>
      favorites.includes(sound.id),
    );

    // 暂时不翻译 sound labels
    return favorites
      .map(favoriteId =>
        favoriteSoundsData.find(sound => sound.id === favoriteId),
      )
      .filter((s): s is Sound => s !== undefined);
  }, [favorites, categoriesData]);

  useEffect(() => {
    const onChange = () => {
      const { ctx } = Howler;

      if (ctx && !document.hidden) {
        setTimeout(() => {
          ctx.resume();
        }, 100);
      }
    };

    document.addEventListener('visibilitychange', onChange, false);

    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(FADE_OUT, (e: { duration: number }) => {
      lock();

      setTimeout(() => {
        pause();
        unlock();
      }, e.duration);
    });

    return unsubscribe;
  }, [pause, lock, unlock]);

  const allCategories = useMemo(() => {
    const favs: CategoryType[] = [];
    if (favoriteSounds.length) {
      favs.push({
        icon: <BiSolidHeart />,
        id: 'favorites',
        sounds: favoriteSounds,
        title: t('categories.favorites'),
      });
    }
    return [...favs, ...categories];
  }, [favoriteSounds, categories, t]);

  return (
    <I18nextProvider i18n={i18n}>
      <SnackbarProvider>
        <StoreConsumer>
          <MediaControls />
          <Container>
            <div id="app" />
            <Buttons />
            <Categories categories={allCategories} />
          </Container>

          <Toolbar />
          <SharedModal />
        </StoreConsumer>
      </SnackbarProvider>
    </I18nextProvider>
  );
}
