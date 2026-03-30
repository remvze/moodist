import { FiExternalLink } from 'react-icons/fi/index';
import { Item as DropdownItem } from '@radix-ui/react-dropdown-menu';

import { isNativePlatform } from '@/lib/platform';

import styles from './item.module.css';

interface ItemProps {
  active?: boolean;
  badge?: string;
  disabled?: boolean;
  href?: string;
  icon: React.ReactElement;
  label: string;
  onClick?: () => void;
  shortcut?: string;
}

export function Item({
  active,
  badge,
  disabled = false,
  href,
  icon,
  label,
  onClick = () => {},
  shortcut,
}: ItemProps) {
  const Comp = href ? 'a' : 'button';
  const isNative = isNativePlatform();

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
          {badge && <span className={styles.badge}>{badge}</span>}
        </span>

        {shortcut && !isNative && (
          <span className={styles.shortcut}>{shortcut}</span>
        )}

        {href && (
          <span className={styles.external}>
            <FiExternalLink />
          </span>
        )}
      </Comp>
    </DropdownItem>
  );
}
