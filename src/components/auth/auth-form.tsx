import { useState } from 'react';
import { useAuthStore } from '@/stores/auth';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './auth-form.module.css';

export function AuthForm() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { login, register, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      if (isLogin) {
        await login(formData);
        setSuccessMessage('登录成功！');
      } else {
        await register(formData);
        setSuccessMessage('注册成功！');
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      // 错误已经在 store 中处理了
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    clearError();
    setFormData({ username: '', password: '' });
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.title}>
          {isLogin ? '登录' : '注册'}
        </h2>

        {showSuccess && (
          <div className={styles.successMessage}>
            {successMessage}
          </div>
        )}

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              用户名
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={styles.input}
              required
              minLength={3}
              placeholder="请输入用户名（至少3个字符）"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              密码
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              required
              minLength={6}
              placeholder="请输入密码（至少6个字符）"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? '处理中...' : (isLogin ? '登录' : '注册')}
          </button>
        </form>

        <div className={styles.toggleSection}>
          <span className={styles.toggleText}>
            {isLogin ? '还没有账号？' : '已有账号？'}
          </span>
          <button
            type="button"
            onClick={toggleMode}
            className={styles.toggleButton}
          >
            {isLogin ? '立即注册' : '立即登录'}
          </button>
        </div>
      </div>
    </div>
  );
}