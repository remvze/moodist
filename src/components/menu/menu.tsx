import { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5/index';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useHotkeys } from 'react-hotkeys-hook';

import {
  ShuffleItem,
  ShareItem,
  DonateItem,
  NotepadItem,
  SourceItem,
  PomodoroItem,
  PresetsItem,
} from './items';
import { Divider } from './divider';
import { ShareLinkModal } from '@/components/modals/share-link';
import { PresetsModal } from '@/components/modals/presets';
import { Notepad, Pomodoro } from '@/components/toolbox';

import styles from './menu.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { fade, mix, slideY } from '@/lib/motion';

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const [showPresets, setShowPresets] = useState(false);
  const [showShareLink, setShowShareLink] = useState(false);
  const [showNotepad, setShowNotepad] = useState(false);
  const [showPomodoro, setShowPomodoro] = useState(false);

  const variants = mix(fade(), slideY());

  useHotkeys('alt+m', () => setIsOpen(prev => !prev));
  useHotkeys('alt+n', () => setShowNotepad(prev => !prev));
  useHotkeys('alt+p', () => setShowPomodoro(prev => !prev));
  useHotkeys('shift+alt+p', () => setShowPresets(prev => !prev));
  useHotkeys('alt+s', () => setShowShareLink(prev => !prev));

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
                    <PresetsItem open={() => setShowPresets(true)} />
                    <ShareItem open={() => setShowShareLink(true)} />
                    <ShuffleItem />
                    <Divider />
                    <NotepadItem open={() => setShowNotepad(true)} />
                    <PomodoroItem open={() => setShowPomodoro(true)} />
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
        show={showShareLink}
        onClose={() => setShowShareLink(false)}
      />
      <PresetsModal show={showPresets} onClose={() => setShowPresets(false)} />
      <Notepad show={showNotepad} onClose={() => setShowNotepad(false)} />
      <Pomodoro show={showPomodoro} onClose={() => setShowPomodoro(false)} />
    </>
  );
}
