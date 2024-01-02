import styles from '../menu.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button className={styles.menuItem} onClick={onClick}>
      {children}
    </button>
  );
}
