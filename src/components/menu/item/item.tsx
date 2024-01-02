import styles from './item.module.css';

interface ItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function Item({ children, onClick }: ItemProps) {
  return (
    <button className={styles.item} onClick={onClick}>
      {children}
    </button>
  );
}
