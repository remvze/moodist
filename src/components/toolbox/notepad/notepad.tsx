import { useRef, useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi/index';
import { LuCopy, LuDownload } from 'react-icons/lu/index';
import { FaCheck } from 'react-icons/fa6/index';
import { FaUndo } from 'react-icons/fa/index';

import { Modal } from '@/components/modal';
import { Button } from './button';

import { useNoteStore } from '@/stores/note';
import { useCopy } from '@/hooks/use-copy';
import { download } from '@/helpers/download';

import styles from './notepad.module.css';

// 安全地获取localStorage
function getLocalStorageItem(key: string, defaultValue: string = 'en'): string {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      return localStorage.getItem(key) || defaultValue;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}

interface NotepadProps {
  onClose: () => void;
  show: boolean;
}

export function Notepad({ onClose, show }: NotepadProps) {
  const [currentLang, setCurrentLang] = useState('en');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const note = useNoteStore(state => state.note);
  const history = useNoteStore(state => state.history);
  const write = useNoteStore(state => state.write);
  const words = useNoteStore(state => state.words());
  const characters = useNoteStore(state => state.characters());
  const clear = useNoteStore(state => state.clear);
  const restore = useNoteStore(state => state.restore);

  const { copy, copying } = useCopy();

  // 在客户端初始化语言
  useEffect(() => {
    const lang = getLocalStorageItem('moodist-language');
    setCurrentLang(lang);
    
    // 监听语言变化
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail.language);
    };
    
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (show && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    }
  }, [show]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();

    if (e.key === 'Escape') onClose();
  };

  // 获取本地化文本
  const labelText = currentLang === 'zh' ? '您的笔记' : 'Your Note';
  const copyTooltip = currentLang === 'zh' ? '复制笔记' : 'Copy Note';
  const downloadTooltip = currentLang === 'zh' ? '下载笔记' : 'Download Note';
  const restoreTooltip = currentLang === 'zh' ? '恢复笔记' : 'Restore Note';
  const clearTooltip = currentLang === 'zh' ? '清空笔记' : 'Clear Note';
  const downloadFileName = currentLang === 'zh' ? 'Moodist笔记.txt' : 'Moodist Note.txt';
  const placeholderText = currentLang === 'zh' ? '您在想什么？' : 'What is on your mind?';
  const characterText = currentLang === 'zh' ? '字符' : 'character';
  const charactersText = currentLang === 'zh' ? '字符' : 'characters';
  const wordText = currentLang === 'zh' ? '词' : 'word';
  const wordsText = currentLang === 'zh' ? '词' : 'words';

  return (
    <Modal show={show} wide onClose={onClose}>
      <header className={styles.header}>
        <h2 className={styles.label}>{labelText}</h2>
        <div className={styles.buttons}>
          <Button
            icon={copying ? <FaCheck /> : <LuCopy />}
            tooltip={copyTooltip}
            onClick={() => copy(note)}
          />
          <Button
            icon={<LuDownload />}
            tooltip={downloadTooltip}
            onClick={() => download(downloadFileName, note)}
          />
          <Button
            critical={!history}
            icon={history ? <FaUndo /> : <BiTrash />}
            recommended={!!history}
            tooltip={history ? restoreTooltip : clearTooltip}
            onClick={() => (history ? restore() : clear())}
          />
        </div>
      </header>

      <textarea
        className={styles.textarea}
        dir="auto"
        placeholder={placeholderText}
        ref={textareaRef}
        spellCheck={false}
        value={note}
        onChange={e => write(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <p className={styles.counter}>
        {characters} {characters === 1 ? characterText : charactersText} • {words} {words === 1 ? wordText : wordsText}
      </p>
    </Modal>
  );
}
