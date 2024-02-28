import { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5/index';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
} from '@floating-ui/react';

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

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const [showPresets, setShowPresets] = useState(false);
  const [showShareLink, setShowShareLink] = useState(false);
  const [showNotepad, setShowNotepad] = useState(false);
  const [showPomodoro, setShowPomodoro] = useState(false);

  const { context, floatingStyles, refs } = useFloating({
    middleware: [
      offset(12),
      flip(),
      shift(),
      size({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 10,
      }),
    ],
    onOpenChange: setIsOpen,
    open: isOpen,
    placement: 'top-end',
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <div className={styles.wrapper}>
        <button
          aria-label="Menu"
          className={styles.menuButton}
          ref={refs.setReference}
          onClick={() => setIsOpen(prev => !prev)}
          {...getReferenceProps()}
        >
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>

        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className={styles.menu}
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
            </div>
          </FloatingFocusManager>
        )}
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
