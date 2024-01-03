import styles from './item.module.css';

interface ItemProps {
  icon: React.ReactElement;
  label: string;
  onClick: () => void;
}

export function Item({ icon, label, onClick }: ItemProps) {
  return (
    <button className={styles.item} onClick={onClick}>
      <span className={styles.icon}>{icon}</span> {label}
    </button>
  );
}
