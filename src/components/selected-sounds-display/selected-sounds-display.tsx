import { useMemo, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaSave, FaPlay, FaTrash, FaEdit, FaCog, FaSignOutAlt, FaMusic } from 'react-icons/fa/index';
import { SaveMusicButton } from '@/components/buttons/save-music/save-music';
import { DeleteMusicButton } from '@/components/buttons/delete-music/delete-music';

import { useSoundStore } from '@/stores/sound';
import { useLocalizedSounds } from '@/hooks/useLocalizedSounds';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/stores/auth';
import { ApiClient } from '@/lib/api-client';

import { Sound } from '@/components/sounds/sound';
import styles from '../sounds/sounds.module.css';

interface SavedMusic {
  id: number;
  name: string;
  sounds: string[];
  volume: Record<string, number>;
  speed: Record<string, number>;
  rate: Record<string, number>;
  random_effects: Record<string, boolean>;
  created_at: string;
  updated_at: string;
}

export function SelectedSoundsDisplay() {
  const { t } = useTranslation();
  const localizedCategories = useLocalizedSounds();
  const { isAuthenticated, user, login, sessionPassword } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [savedMusicList, setSavedMusicList] = useState<SavedMusic[]>([]);
  const [isLoadingMusic, setIsLoadingMusic] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [showMusicDropdown, setShowMusicDropdown] = useState(true); // 默认展开
  const [expandedMusic, setExpandedMusic] = useState<Set<number>>(new Set()); // 跟踪展开的音乐项
  const [error, setError] = useState<string | null>(null);
  const [musicName, setMusicName] = useState('');

  // 获取声音store
  const sounds = useSoundStore(state => state.sounds);

  // 获取选中的声音
  const selectedSoundIds = useSoundStore(state =>
    Object.keys(state.sounds).filter(id => state.sounds[id].isSelected)
  );

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
    console.log('🔍 fetchSavedMusic 被调用');
    console.log('🔐 认证状态:', { isAuthenticated, user: user?.username });

    if (!isAuthenticated || !user) {
      console.log('❌ 用户未认证，退出获取音乐列表');
      setSavedMusicList([]);
      return;
    }

    setIsLoadingMusic(true);
    setError(null);

    try {
      console.log('🔍 开始获取音乐列表，用户:', user.username);

      // 检查localStorage中的token
      const authStorage = localStorage.getItem('auth-storage');
      console.log('🗄️ localStorage中的auth-storage:', authStorage);
      if (authStorage) {
        try {
          const parsed = JSON.parse(authStorage);
          console.log('🔑 parsed state token:', parsed.state?.token ? '存在' : '不存在');
          console.log('🔑 parsed state user:', parsed.state?.user?.username);
        } catch (e) {
          console.error('解析auth-storage失败:', e);
        }
      }

      // 检查store中的token
      const storeToken = useAuthStore.getState().getToken();
      console.log('🏪 store中的token:', storeToken ? '存在' : '不存在');

      const response = await ApiClient.post('/api/auth/music/list');

      console.log('📡 音乐列表API响应状态:', response.status);
      console.log('📡 响应头:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API响应错误:', response.status, errorText);
        throw new Error(`获取音乐列表失败 (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      console.log('📋 音乐列表数据:', data);

      if (data.success) {
        console.log('✅ 设置音乐列表:', data.musicList || [], '数量:', (data.musicList || []).length);
        setSavedMusicList(data.musicList || []);
        console.log('✅ savedMusicList状态更新完成');
      } else {
        setError(data.error || '获取音乐列表失败');
        console.error('❌ 音乐列表API返回错误:', data.error);
      }
    } catch (error) {
      console.error('❌ 获取音乐列表失败:', error);
      setError('获取音乐列表失败，请稍后再试');
      setSavedMusicList([]);
    } finally {
      setIsLoadingMusic(false);
    }
  };

  // 重命名音乐
  const renameMusic = async (musicId: string, newName: string) => {
    if (!isAuthenticated || !user) return;

    try {
      const response = await fetch('/api/auth/music/rename', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          musicId,
          name: newName,
          username: user.username,
          password: sessionPassword || '',
        }),
      });

      if (!response.ok) {
        throw new Error('重命名失败');
      }

      const data = await response.json();
      if (data.success) {
        setSavedMusicList(prev =>
          prev.map(music =>
            music.id === parseInt(musicId) ? { ...music, name: newName } : music
          )
        );
        setEditingId(null);
        setEditingName('');
        console.log('✅ 音乐重命名成功');
      } else {
        setError(data.error || '重命名失败');
      }
    } catch (error) {
      console.error('❌ 重命名音乐失败:', error);
      setError('重命名失败');
    }
  };

  // 删除音乐
  const deleteMusic = async (musicId: string) => {
    if (!isAuthenticated || !user) return;
    if (!confirm('确定要删除这首音乐吗？')) return;

    try {
      const response = await fetch('/api/auth/music/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          musicId,
          username: user.username,
          password: sessionPassword || '',
        }),
      });

      if (!response.ok) {
        throw new Error('删除失败');
      }

      const data = await response.json();
      if (data.success) {
        setSavedMusicList(prev => prev.filter(music => music.id !== parseInt(musicId)));
        console.log('✅ 音乐删除成功');
      } else {
        setError(data.error || '删除失败');
      }
    } catch (error) {
      console.error('❌ 删除音乐失败:', error);
      setError('删除失败');
    }
  };

  // 切换音乐展开状态
  const toggleMusicExpansion = (musicId: number) => {
    setExpandedMusic(prev => {
      const newSet = new Set(prev);
      if (newSet.has(musicId)) {
        newSet.delete(musicId);
      } else {
        newSet.add(musicId);
      }
      return newSet;
    });
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
        setVolume(soundId, volume / 100);

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

      console.log('✅ 开始播放音乐:', music.name);
    }, 100);
  };

  // 保存音乐功能
  const saveMusic = async () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    if (selectedSoundIds.length === 0) {
      setError('请先选择声音');
      setTimeout(() => setError(null), 3000);
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

      const musicData = {
        name: musicName || `我的音乐 ${new Date().toLocaleDateString()}`,
        sounds: selectedSoundIds,
        volume,
        speed,
        rate,
        random_effects,
        username: user?.username,
        password: sessionPassword || '' // 使用会话密码，如果为空则让后端处理
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
        console.log('✅ 音乐保存成功:', result.music);
        // 保存成功后刷新列表
        await fetchSavedMusic();
      } else {
        const errorData = await response.json();
        console.error('❌ 保存音乐失败:', errorData.error);
        // 如果是认证错误，显示登录提示
        if (response.status === 401) {
          setShowLoginPrompt(true);
        }
        setError(errorData.error || '保存失败');
        setTimeout(() => setError(null), 3000);
      }
    } catch (error) {
      console.error('❌ 保存音乐失败:', error);
      // 网络错误或其他异常，显示登录提示
      setShowLoginPrompt(true);
      setError('保存失败，请重试');
      setTimeout(() => setError(null), 3000);
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

  // 当用户认证状态改变时，获取音乐列表
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchSavedMusic();
    } else {
      setSavedMusicList([]);
    }
  }, [isAuthenticated, user]);

  // 当用户认证状态改变时，获取音乐列表
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('🎵 用户已登录，自动获取音乐列表...');
      fetchSavedMusic();
    } else {
      setSavedMusicList([]);
    }
  }, [isAuthenticated, user]);

  
  // 如果没有选中任何声音，不显示组件
  if (selectedSounds.length === 0) {
    return null;
  }

  return (
    <div className={styles.soundsContainer}>
      {/* 音乐名称配置区域 */}
      {selectedSounds.length > 0 && (
        <div className={styles.musicNameConfig}>
          <input
            type="text"
            value={musicName}
            onChange={(e) => setMusicName(e.target.value)}
            placeholder="音乐名称"
            className={styles.musicNameInput}
            maxLength={50}
          />
          <SaveMusicButton />
          <DeleteMusicButton />
        </div>
      )}

      {/* 选中的声音展示 */}
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

      {/* 音乐列表区域 - 只有登录用户才显示 */}
      {isAuthenticated && (
        <div className={styles.musicSection}>
          <div className={styles.musicHeader}>
            <h4 className={styles.musicTitle}>
              <FaCog className={styles.musicIcon} />
              我的音乐
            </h4>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className={styles.error}>
              {error}
              <button onClick={() => setError(null)} className={styles.errorClose}>×</button>
            </div>
          )}

          {/* 保存成功提示 */}
          {showSaveSuccess && (
            <div className={styles.saveSuccess}>
              <p>✓ 音乐保存成功！</p>
              <button onClick={() => setShowSaveSuccess(false)}>
                确定
              </button>
            </div>
          )}

          {/* 音乐列表 - 自动显示 */}
          <div className={styles.musicList}>
            {console.log('🎵 渲染音乐列表:', { isLoadingMusic, listLength: savedMusicList.length })}
            {isLoadingMusic ? (
              <div className={styles.loading}>加载中...</div>
            ) : savedMusicList.length === 0 ? (
              <div className={styles.empty}>
                <FaMusic className={styles.emptyIcon} />
                <p>还没有保存的音乐</p>
                <p className={styles.emptyHint}>选择声音并点击保存按钮来创建你的第一首音乐</p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {savedMusicList.map((music) => (
                  <div key={music.id} className={styles.musicItem}>
                    {editingId === music.id.toString() ? (
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
                            onClick={() => {
                              if (editingName.trim()) {
                                renameMusic(music.id.toString(), editingName.trim());
                              }
                            }}
                            className={`${styles.editButton} ${styles.saveButton}`}
                            title="保存"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditingName('');
                            }}
                            className={`${styles.editButton} ${styles.cancelButton}`}
                            title="取消"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.musicContent}>
                        <button
                          onClick={() => playSavedMusic(music)}
                          className={styles.playButton}
                          title="播放这首音乐"
                        >
                          <FaPlay />
                        </button>
                        <div className={styles.musicInfo}>
                          <div className={styles.musicNameRow}>
                            <span
                              className={styles.musicName}
                              onClick={() => {
                                setEditingId(music.id.toString());
                                setEditingName(music.name);
                              }}
                              title="点击编辑名称"
                            >
                              {music.name}
                            </span>
                            <button
                              onClick={() => toggleMusicExpansion(music.id)}
                              className={styles.expandButton}
                              title="展开/收起声音详情"
                            >
                              {expandedMusic.has(music.id) ? '收起 ▲' : '展开 ▼'}
                            </button>
                          </div>
                          {/* 展开时显示收录的声音名字 */}
                          {expandedMusic.has(music.id) && (
                            <div className={styles.soundNames}>
                              {music.sounds && music.sounds.length > 0 ? (
                                music.sounds.map((soundId: string, index: number) => {
                                  // 从所有声音中查找对应的声音名称
                                  const allSounds = localizedCategories
                                    .map(category => category.sounds)
                                    .flat();
                                  const sound = allSounds.find(s => s.id === soundId);
                                  return sound ? (
                                    <span key={soundId} className={styles.soundName}>
                                      {sound.label}{index < music.sounds.length - 1 ? ', ' : ''}
                                    </span>
                                  ) : null;
                                })
                              ) : (
                                <span className={styles.noSounds}>暂无声音</span>
                              )}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => deleteMusic(music.id.toString())}
                          className={styles.deleteButton}
                          title="删除"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </AnimatePresence>
            )}
          </div>
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
  );
}