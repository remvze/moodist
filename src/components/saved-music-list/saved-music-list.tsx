import { useState, useEffect } from 'react';
import { FaMusic, FaEdit, FaTrash, FaPlay } from 'react-icons/fa';
import { AnimatePresence } from 'motion/react';

import { useAuthStore } from '@/stores/auth';
import { useSoundStore } from '@/stores/sound';
import { useTranslation } from '@/hooks/useTranslation';
import { ApiClient } from '@/lib/api-client';

import type { SavedMusic } from '@/lib/database';

import styles from './saved-music-list.module.css';

interface SavedMusicListProps {
  onMusicSelect?: (music: SavedMusic) => void;
}

export function SavedMusicList({ onMusicSelect }: SavedMusicListProps) {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuthStore();
  const [savedMusicList, setSavedMusicList] = useState<SavedMusic[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [error, setError] = useState<string | null>(null);

  // 获取声音store的操作函数
  const unselectAll = useSoundStore(state => state.unselectAll);
  const select = useSoundStore(state => state.select);
  const setVolume = useSoundStore(state => state.setVolume);
  const setSpeed = useSoundStore(state => state.setSpeed);
  const setRate = useSoundStore(state => state.setRate);
  const toggleRandomSpeed = useSoundStore(state => state.toggleRandomSpeed);
  const toggleRandomVolume = useSoundStore(state => state.toggleRandomVolume);
  const toggleRandomRate = useSoundStore(state => state.toggleRandomRate);
  const play = useSoundStore(state => state.play);

  // 获取用户保存的音乐列表
  const fetchSavedMusic = async () => {
    if (!isAuthenticated || !user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await ApiClient.post('/api/auth/music/list');

      if (!response.ok) {
        throw new Error('获取音乐列表失败');
      }

      const data = await response.json();
      if (data.success) {
        setSavedMusicList(data.musicList || []);
      } else {
        setError(data.error || '获取音乐列表失败');
      }
    } catch (err) {
      console.error('获取音乐列表错误:', err);
      setError('获取音乐列表失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  // 重命名音乐
  const renameMusic = async (musicId: string, newName: string) => {
    if (!isAuthenticated || !user) return;

    try {
      const response = await ApiClient.post('/api/auth/music/rename', {
        musicId,
        name: newName
      });

      if (!response.ok) {
        throw new Error('重命名失败');
      }

      const data = await response.json();
      if (data.success) {
        // 更新本地状态
        setSavedMusicList(prev =>
          prev.map(music =>
            music.id === musicId ? { ...music, name: newName } : music
          )
        );
        setEditingId(null);
        setEditingName('');
      } else {
        setError(data.error || '重命名失败');
      }
    } catch (err) {
      console.error('重命名音乐错误:', err);
      setError('重命名失败，请稍后再试');
    }
  };

  // 删除音乐
  const deleteMusic = async (musicId: string) => {
    if (!isAuthenticated || !user) return;

    if (!confirm('确定要删除这首音乐吗？')) {
      return;
    }

    try {
      const response = await ApiClient.post('/api/auth/music/delete', {
        musicId
      });

      if (!response.ok) {
        throw new Error('删除失败');
      }

      const data = await response.json();
      if (data.success) {
        // 从本地状态中移除
        setSavedMusicList(prev => prev.filter(music => music.id !== musicId));
      } else {
        setError(data.error || '删除失败');
      }
    } catch (err) {
      console.error('删除音乐错误:', err);
      setError('删除失败，请稍后再试');
    }
  };

  // 播放保存的音乐
  const playSavedMusic = async (music: SavedMusic) => {
    // 清除当前所有声音选择
    unselectAll(true);

    // 延迟一下确保清除完成后再开始播放
    setTimeout(() => {
      // 选择音乐中的所有声音
      music.sounds.forEach((soundId: string) => {
        // 选择声音
        select(soundId);

        // 设置音量
        const volume = music.volume[soundId] || 50;
        setVolume(soundId, volume / 100); // store中存储的是0-1的范围

        // 设置速度
        const speed = music.speed[soundId] || 1;
        setSpeed(soundId, speed);

        // 设置速率
        const rate = music.rate[soundId] || 1;
        setRate(soundId, rate);

        // 设置随机效果
        const randomEffects = music.random_effects[soundId];
        if (randomEffects) {
          if (randomEffects.volume) {
            toggleRandomVolume(soundId);
          }
          if (randomEffects.speed) {
            toggleRandomSpeed(soundId);
          }
          if (randomEffects.rate) {
            toggleRandomRate(soundId);
          }
        }
      });

      // 开始播放
      play();

      // 通知父组件音乐已被选中
      if (onMusicSelect) {
        onMusicSelect(music);
      }
    }, 100);
  };

  // 开始编辑名称
  const startEditing = (music: SavedMusic) => {
    setEditingId(music.id);
    setEditingName(music.name);
  };

  // 保存编辑
  const saveEdit = () => {
    if (editingId && editingName.trim()) {
      renameMusic(editingId, editingName.trim());
    }
  };

  // 取消编辑
  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
    setError(null);
  };

  // 当用户认证状态改变时，获取音乐列表
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchSavedMusic();
    } else {
      setSavedMusicList([]);
    }
  }, [isAuthenticated, user]);

  // 如果用户未登录，不显示组件
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.savedMusicList}>
      <h3 className={styles.title}>
        <FaMusic className={styles.titleIcon} />
        我的音乐
      </h3>

      {error && (
        <div className={styles.error}>
          {error}
          <button onClick={() => setError(null)} className={styles.errorClose}>×</button>
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>加载中...</div>
      ) : savedMusicList.length === 0 ? (
        <div className={styles.empty}>
          <FaMusic className={styles.emptyIcon} />
          <p>还没有保存的音乐</p>
          <p className={styles.emptyHint}>选择声音并点击保存按钮来创建你的第一首音乐</p>
        </div>
      ) : (
        <div className={styles.musicItems}>
          <AnimatePresence initial={false}>
            {savedMusicList.map((music) => (
              <div key={music.id} className={styles.musicItem}>
                {editingId === music.id ? (
                  <div className={styles.editForm}>
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className={styles.editInput}
                      placeholder="输入音乐名称"
                      maxLength={50}
                    />
                    <div className={styles.editButtons}>
                      <button
                        onClick={saveEdit}
                        className={`${styles.editButton} ${styles.saveButton}`}
                        title="保存"
                      >
                        ✓
                      </button>
                      <button
                        onClick={cancelEdit}
                        className={`${styles.editButton} ${styles.cancelButton}`}
                        title="取消"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={styles.musicInfo}>
                      <button
                        onClick={() => playSavedMusic(music)}
                        className={styles.playButton}
                        title="播放这首音乐"
                      >
                        <FaPlay />
                      </button>
                      <span
                        className={styles.musicName}
                        onClick={() => startEditing(music)}
                        title="点击编辑名称"
                      >
                        {music.name}
                      </span>
                    </div>
                    <div className={styles.musicActions}>
                      <button
                        onClick={() => startEditing(music)}
                        className={styles.actionButton}
                        title="编辑名称"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteMusic(music.id)}
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        title="删除"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}