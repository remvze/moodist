import { useState, useEffect } from 'react';
import { FaGlobe, FaSun, FaMoon, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa/index';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/stores/auth';

import styles from './language-switcher.module.css';
import { fade } from '@/lib/motion';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { currentLang, changeLanguage, t } = useTranslation();
  const { isAuthenticated, user, login, register, logout, isLoading, checkAuth, error, clearError } = useAuthStore();
  const [isDarkTheme, setIsDarkTheme] = useState<boolean | null>(null); // 使用 null 表示未初始化
  const [isClient, setIsClient] = useState(false); // 跟踪是否在客户端
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // 客户端检测
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 认证状态检查
  useEffect(() => {
    if (isClient) {
      checkAuth();
    }
  }, [isClient]);

  // 点击外部关闭用户菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showUserMenu && !target.closest(`.${styles.headerControls}`) && !target.closest(`.${styles.userMenu}`)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showUserMenu]);

  // 监听显示登录表单的自定义事件
  useEffect(() => {
    const handleShowLoginForm = () => {
      setShowAuthForm(true);
      setIsLogin(true); // 默认显示登录表单
    };

    document.addEventListener('showLoginForm', handleShowLoginForm);

    return () => {
      document.removeEventListener('showLoginForm', handleShowLoginForm);
    };
  }, []);

  // 主题切换逻辑 - 确保只在客户端执行
  useEffect(() => {
    // 避免在 SSR 环境下执行
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkTheme = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    setIsDarkTheme(initialDarkTheme);
    applyTheme(initialDarkTheme);
  }, []);

  const applyTheme = (isDark: boolean) => {
    const root = document.documentElement;
    const body = document.body;

    if (isDark) {
      root.classList.add('dark-theme');
      root.style.setProperty('--bg-primary', '#0d1117');
      root.style.setProperty('--bg-secondary', '#161b22');
      root.style.setProperty('--bg-tertiary', '#21262d');
      root.style.setProperty('--bg-quaternary', '#30363d');
      root.style.setProperty('--color-foreground', '#f0f6fc');
      root.style.setProperty('--color-foreground-subtle', '#8b949e');
      root.style.setProperty('--color-foreground-subtler', '#6e7681');
      root.style.setProperty('--color-muted', '#484f58');
      root.style.setProperty('--color-border', '#30363d');
      root.style.setProperty('--component-bg', '#161b22');
      root.style.setProperty('--component-hover', '#21262d');
      root.style.setProperty('--component-active', '#30363d');
      root.style.setProperty('--modal-bg', '#0d1117');
      root.style.setProperty('--input-bg', '#0d1117');
      body.style.backgroundColor = '#0d1117';
    } else {
      root.classList.remove('dark-theme');
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f8fafc');
      root.style.setProperty('--bg-tertiary', '#f1f5f9');
      root.style.setProperty('--bg-quaternary', '#e2e8f0');
      root.style.setProperty('--color-foreground', '#1e293b');
      root.style.setProperty('--color-foreground-subtle', '#475569');
      root.style.setProperty('--color-foreground-subtler', '#64748b');
      root.style.setProperty('--color-muted', '#94a3b8');
      root.style.setProperty('--color-border', '#cbd5e1');
      root.style.setProperty('--component-bg', '#ffffff');
      root.style.setProperty('--component-hover', '#f8fafc');
      root.style.setProperty('--component-active', '#f1f5f9');
      root.style.setProperty('--modal-bg', '#ffffff');
      root.style.setProperty('--input-bg', '#ffffff');
      body.style.backgroundColor = '#ffffff';
    }
  };

  const toggleTheme = () => {
    // 确保主题已初始化且在客户端环境
    if (isDarkTheme === null || typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }

    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // 显示提示信息
  const showNotificationMessage = (message: string, type: 'success' | 'error') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);

    // 3秒后自动关闭
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // 认证逻辑
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError(); // 清除之前的错误

    try {
      if (isLogin) {
        await login(formData);
        showNotificationMessage('登录成功！', 'success');
        setShowAuthForm(false);
        setFormData({ username: '', password: '' });
      } else {
        await register(formData);
        showNotificationMessage('注册成功！', 'success');
        setShowAuthForm(false);
        setFormData({ username: '', password: '' });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '认证失败';
      showNotificationMessage(errorMessage, 'error');
      console.error('认证失败:', error);
      // 认证失败时不关闭弹窗，让用户重新尝试
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    logout();
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      setShowUserMenu(!showUserMenu);
    } else {
      setShowAuthForm(true);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(e.target.value);
  };

  const variants = fade();

  return (
    <>
      <div className={`${styles.headerControls} ${className || ''}`}>
        {/* 语言切换器 */}
        <div className={styles.languageSwitcher}>
          <FaGlobe className={styles.icon} />
          <select
            value={currentLang}
            onChange={handleLanguageChange}
            className={styles.select}
            aria-label={t('app.language') || 'Select language'}
          >
            <option value="en">EN</option>
            <option value="zh-CN">中文</option>
          </select>
        </div>

        {/* 主题切换按钮 */}
        <button
          className={styles.controlButton}
          onClick={toggleTheme}
          aria-label={isDarkTheme === true ? 'Switch to light mode' : isDarkTheme === false ? 'Switch to dark mode' : 'Loading theme'}
          disabled={isDarkTheme === null}
        >
          {isDarkTheme !== null && (
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                animate="show"
                aria-hidden="true"
                exit="hidden"
                initial="hidden"
                key={isDarkTheme ? 'moon' : 'sun'}
                variants={variants}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                {isDarkTheme ? <FaMoon /> : <FaSun />}
              </motion.span>
            </AnimatePresence>
          )}
          <span style={{ marginLeft: '8px', fontSize: '14px' }}>
            {isDarkTheme === null ? '...' : (isDarkTheme ? '黑暗' : '明亮')}
          </span>
        </button>

        {/* 登录按钮 */}
        <motion.button
          className={styles.controlButton}
          onClick={handleAuthClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label={isClient ? (isAuthenticated ? `用户: ${user?.username}` : '登录') : '登录'}
        >
          <FaUser />
          {isClient && isAuthenticated && user && (
            <span className={styles.userIndicator}></span>
          )}
          <span style={{
            marginLeft: '8px',
            fontSize: '14px',
            maxWidth: '80px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {isClient ? (isAuthenticated ? (user?.username || '用户') : '登录') : '登录'}
          </span>
        </motion.button>
      </div>

      {/* 认证表单模态框 */}
      {showAuthForm && (
        <div className={styles.authFormOverlay} onClick={() => setShowAuthForm(false)}>
          <div className={styles.authForm} onClick={(e) => e.stopPropagation()}>
            <h3>{isLogin ? '登录' : '注册'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="用户名"
                value={formData.username}
                onChange={handleChange}
                required
                minLength={3}
                className={styles.authInput}
                autoComplete="username"
              />
              <input
                type="password"
                name="password"
                placeholder="密码"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className={styles.authInput}
                autoComplete="current-password"
              />
              <div className={styles.authButtons}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={styles.authSubmitButton}
                >
                  {isLoading ? '处理中...' : (isLogin ? '登录' : '注册')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAuthForm(false)}
                  className={styles.authCancelButton}
                >
                  取消
                </button>
              </div>
              <div className={styles.authToggle}>
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className={styles.authToggleButton}
                >
                  {isLogin ? '没有账号？注册' : '已有账号？登录'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 用户菜单 - 左侧展开菜单 */}
      <AnimatePresence>
        {isAuthenticated && showUserMenu && (
          <motion.div
            className={styles.userMenu}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}>
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <span className={styles.userName}>{user?.username}</span>
            </div>

            <div className={styles.userActions}>
              <button
                className={`${styles.userActionButton}`}
                onClick={() => {
                  // 这里可以添加个人设置功能
                  setShowUserMenu(false);
                  showNotificationMessage('个人设置功能开发中...', 'success');
                }}
              >
                <FaCog className={styles.icon} />
                个人设置
              </button>

              <button
                className={`${styles.userActionButton} ${styles.logoutButton}`}
                onClick={() => {
                  handleLogout();
                  setShowUserMenu(false);
                }}
              >
                <FaSignOutAlt className={styles.icon} />
                退出登录
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 提示通知 */}
      {showNotification && (
        <div className={`${styles.notification} ${styles[notificationType]}`}>
          <div className={styles.notificationContent}>
            <span className={styles.notificationMessage}>
              {notificationMessage}
            </span>
            <button
              className={styles.notificationClose}
              onClick={() => setShowNotification(false)}
              aria-label="关闭通知"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}