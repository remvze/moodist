import { useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { FaSave } from 'react-icons/fa/index';

import { useSoundStore } from '@/stores/sound';
import { useLocalizedSounds } from '@/hooks/useLocalizedSounds';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/stores/auth';

import { Sound } from '@/components/sounds/sound';
import styles from '../sounds/sounds.module.css';

export function SelectedSoundsDisplay() {
  const { t } = useTranslation();
  const localizedCategories = useLocalizedSounds();
  const { isAuthenticated, user, login, sessionPassword } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // 获取声音store
  const sounds = useSoundStore(state => state.sounds);

  // 获取选中的声音
  const selectedSoundIds = useSoundStore(state =>
    Object.keys(state.sounds).filter(id => state.sounds[id].isSelected)
  );

  // 保存音乐功能
  const saveMusic = async () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    setIsSaving(true);

    try {
      // 准备保存的数据
      const selectedSoundsData = selectedSoundIds.map(id => sounds[id]);
      const volume: Record<string, number> = {};
      const speed: Record<string, number> = {};
      const rate: Record<string, number> = {};
      const random_effects: Record<string, boolean> = {};

      selectedSoundsData.forEach(sound => {
        volume[sound.id] = sound.volume;
        speed[sound.id] = sound.speed;
        rate[sound.id] = sound.rate;
        random_effects[sound.id] = sound.isRandomSpeed || sound.isRandomVolume || sound.isRandomRate;
      });

      // 检查是否有sessionPassword
      if (!sessionPassword) {
        console.error('会话密码丢失，请重新登录');
        setShowLoginPrompt(true);
        setIsSaving(false);
        return;
      }

      const musicData = {
        name: `我的音乐 ${new Date().toLocaleDateString()}`,
        sounds: selectedSoundIds,
        volume,
        speed,
        rate,
        random_effects,
        username: user?.username,
        password: sessionPassword // 使用会话密码
      };

      // 调用保存API
      const response = await fetch('/api/auth/music/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(musicData),
      });

      if (response.ok) {
        const result = await response.json();
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 2000);
        console.log('✅ 音乐保存成功:', result.music);
      } else {
        const errorData = await response.json();
        console.error('❌ 保存音乐失败:', errorData.error);
        // 如果是认证错误，显示登录提示
        if (response.status === 401) {
          setShowLoginPrompt(true);
        }
      }
    } catch (error) {
      console.error('❌ 保存音乐失败:', error);
      // 网络错误或其他异常，显示登录提示
      setShowLoginPrompt(true);
    } finally {
      setIsSaving(false);
    }
  };

  // 获取选中的声音详细信息
  const selectedSounds = useMemo(() => {
    const allSounds = localizedCategories
      .map(category => category.sounds)
      .flat();

    return selectedSoundIds
      .map(id => allSounds.find(sound => sound.id === id))
      .filter(Boolean);
  }, [selectedSoundIds, localizedCategories]);

  // 如果没有选中任何声音，不显示组件
  if (selectedSounds.length === 0) {
    return null;
  }

  return (
    <div className={styles.soundsContainer}>
      <div className={styles.sounds}>
        <AnimatePresence initial={false}>
          {selectedSounds.map((sound) => (
            <Sound
              key={sound.id}
              id={sound.id}
              icon={sound.icon}
              label={sound.label}
              src={sound.src}
              functional={false}
              displayMode={true}
              hidden={false}
              selectHidden={() => {}}
              unselectHidden={() => {}}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* 保存按钮区域 */}
      <div className={styles.saveSection}>
        <button
          className={`${styles.saveButton} ${isSaving ? styles.saving : ''}`}
          onClick={saveMusic}
          disabled={isSaving || selectedSounds.length === 0}
          title={isAuthenticated ? '保存当前音乐配置' : '请先登录后再保存'}
        >
          <FaSave />
          <span>
            {isSaving ? '保存中...' : '保存音乐'}
          </span>
        </button>

        {/* 保存成功提示 */}
        {showSaveSuccess && (
          <div className={styles.saveSuccess}>
            ✓ 音乐保存成功！
          </div>
        )}

        {/* 登录提示 */}
        {showLoginPrompt && (
          <div className={styles.loginPrompt}>
            <p>请先登录后再保存音乐</p>
            <button
              onClick={() => {
                setShowLoginPrompt(false);
                // 触发LanguageSwitcher的登录表单
                const event = new CustomEvent('showLoginForm', { bubbles: true });
                document.dispatchEvent(event);
              }}
            >
              去登录
            </button>
            <button onClick={() => setShowLoginPrompt(false)}>
              取消
            </button>
          </div>
        )}
      </div>
    </div>
  );
}