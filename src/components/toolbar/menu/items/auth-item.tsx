import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from 'motion/react';
import { useTranslation } from '@/hooks/useTranslation';
import { useState } from 'react';
import { useAuthStore } from '@/stores/auth';
import styles from './item.module.css';

interface AuthItemProps {
  open: () => void;
}

export function AuthItem({ open }: AuthItemProps) {
  const { t } = useTranslation();
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
        // 这里需要调用注册API
        // 为了简单起见，我们先用登录代替注册
        await login(formData);
      }
      setShowAuthForm(false);
      setFormData({ username: '', password: '' });
    } catch (error) {
      // 错误处理
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

  if (isAuthenticated && user) {
    return (
      <div className={styles.userInfo}>
        <span className={styles.userAvatar}>
          {user.username.charAt(0).toUpperCase()}
        </span>
        <span className={styles.userName}>{user.username}</span>
        <DropdownMenu.Item asChild>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            退出登录
          </motion.button>
        </DropdownMenu.Item>
      </div>
    );
  }

  return (
    <>
      {/* 隐藏的触发器按钮 */}
      <button
        id="auth-trigger"
        onClick={() => setShowAuthForm(true)}
        style={{ display: 'none' }}
      />

      {showAuthForm && (
        <div className={styles.authFormOverlay}>
          <div className={styles.authForm}>
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
    </>
  );
}