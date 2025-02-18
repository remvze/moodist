import { useMemo, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { BiSolidHeart } from 'react-icons/bi/index';
import { Howler } from 'howler';

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

import type { Sound } from '@/data/types';
import { subscribe } from '@/lib/event';

/**
 * =========================================
 */
declare global {
  interface Window {
    __howlerStreamPatched?: boolean;
  }
}

/**
 * Patches Howler's master gain node to route its output into a hidden HTML audio element.
 * An intermediate splitter node is used in an attempt to reduce the banging noise observed on iOS.
 * Also adds a listener to resume the AudioContext when the document becomes visible.
 */
export function setupAudioStream(): void {
  if (
    typeof window !== 'undefined' &&
    Howler.ctx &&
    !window.__howlerStreamPatched
  ) {
    const audioCtx = Howler.ctx;

    // Create a MediaStream destination node to capture the output.
    const streamDestination = audioCtx.createMediaStreamDestination();

    // Create a splitter gain node to help split the signal cleanly.
    const splitter = audioCtx.createGain();

    // Disconnect the master gain.
    Howler.masterGain.disconnect();

    // Reconnect masterGain: one branch to the AudioContext's default destination,
    // and one branch through the splitter to the MediaStream destination.
    Howler.masterGain.connect(audioCtx.destination);
    Howler.masterGain.connect(splitter);
    splitter.connect(streamDestination);

    // Create a hidden HTML audio element to play the captured stream.
    const audioElement = document.createElement('audio');
    audioElement.setAttribute('playsinline', 'true'); // crucial for iOS playback
    audioElement.srcObject = streamDestination.stream;
    audioElement.style.display = 'none';
    document.body.appendChild(audioElement);

    // Attempt to start playback (must be triggered by a user gesture).
    audioElement.play().catch((err: unknown) => {
      console.error('Failed to play background stream:', err);
    });

    // Listen for visibility changes: if the document becomes visible and the AudioContext is suspended, resume it.
    document.addEventListener('visibilitychange', () => {
      if (
        document.visibilityState === 'visible' &&
        audioCtx.state === 'suspended'
      ) {
        audioCtx
          .resume()
          .catch((err: unknown) =>
            console.error('Error resuming AudioContext:', err),
          );
      }
    });

    window.__howlerStreamPatched = true;
  }
}

/**
 * =========================================
 */

export function App() {
  const categories = useMemo(() => sounds.categories, []);

  const favorites = useSoundStore(useShallow(state => state.getFavorites()));
  const pause = useSoundStore(state => state.pause);
  const lock = useSoundStore(state => state.lock);
  const unlock = useSoundStore(state => state.unlock);

  const favoriteSounds = useMemo(() => {
    const favoriteSounds = categories
      .map(category => category.sounds)
      .flat()
      .filter(sound => favorites.includes(sound.id));

    /**
     * Reorder based on the order of favorites
     */
    return favorites.map(favorite =>
      favoriteSounds.find(sound => sound.id === favorite),
    );
  }, [favorites, categories]);

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
    const favorites = [];

    if (favoriteSounds.length) {
      favorites.push({
        icon: <BiSolidHeart />,
        id: 'favorites',
        sounds: favoriteSounds as Array<Sound>,
        title: 'Favorites',
      });
    }

    return [...favorites, ...categories];
  }, [favoriteSounds, categories]);

  useEffect(() => {
    const handleUserInteraction = () => {
      setupAudioStream();
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  return (
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
  );
}
