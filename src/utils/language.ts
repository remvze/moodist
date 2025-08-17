// 安全地获取localStorage
export function getLocalStorageItem(key: string, defaultValue: string = 'en'): string {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      return localStorage.getItem(key) || defaultValue;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}

// 获取当前语言
export function getCurrentLanguage(): string {
  return getLocalStorageItem('moodist-language', 'en');
}

// 语言文本映射
export const languageTexts = {
  shortcuts: { en: 'Shortcuts', zh: '快捷键' },
  pomodoro: { en: 'Pomodoro', zh: '番茄钟' },
  notepad: { en: 'Notepad', zh: '记事本' },
  todo: { en: 'Todo Checklist', zh: '待办清单' },
  sleepTimer: { en: 'Sleep Timer', zh: '睡眠定时器' },
  presets: { en: 'Your Presets', zh: '您的预设' },
  share: { en: 'Share Sounds', zh: '分享音效' },
  shuffle: { en: 'Shuffle Sounds', zh: '随机播放' },
  breathingExercise: { en: 'Breathing Exercise', zh: '呼吸练习' },
  countdown: { en: 'Countdown Timer', zh: '倒计时' },
  binaural: { en: 'Binaural Beats', zh: '双耳节拍' },
  isochronic: { en: 'Isochronic Tones', zh: '等时音调' },
  lofi: { en: 'Lofi Music Player', zh: 'Lofi音乐播放器' },
  buyMeCoffee: { en: 'Buy Me a Coffee', zh: '请我喝咖啡' },
  sourceCode: { en: 'Source Code', zh: '源代码' },
  globalVolume: { en: 'Global Volume', zh: '全局音量' }
};

// 音效分类标题映射
export const categoryTitles = {
  nature: { en: 'Nature', zh: '自然' },
  animals: { en: 'Animals', zh: '动物' },
  rain: { en: 'Rain', zh: '雨声' },
  places: { en: 'Places', zh: '场所' },
  things: { en: 'Things', zh: '物品' },
  transport: { en: 'Transport', zh: '交通' },
  urban: { en: 'Urban', zh: '城市' },
  noise: { en: 'Noise', zh: '噪音' },
  binaural: { en: 'Binaural', zh: '双耳节拍' }
};

// 获取指定键的本地化文本
export function getLocalizedText(key: keyof typeof languageTexts): string {
  const currentLang = getCurrentLanguage();
  return languageTexts[key][currentLang as 'en' | 'zh'] || languageTexts[key].en;
}

// 获取音效分类的本地化标题
export function getLocalizedCategoryTitle(categoryId: keyof typeof categoryTitles): string {
  const currentLang = getCurrentLanguage();
  return categoryTitles[categoryId]?.[currentLang as 'en' | 'zh'] || categoryTitles[categoryId]?.en || categoryId;
}
