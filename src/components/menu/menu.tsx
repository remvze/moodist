import { useState, useMemo, useCallback } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5/index';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useHotkeys } from 'react-hotkeys-hook';
import { AnimatePresence, motion } from 'framer-motion';

import {
  ShuffleItem,
  ShareItem,
  DonateItem,
  NotepadItem,
  SourceItem,
  PomodoroItem,
  CountdownTimerItem,
  PresetsItem,
  ShortcutsItem,
  SleepTimerItem,
  BreathingExerciseItem,
} from './items';
import { Divider } from './divider';
import { ShareLinkModal } from '@/components/modals/share-link';
import { PresetsModal } from '@/components/modals/presets';
import { ShortcutsModal } from '@/components/modals/shortcuts';
import { SleepTimerModal } from '@/components/modals/sleep-timer';
import { Notepad, Pomodoro, BreathingExercise } from '@/components/toolbox';
import { fade, mix, slideY } from '@/lib/motion';
import { useSoundStore } from '@/stores/sound';

import styles from './menu.module.css';
import { useCloseListener } from '@/hooks/use-close-listener';
import { closeModals } from '@/lib/modal';

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const noSelected = useSoundStore(state => state.noSelected());

  const initial = useMemo(
    () => ({
      breathingExercise: false,
      notepad: false,
      pomodoro: false,
      presets: false,
      shareLink: false,
      shortcuts: false,
      sleepTimer: false,
    }),
    [],
  );

  const [modals, setModals] = useState(initial);

  const close = useCallback((name: string) => {
    setModals(prev => ({ ...prev, [name]: false }));
  }, []);

  const closeAll = useCallback(() => setModals(initial), [initial]);

  const open = useCallback(
    (name: string) => {
      closeAll();
      setIsOpen(false);
      closeModals();
      setModals(prev => ({ ...prev, [name]: true }));
    },
    [closeAll],
  );

  useHotkeys('shift+m', () => setIsOpen(prev => !prev));
  useHotkeys('shift+n', () => open('notepad'));
  useHotkeys('shift+p', () => open('pomodoro'));
  useHotkeys('shift+b', () => open('breathingExercise'));
  useHotkeys('shift+alt+p', () => open('presets'));
  useHotkeys('shift+h', () => open('shortcuts'));
  useHotkeys('shift+s', () => open('shareLink'), { enabled: !noSelected });
  useHotkeys('shift+t', () => open('sleepTimer'));

  useCloseListener(closeAll);

  const variants = mix(fade(), slideY());

  return (
    <>
      <div className={styles.wrapper}>
        <DropdownMenu.Root open={isOpen} onOpenChange={o => setIsOpen(o)}>
          <DropdownMenu.Trigger asChild>
            <button aria-label="Menu" className={styles.menuButton}>
              {isOpen ? <IoClose /> : <IoMenu />}
            </button>
          </DropdownMenu.Trigger>

          <AnimatePresence>
            {isOpen && (
              <DropdownMenu.Portal forceMount>
                <DropdownMenu.Content
                  align="end"
                  asChild
                  collisionPadding={10}
                  side="top"
                  sideOffset={12}
                >
                  <motion.div
                    animate="show"
                    className={styles.menu}
                    exit="hidden"
                    initial="hidden"
                    variants={variants}
                  >
                    <PresetsItem open={() => open('presets')} />
                    <ShareItem open={() => open('shareLink')} />
                    <ShuffleItem />
                    <SleepTimerItem open={() => open('sleepTimer')} />

                    <Divider />
                    <BreathingExerciseItem
                      open={() => open('breathingExercise')}
                    />
                    <PomodoroItem open={() => open('pomodoro')} />
                    <NotepadItem open={() => open('notepad')} />
                    <CountdownTimerItem />

                    <Divider />
                    <ShortcutsItem open={() => open('shortcuts')} />

                    <Divider />
                    <DonateItem />
                    <SourceItem />
                  </motion.div>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            )}
          </AnimatePresence>
        </DropdownMenu.Root>
      </div>

      <ShareLinkModal
        show={modals.shareLink}
        onClose={() => close('shareLink')}
      />
      <ShortcutsModal
        show={modals.shortcuts}
        onClose={() => close('shortcuts')}
      />
      <PresetsModal show={modals.presets} onClose={() => close('presets')} />
      <Notepad show={modals.notepad} onClose={() => close('notepad')} />
      <Pomodoro
        open={() => open('pomodoro')}
        show={modals.pomodoro}
        onClose={() => close('pomodoro')}
      />
      <BreathingExercise
        show={modals.breathingExercise}
        onClose={() => close('breathingExercise')}
      />
      <SleepTimerModal
        show={modals.sleepTimer}
        onClose={() => close('sleepTimer')}
      />
    </>
  );
}
