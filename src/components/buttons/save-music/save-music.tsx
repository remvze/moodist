import { useState, useCallback } from 'react';
import { FaSave } from 'react-icons/fa';
import { useSoundStore } from '@/stores/sound';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '@/hooks/useNotification';
import { useLocalizedSounds } from '@/hooks/useLocalizedSounds';
import { Notification } from '@/components/notification/notification';
import { ApiClient } from '@/lib/api-client';
import { cn } from '@/helpers/styles';

import styles from './save-music.module.css';
import soundsStyles from '@/components/sounds/sounds.module.css';

export function SaveMusicButton() {
  const { isAuthenticated, user } = useAuthStore();
  const sounds = useSoundStore(state => state.sounds);
  const selectedSoundIds = useSoundStore(state =>
    Object.keys(state.sounds).filter(id => state.sounds[id].isSelected)
  );
  const { showNotificationMessage, ...notificationState } = useNotification();
  const localizedCategories = useLocalizedSounds();

  const [isSaving, setIsSaving] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // 获取选中的声音详细信息
  const selectedSounds = selectedSoundIds
    .map(id => {
      const allSounds = localizedCategories
        .map(category => category.sounds)
        .flat();
      return allSounds.find(sound => sound.id === id);
    })
    .filter(Boolean);

  const noSelected = selectedSounds.length === 0;

  // 获取音乐名称输入框的值
  const getMusicName = useCallback(() => {
    const musicInput = document.querySelector('input[placeholder="音乐名称"]') as HTMLInputElement;
    return musicInput?.value?.trim() || '';
  }, []);

  const handleSave = useCallback(async () => {
    if (noSelected) return showNotificationMessage('请先选择声音', 'error');

    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    // 验证音乐名称输入
    const musicName = getMusicName();
    if (!musicName) {
      showNotificationMessage('请输入音乐名称', 'error');
      const musicInput = document.querySelector('input[placeholder="音乐名称"]') as HTMLInputElement;
      musicInput?.focus();
      return;
    }

    setIsSaving(true);

    try {
      // 准备保存的数据
      const volume: Record<string, number> = {};
      const speed: Record<string, number> = {};
      const rate: Record<string, number> = {};
      const random_effects: Record<string, boolean> = {};

      selectedSounds.forEach(sound => {
        if (sound) {
          volume[sound.id] = sounds[sound.id]?.volume || 50;
          speed[sound.id] = sounds[sound.id]?.speed || 1;
          rate[sound.id] = sounds[sound.id]?.rate || 1;
          random_effects[sound.id] = sounds[sound.id]?.isRandomSpeed || sounds[sound.id]?.isRandomVolume || sounds[sound.id]?.isRandomRate || false;
        }
      });

      const musicData = {
        name: musicName,
        sounds: selectedSoundIds,
        volume,
        speed,
        rate,
        random_effects
      };

      const response = await ApiClient.post('/api/auth/music/save', musicData);

      if (response.ok) {
        const result = await response.json();
        showNotificationMessage('音乐保存成功！', 'success');
        console.log('✅ 音乐保存成功:', result.music);
      } else {
        const errorData = await response.json();
        console.error('❌ 保存音乐失败:', errorData.error);

        if (response.status === 401) {
          // JWT认证失败，显示登录提示
          setShowLoginPrompt(true);
        }
        showNotificationMessage(errorData.error || '保存失败', 'error');
      }
    } catch (error) {
      console.error('❌ 保存音乐失败:', error);
      if (error instanceof Error && error.message.includes('401')) {
        setShowLoginPrompt(true);
      }
      showNotificationMessage('保存失败，请重试', 'error');
    } finally {
      setIsSaving(false);
    }
  }, [noSelected, isAuthenticated, user, selectedSounds, selectedSoundIds, sounds, showNotificationMessage, getMusicName]);

  return (
    <>
      <button
        className={cn(styles.saveButton, noSelected && styles.disabled, isSaving && styles.saving)}
        onClick={handleSave}
        disabled={isSaving || noSelected}
        title={isAuthenticated ? '保存当前音乐配置' : '请先登录后再保存'}
      >
        <FaSave />
      </button>

      {/* 登录提示 */}
      {showLoginPrompt && (
        <div className={soundsStyles.loginPrompt}>
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

  
      {/* 通用通知组件 */}
      <Notification
        show={notificationState.showNotification}
        message={notificationState.notificationMessage}
        type={notificationState.notificationType}
        onClose={notificationState.hideNotification}
      />
    </>
  );
}