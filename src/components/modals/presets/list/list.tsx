import { FaPlay, FaRegTrashAlt } from 'react-icons/fa/index';
import { useTranslation } from 'react-i18next';
import styles from './list.module.css';

import { useSoundStore } from '@/stores/sound';
import { usePresetStore } from '@/stores/preset';
import { Tooltip } from '@/components/tooltip';

interface ListProps {
  close: () => void;
}

export function List({ close }: ListProps) {
  const { t } = useTranslation();
  const presets = usePresetStore(state => state.presets);
  const changeName = usePresetStore(state => state.changeName);
  const deletePreset = usePresetStore(state => state.deletePreset);
  const override = useSoundStore(state => state.override);
  const play = useSoundStore(state => state.play);

  return (
    <div className={styles.list}>
      <h3 className={styles.title}>
        {t('modals.presets.your-presets-title')}{' '}
        {presets.length > 0 && `(${presets.length})`}
      </h3>

      {!presets.length && (
        <p className={styles.empty}>{t('modals.presets.empty')}</p>
      )}

      {presets.map(preset => (
        <div className={styles.preset} key={preset.id}>
          <input
            placeholder={t('common.untitled')}
            type="text"
            value={preset.label}
            onChange={e => changeName(preset.id, e.target.value)}
          />
          <Tooltip
            showDelay={0}
            content={
              t('modals.presets.delete-button-tooltip') || 'Delete preset'
            }
          >
            <button
              aria-label={
                t('modals.presets.delete-button-aria-label') ||
                `Delete preset ${preset.label || t('common.untitled')}`
              }
              onClick={() => deletePreset(preset.id)}
            >
              <FaRegTrashAlt />
            </button>
          </Tooltip>
          <Tooltip
            content={t('modals.presets.play-button-tooltip') || 'Play preset'}
            showDelay={0}
          >
            <button
              className={styles.primary}
              aria-label={
                t('modals.presets.play-button-aria-label') ||
                `Play preset ${preset.label || t('common.untitled')}`
              }
              onClick={() => {
                override(preset.sounds);
                play();
                close();
              }}
            >
              <FaPlay />
            </button>
          </Tooltip>
        </div>
      ))}
    </div>
  );
}
