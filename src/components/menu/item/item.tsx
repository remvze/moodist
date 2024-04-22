import { Item as DropdownItem } from '@radix-ui/react-dropdown-menu';

import styles from './item.module.css';

interface ItemProps {
  active?: boolean;
  disabled?: boolean;
  href?: string;
  icon: React.ReactElement;
  label: string;
  onClick?: () => void;
}

export function Item({
  active,
  disabled = false,
  href,
  icon,
  label,
  onClick = () => {},
}: ItemProps) {
  const Comp = href ? 'a' : 'button';

  return (
    <DropdownItem asChild onClick={onClick}>
      <Comp
        className={styles.item}
        disabled={disabled}
        {...(href ? { href, target: '_blank' } : {})}
      >
        <span className={styles.icon}>{icon}</span> {label}
        {active && <div className={styles.active} />}
      </Comp>
    </DropdownItem>
  );
}
