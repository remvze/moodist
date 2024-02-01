import styles from './item.module.css';

interface ItemProps {
  disabled?: boolean;
  href?: string;
  icon: React.ReactElement;
  label: string;
  onClick?: () => void;
}

export function Item({
  disabled = false,
  href,
  icon,
  label,
  onClick = () => {},
}: ItemProps) {
  const Comp = href ? 'a' : 'button';

  return (
    <Comp
      className={styles.item}
      disabled={disabled}
      onClick={onClick}
      {...(href ? { href, target: '_blank' } : {})}
    >
      <span className={styles.icon}>{icon}</span> {label}
    </Comp>
  );
}
