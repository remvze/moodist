import { FiExternalLink } from 'react-icons/fi/index';
import { Item as DropdownItem } from '@radix-ui/react-dropdown-menu';

import styles from './item.module.css';

interface ItemProps {
  active?: boolean;
  disabled?: boolean;
  href?: string;
  icon: React.ReactElement;
  label: string;
  onClick?: () => void;
  shortcut?: string;
}

export function Item({
  active,
  disabled = false,
  href,
  icon,
  label,
  onClick = () => {},
  shortcut,
}: ItemProps) {
  const Comp = href ? 'a' : 'button';

  return (
    <DropdownItem asChild onClick={onClick}>
      <Comp
        className={styles.item}
        disabled={disabled}
        {...(href ? { href, target: '_blank' } : {})}
        aria-label={label}
      >
        <span className={styles.label}>
          <span className={styles.icon}>{icon}</span> {label}
          {active && <div className={styles.active} />}
        </span>

        {shortcut && <span className={styles.shortcut}>{shortcut}</span>}

        {href && (
          <span className={styles.external}>
            <FiExternalLink />
          </span>
        )}
      </Comp>
    </DropdownItem>
  );
}
