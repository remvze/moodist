import { useState } from 'react';
import { AuthForm } from './auth-form';
import styles from './login-trigger.module.css';

export function LoginTrigger() {
  const [showAuth, setShowAuth] = useState(false);

  const openAuth = () => {
    setShowAuth(true);
  };

  const closeAuth = () => {
    setShowAuth(false);
  };

  return (
    <>
      <button className={styles.loginButton} onClick={openAuth}>
        登录
      </button>

      {showAuth && <AuthForm />}
      {showAuth && <div className={styles.backdrop} onClick={closeAuth} />}
    </>
  );
}