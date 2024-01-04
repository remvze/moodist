import styles from './item.module.css';

interface ItemProps {
  disabled: boolean;
  icon: React.ReactElement;
  label: string;
  onClick: () => void;
}

export function Item({ disabled = false, icon, label, onClick }: ItemProps) {
  return (
    <button className={styles.item} disabled={disabled} onClick={onClick}>
      <span className={styles.icon}>{icon}</span> {label}
    </button>
  );
}
