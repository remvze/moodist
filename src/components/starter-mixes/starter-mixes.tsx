import { useCallback, useState } from 'react';
import { BiPlay } from 'react-icons/bi/index';
import { RiPlayListFill } from 'react-icons/ri/index';
import { Popover } from 'radix-ui';

import { usePresetStore } from '@/stores/preset';
import { useSoundStore } from '@/stores/sound';
import { useCloseListener } from '@/hooks/use-close-listener';

import styles from './starter-mixes.module.css';

const starterMixes: Array<{
  name: string;
  description: string;
  sounds: Record<string, number>;
}> = [
  {
    name: 'Deep focus',
    description: 'Brown noise · Light rain',
    sounds: { 'brown-noise': 0.5, 'light-rain': 0.35 },
  },
  {
    name: 'Rainy café',
    description: 'Café · Rain on window',
    sounds: { cafe: 0.75, 'rain-on-window': 0.15 },
  },
  {
    name: 'Slow evening',
    description: 'Waves · Campfire',
    sounds: { waves: 0.5, campfire: 0.35 },
  },
];

export function StarterMixes() {
  const [open, setOpen] = useState(false);
  const presets = usePresetStore(state => state.presets);
  const override = useSoundStore(state => state.override);
  const play = useSoundStore(state => state.play);
  const locked = useSoundStore(state => state.locked);

  useCloseListener(useCallback(() => setOpen(false), []));

  const playMix = (sounds: Record<string, number>) => {
    if (locked) return;
    override(sounds, true);
    play();
    setOpen(false);
  };

  return (
    <div className={styles.anchor}>
      <Popover.Root modal={false} open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button className={styles.trigger} type="button">
            <RiPlayListFill aria-hidden="true" />
            Play a mix
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            align="end"
            className={styles.content}
            collisionPadding={12}
            side="top"
            sideOffset={12}
          >
            <p className={styles.description}>
              Choose a mix, then adjust the sounds.
            </p>
            {starterMixes.map(mix => (
              <button
                className={styles.mix}
                disabled={locked}
                key={mix.name}
                onClick={() => playMix(mix.sounds)}
              >
                <span className={styles.mixText}>
                  <strong>{mix.name}</strong>
                  <span>{mix.description}</span>
                </span>
                <BiPlay aria-hidden="true" />
              </button>
            ))}

            {presets.length > 0 && (
              <>
                <div className={styles.divider} />
                <p className={styles.savedHeading}>Your mixes</p>
                {presets.map(preset => (
                  <button
                    className={styles.mix}
                    disabled={locked}
                    key={preset.id}
                    onClick={() => playMix(preset.sounds)}
                  >
                    <span className={styles.mixText}>
                      <strong>{preset.label || 'Untitled mix'}</strong>
                      <span>Saved mix</span>
                    </span>
                    <BiPlay aria-hidden="true" />
                  </button>
                ))}
              </>
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
