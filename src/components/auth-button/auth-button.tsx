import { useState } from 'react';
import { FaUser } from 'react-icons/fa/index';
import { motion } from 'motion/react';
import { useAuthStore } from '@/stores/auth';
import styles from './auth-button.module.css';

export function AuthButton() {
  const { isAuthenticated, user, login, logout, isLoading } = useAuthStore();
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(formData);
      } else {
        // 注册功能先用登录代替
        await login(formData);
      }
      setShowAuthForm(false);
      setFormData({ username: '', password: '' });
    } catch (error) {
      console.error('认证失败:', error);
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

  const handleClick = () => {
    if (isAuthenticated) {
      // 如果已登录，显示用户菜单
      return;
    } else {
      // 如果未登录，显示登录表单
      setShowAuthForm(true);
    }
  };

  return (
    <>
      <motion.button
        className={styles.authButton}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isAuthenticated ? `用户: ${user?.username}` : '登录'}
      >
        <FaUser />
        {isAuthenticated && user && (
          <span className={styles.userIndicator}></span>
        )}
      </motion.button>

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

      {isAuthenticated && (
        <div className={styles.userMenu}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <span className={styles.userName}>{user?.username}</span>
            <button
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              退出登录
            </button>
          </div>
        </div>
      )}
    </>
  );
}