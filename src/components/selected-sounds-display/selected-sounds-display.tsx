import { useMemo, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaSave, FaPlay, FaTrash, FaEdit, FaCog, FaSignOutAlt, FaMusic, FaChevronDown, FaChevronRight } from 'react-icons/fa/index';
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
  const [expandedMusic, setExpandedMusic] = useState<Set<number>>(new Set()); // 跟踪展开的音乐项
  const [expandedCurrent, setExpandedCurrent] = useState(true); // 跟踪当前选中音乐的展开状态，默认展开
  const [expandedMyMusic, setExpandedMyMusic] = useState(false); // 跟踪我的音乐展开状态，默认收起
  const [error, setError] = useState<string | null>(null);
  const [musicName, setMusicName] = useState('');

  // 获取声音store
  const sounds = useSoundStore(state => state.sounds);

  // 获取选中的声音
  const selectedSoundIds = useSoundStore(state =>
    Object.keys(state.sounds).filter(id => state.sounds[id].isSelected)
  );

  // 互斥展开逻辑：展开当前音乐时收起我的音乐，反之亦然
  const toggleExpandedCurrent = () => {
    if (expandedCurrent) {
      setExpandedCurrent(false);
    } else {
      setExpandedCurrent(true);
      setExpandedMyMusic(false);
      setExpandedMusic(new Set()); // 收起所有展开的音乐项
    }
  };

  const toggleExpandedMyMusic = () => {
    if (expandedMyMusic) {
      setExpandedMyMusic(false);
    } else {
      setExpandedMyMusic(true);
      setExpandedCurrent(false);
      setExpandedMusic(new Set()); // 收起所有展开的音乐项
    }
  };

  // 获取声音store的操作函数
  const unselectAll = useSoundStore(state => state.unselectAll);
  const select = useSoundStore(state => state.select);

  // 播放音乐记录 - 清空当前选择并加载音乐的声音配置
  const playMusicRecord = async (music: SavedMusic) => {
    try {
      // 清空当前所有选择
      unselectAll();

      // 根据音乐记录重新选择声音并设置参数
      for (const [soundId, volume] of Object.entries(music.volume)) {
        const speed = music.speed[soundId] || 1;
        const rate = music.rate[soundId] || 1;
        const randomEffect = music.random_effects[soundId] || false;

        // 选择声音并设置参数
        select(soundId, {
          volume,
          speed,
          rate,
          randomEffect
        });
      }

      console.log(`🎵 播放音乐记录: ${music.name}`);
    } catch (error) {
      console.error('❌ 播放音乐记录失败:', error);
    }
  };

  // 切换音乐项的展开/收起状态
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

  // 根据选中的声音ID获取声音对象
  const selectedSounds = useMemo(() => {
    return selectedSoundIds.map(id => {
      const sound = sounds[id];
      return {
        id,
        ...sound
      };
    }).filter(Boolean);
  }, [selectedSoundIds, sounds]);

  // 获取音乐列表
  const fetchMusicList = async () => {
    if (!isAuthenticated || !user) return;

    setIsLoadingMusic(true);
    setError(null);

    try {
      console.log('🎵 开始获取音乐列表...');
      console.log('👤 用户信息:', { id: user.id, username: user.username });

      const response = await ApiClient.post('/api/auth/music/list', {
        userId: user.id
      });

      console.log('📡 响应状态:', response.status);
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
      const response = await ApiClient.post('/api/auth/music/rename', {
        musicId,
        name: newName
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
      } else {
        setError(data.error || '重命名失败');
      }
    } catch (error) {
      console.error('❌ 重命名失败:', error);
      setError('重命名失败，请稍后再试');
    }
  };

  // 删除音乐
  const deleteMusic = async (musicId: string) => {
    if (!isAuthenticated || !user) return;

    if (!confirm('确定要删除这首音乐吗？')) return;

    try {
      console.log('🗑️ 开始删除音乐:', musicId);
      const response = await ApiClient.post('/api/auth/music/delete', {
        musicId,
        userId: user.id
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ 删除失败:', response.status, errorText);
        throw new Error(`删除失败 (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      console.log('📋 删除响应:', data);

      if (data.success) {
        setSavedMusicList(prev => prev.filter(music => music.id !== parseInt(musicId)));
        console.log('✅ 音乐删除成功');
      } else {
        setError(data.error || '删除失败');
        console.error('❌ 删除API返回错误:', data.error);
      }
    } catch (error) {
      console.error('❌ 删除音乐失败:', error);
      setError('删除失败，请稍后再试');
    }
  };

  // 初始加载音乐列表
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchMusicList();
    }
  }, [isAuthenticated, user]);

  // 如果没有选中的声音，不渲染组件
  if (selectedSounds.length === 0) {
    return null;
  }

  return (
    <div className={styles.soundsContainer}>
      {/* 当前选中音乐标题区域 */}
      {selectedSounds.length > 0 && (
        <div className={styles.musicHeader}>
          <h4 className={styles.musicTitle}>
            <FaMusic className={styles.musicIcon} />
            当前选中音乐
          </h4>
          <button
            className={`${styles.expandButton} ${styles.expandButtonCurrent}`}
            onClick={toggleExpandedCurrent}
            title={expandedCurrent ? "收起" : "展开"}
          >
            {expandedCurrent ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        </div>
      )}

      {/* 音乐名称配置区域 */}
      {selectedSounds.length > 0 && expandedCurrent && (
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
      {selectedSounds.length > 0 && expandedCurrent && (
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
      )}

      {/* 音乐列表区域 - 只有登录用户才显示 */}
      {isAuthenticated && (
        <div className={styles.musicSection}>
          <div className={styles.musicHeader}>
            <h4 className={styles.musicTitle}>
              <FaCog className={styles.musicIcon} />
              我的音乐
            </h4>
            <button
              className={styles.expandButton}
              onClick={toggleExpandedMyMusic}
              title={expandedMyMusic ? "收起" : "展开"}
            >
              {expandedMyMusic ? <FaChevronDown /> : <FaChevronRight />}
            </button>
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

          {/* 音乐列表 - 展开时显示 */}
          {expandedMyMusic && (
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
                              <FaSave />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className={`${styles.editButton} ${styles.cancelButton}`}
                              title="取消"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.musicContent}>
                          <div className={styles.musicNameRow}>
                            <div className={styles.musicInfo}>
                              <div className={styles.musicName}>{music.name}</div>
                              <div className={styles.soundNames}>
                                {music.sounds && music.sounds.length > 0 ? (
                                  music.sounds.map((soundId, index) => {
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
                            </div>
                          </div>
                          <button
                            onClick={() => deleteMusic(music.id.toString())}
                            className={styles.deleteButton}
                            title="删除"
                          >
                            <FaTrash />
                          </button>
                          <button
                            onClick={() => toggleMusicExpansion(music.id)}
                            className={styles.expandButton}
                            title="展开/收起声音详情"
                          >
                            {expandedMusic.has(music.id) ? '收起 ▲' : '展开 ▼'}
                          </button>
                        </div>
                      )}

                      {/* 展开时显示的声音内容 */}
                      {expandedMusic.has(music.id) && (
                        <div className={styles.expandedMusicContent}>
                          {/* 播放按钮 */}
                          <div className={styles.musicActions}>
                            <button
                              onClick={() => playMusicRecord(music)}
                              className={styles.playMusicButton}
                              title="播放这首音乐"
                            >
                              <FaPlay />
                              播放
                            </button>
                          </div>

                          {/* 声音组件展示 */}
                          <div className={styles.sounds}>
                            <AnimatePresence initial={false}>
                              {music.sounds.map((soundId) => {
                                // 从所有声音中查找对应的声音
                                const allSounds = localizedCategories
                                  .map(category => category.sounds)
                                  .flat();
                                const sound = allSounds.find(s => s.id === soundId);

                                if (!sound) return null;

                                return (
                                  <Sound
                                    key={`${music.id}-${soundId}`}
                                    id={soundId}
                                    icon={sound.icon}
                                    label={sound.label}
                                    src={sound.src}
                                    functional={false}
                                    displayMode={true}
                                    hidden={false}
                                    selectHidden={() => {}}
                                    unselectHidden={() => {}}
                                  />
                                );
                              })}
                            </AnimatePresence>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          )}
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