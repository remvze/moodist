import { useState } from 'react';
import { useAuthStore } from '@/stores/auth';
import styles from './user-info.module.css';

export function UserInfo() {
  const { user, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.userContainer}>
      <button
        className={styles.userButton}
        onClick={() => setShowDropdown(!showDropdown)}
        aria-label="用户菜单"
      >
        <div className={styles.userAvatar}>
          {user.username.charAt(0).toUpperCase()}
        </div>
        <span className={styles.userName}>{user.username}</span>
        <span className={styles.dropdownArrow}>▼</span>
      </button>

      {showDropdown && (
        <div className={styles.dropdown}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatarLarge}>
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className={styles.userDetails}>
              <div className={styles.userFullname}>{user.username}</div>
              <div className={styles.userJoined}>
                加入时间: {new Date(user.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className={styles.divider}></div>
          <button
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            退出登录
          </button>
        </div>
      )}

      {showDropdown && (
        <div
          className={styles.backdrop}
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}