import { useState, useCallback, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useSoundStore } from '@/stores/sound';
import { useAuthStore } from '@/stores/auth';
import { useSnackbar } from '@/contexts/snackbar';
import { useLocalizedSounds } from '@/hooks/useLocalizedSounds';
import { ApiClient } from '@/lib/api-client';
import { cn } from '@/helpers/styles';

import styles from './delete-music.module.css';

interface SavedMusic {
  id: number;
  name: string;
  sounds: string[];
  created_at: string;
}

export function DeleteMusicButton() {
  const { isAuthenticated, user } = useAuthStore();
  const sounds = useSoundStore(state => state.sounds);
  const selectedSoundIds = useSoundStore(state =>
    Object.keys(state.sounds).filter(id => state.sounds[id].isSelected)
  );
  const showSnackbar = useSnackbar();
  const localizedCategories = useLocalizedSounds();

  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDropdown, setShowDeleteDropdown] = useState(false);
  const [savedMusicList, setSavedMusicList] = useState<SavedMusic[]>([]);
  const [isLoadingMusic, setIsLoadingMusic] = useState(false);

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
  const hasSelected = selectedSounds.length > 0;

  // 获取用户保存的音乐列表
  const fetchSavedMusic = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setSavedMusicList([]);
      return;
    }

    setIsLoadingMusic(true);

    try {
      const response = await ApiClient.post('/api/auth/music/list');

      if (!response.ok) {
        throw new Error('获取音乐列表失败');
      }

      const data = await response.json();
      if (data.success) {
        setSavedMusicList(data.musicList || []);
      }
    } catch (error) {
      console.error('❌ 获取音乐列表失败:', error);
      setSavedMusicList([]);
    } finally {
      setIsLoadingMusic(false);
    }
  }, [isAuthenticated, user]);

  // 删除音乐
  const deleteMusic = useCallback(async (musicId: string, musicName: string) => {
    if (!isAuthenticated || !user) return;
    if (!confirm(`确定要删除"${musicName}"吗？`)) return;

    setIsDeleting(true);

    try {
      const response = await ApiClient.post('/api/auth/music/delete', {
        musicId
      });

      if (!response.ok) {
        throw new Error('删除失败');
      }

      const data = await response.json();
      if (data.success) {
        setSavedMusicList(prev => prev.filter(music => music.id !== parseInt(musicId)));
        showSnackbar(`已删除音乐: ${musicName}`);
        console.log('✅ 音乐删除成功');
      } else {
        showSnackbar(data.error || '删除失败');
      }
    } catch (error) {
      console.error('❌ 删除音乐失败:', error);
      showSnackbar('删除失败');
    } finally {
      setIsDeleting(false);
    }
  }, [isAuthenticated, user, showSnackbar]);

  // 当用户认证状态改变时，获取音乐列表
  const handleToggleDropdown = useCallback(() => {
    if (!isAuthenticated) {
      showSnackbar('请先登录后再删除音乐');
      return;
    }

    if (!showDeleteDropdown && savedMusicList.length === 0) {
      fetchSavedMusic();
    }
    setShowDeleteDropdown(!showDeleteDropdown);
  }, [isAuthenticated, showDeleteDropdown, savedMusicList.length, fetchSavedMusic, showSnackbar]);

  // 点击外部关闭下拉菜单
  const handleDocumentClick = useCallback((event: MouseEvent) => {
    const target = event.target as Element;
    if (showDeleteDropdown && !target.closest(`.${styles.deleteDropdownContainer}`)) {
      setShowDeleteDropdown(false);
    }
  }, [showDeleteDropdown]);

  // 添加和移除事件监听器
  useEffect(() => {
    if (showDeleteDropdown) {
      document.addEventListener('click', handleDocumentClick);
    }
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [showDeleteDropdown, handleDocumentClick]);

  return (
    <div className={styles.deleteDropdownContainer}>
      <button
        className={cn(styles.deleteButton, !isAuthenticated && styles.disabled)}
        onClick={handleToggleDropdown}
        disabled={!isAuthenticated}
        title={isAuthenticated ? '删除保存的音乐' : '请先登录后再删除'}
      >
        <FaTrash />
      </button>

      {/* 删除下拉菜单 */}
      {showDeleteDropdown && (
        <div className={styles.deleteDropdown}>
          <div className={styles.dropdownHeader}>
            <h4>删除音乐</h4>
            <button
              className={styles.closeButton}
              onClick={() => setShowDeleteDropdown(false)}
            >
              ×
            </button>
          </div>

          {isLoadingMusic ? (
            <div className={styles.loading}>加载中...</div>
          ) : savedMusicList.length === 0 ? (
            <div className={styles.empty}>没有可删除的音乐</div>
          ) : (
            <div className={styles.musicList}>
              {savedMusicList.map((music) => (
                <div key={music.id} className={styles.musicItem}>
                  <span className={styles.musicName}>{music.name}</span>
                  <button
                    onClick={() => deleteMusic(music.id.toString(), music.name)}
                    className={styles.deleteItemButton}
                    title={`删除 ${music.name}`}
                    disabled={isDeleting}
                  >
                    {isDeleting ? '删除中...' : '删除'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}