import { useState, useMemo, useCallback } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5/index';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useHotkeys } from 'react-hotkeys-hook';
import { AnimatePresence, motion } from 'framer-motion';

import {
  ShuffleItem,
  ShareItem,
  DonateItem,
  SourceItem,
  PresetsItem,
  ShortcutsItem,
  SleepTimerItem,
  BreathingExerciseItem,
  PomodoroItem,
  NotepadItem,
  TodoItem,
  CountdownItem,
  BinauralItem,
  IsochronicItem,
  LofiItem,
} from './items';
import { Divider } from './divider';
import { ShareLinkModal } from '@/components/modals/share-link';
import { PresetsModal } from '@/components/modals/presets';
import { ShortcutsModal } from '@/components/modals/shortcuts';
import { SleepTimerModal } from '@/components/modals/sleep-timer';
import { BreathingExerciseModal } from '@/components/modals/breathing';
import { BinauralModal } from '@/components/modals/binaural';
import { IsochronicModal } from '@/components/modals/isochronic';
import { LofiModal } from '@/components/modals/lofi';
import { Pomodoro, Notepad, Todo, Countdown } from '@/components/toolbox';
import { Slider } from '@/components/slider';

import { fade, mix, slideY } from '@/lib/motion';
import { useSoundStore } from '@/stores/sound';

import styles from './menu.module.css';
import { useCloseListener } from '@/hooks/use-close-listener';
import { closeModals } from '@/lib/modal';

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const noSelected = useSoundStore(state => state.noSelected());
  const globalVolume = useSoundStore(state => state.globalVolume);
  const setGlobalVolume = useSoundStore(state => state.setGlobalVolume);

  const initial = useMemo(
    () => ({
      binaural: false,
      breathing: false,
      countdown: false,
      isochronic: false,
      lofi: false,
      notepad: false,
      pomodoro: false,
      presets: false,
      shareLink: false,
      shortcuts: false,
      sleepTimer: false,
      todo: false,
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
  useHotkeys('shift+alt+p', () => open('presets'));
  useHotkeys('shift+h', () => open('shortcuts'));
  useHotkeys('shift+b', () => open('breathing'));
  useHotkeys('shift+n', () => open('notepad'));
  useHotkeys('shift+p', () => open('pomodoro'));
  useHotkeys('shift+t', () => open('todo'));
  useHotkeys('shift+c', () => open('countdown'));
  useHotkeys('shift+s', () => open('shareLink'), { enabled: !noSelected });
  useHotkeys('shift+alt+t', () => open('sleepTimer'));

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
                    <CountdownItem open={() => open('countdown')} />
                    <PomodoroItem open={() => open('pomodoro')} />
                    <NotepadItem open={() => open('notepad')} />
                    <TodoItem open={() => open('todo')} />
                    <BreathingExerciseItem open={() => open('breathing')} />

                    <Divider />
                    <BinauralItem open={() => open('binaural')} />
                    <IsochronicItem open={() => open('isochronic')} />
                    <LofiItem open={() => open('lofi')} />

                    <Divider />
                    <ShortcutsItem open={() => open('shortcuts')} />
                    <Divider />

                    <div className={styles.globalVolume}>
                      <label htmlFor="global-volume">Global Volume</label>
                      <Slider
                        max={100}
                        min={0}
                        value={globalVolume * 100}
                        onChange={value => setGlobalVolume(value / 100)}
                      />
                    </div>

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
      <BreathingExerciseModal
        show={modals.breathing}
        onClose={() => close('breathing')}
      />
      <ShortcutsModal
        show={modals.shortcuts}
        onClose={() => close('shortcuts')}
      />
      <Pomodoro
        open={() => open('pomodoro')}
        show={modals.pomodoro}
        onClose={() => close('pomodoro')}
      />
      <Notepad show={modals.notepad} onClose={() => close('notepad')} />
      <Todo show={modals.todo} onClose={() => close('todo')} />
      <Countdown show={modals.countdown} onClose={() => close('countdown')} />
      <PresetsModal show={modals.presets} onClose={() => close('presets')} />
      <SleepTimerModal
        show={modals.sleepTimer}
        onClose={() => close('sleepTimer')}
      />
      <BinauralModal show={modals.binaural} onClose={() => close('binaural')} />
      <IsochronicModal
        show={modals.isochronic}
        onClose={() => close('isochronic')}
      />
      <LofiModal show={modals.lofi} onClose={() => close('lofi')} />
    </>
  );
}
