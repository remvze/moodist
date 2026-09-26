import { useCallback, useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { BiCheck, BiSearch } from 'react-icons/bi/index';

import { OPEN_SOUND_SEARCH } from '@/constants/events';
import { sounds as soundCatalog } from '@/data/sounds';
import { useCloseListener } from '@/hooks/use-close-listener';
import { subscribe } from '@/lib/event';
import { closeModals } from '@/lib/modal';
import { useSoundStore } from '@/stores/sound';

import styles from './sound-search.module.css';

export function SoundSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const selectedSounds = useSoundStore(state => state.sounds);
  const select = useSoundStore(state => state.select);
  const play = useSoundStore(state => state.play);
  const locked = useSoundStore(state => state.locked);

  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  const openSearch = useCallback(() => {
    closeModals();
    setOpen(true);
  }, []);

  useCloseListener(closeSearch);

  useEffect(() => {
    if (!open) return;

    document.body.dataset.soundSearchOpen = 'true';
    return () => {
      delete document.body.dataset.soundSearchOpen;
    };
  }, [open]);

  useEffect(() => {
    const unsubscribe = subscribe(OPEN_SOUND_SEARCH, openSearch);

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== 'k' ||
        !(event.metaKey || event.ctrlKey)
      ) {
        return;
      }

      event.preventDefault();
      if (open) closeSearch();
      else openSearch();
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      unsubscribe();
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, openSearch, closeSearch]);

  const chooseSound = (id: string) => {
    if (locked) return;
    if (!selectedSounds[id]?.isSelected) select(id);
    play();
    closeSearch();
  };

  return (
    <Command.Dialog
      className={styles.command}
      contentClassName={styles.dialog}
      label="Search sounds"
      loop
      open={open}
      overlayClassName={styles.overlay}
      onOpenChange={nextOpen => {
        if (nextOpen) setOpen(true);
        else closeSearch();
      }}
    >
      <div className={styles.inputRow}>
        <BiSearch aria-hidden="true" />
        <Command.Input
          aria-label="Search sounds"
          placeholder="Search sounds or categories..."
          value={query}
          onValueChange={setQuery}
        />
      </div>

      <Command.List className={styles.results} aria-label="Sound results">
        <Command.Empty className={styles.empty}>No sounds found.</Command.Empty>
        {soundCatalog.categories.map(category => (
          <Command.Group
            className={styles.group}
            heading={category.title}
            key={category.id}
          >
            {category.sounds.map(sound => (
              <Command.Item
                className={styles.item}
                disabled={locked}
                key={sound.id}
                keywords={[sound.label, category.title]}
                value={sound.id}
                onSelect={() => chooseSound(sound.id)}
              >
                <span aria-hidden="true" className={styles.soundIcon}>
                  {sound.icon}
                </span>
                <span className={styles.soundName}>{sound.label}</span>
                {selectedSounds[sound.id]?.isSelected && (
                  <span className={styles.selected}>
                    <BiCheck aria-hidden="true" />
                    Added
                  </span>
                )}
              </Command.Item>
            ))}
          </Command.Group>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
