import { Tooltip } from '@/components/tooltip';

import { cn } from '@/helpers/styles';

import styles from './button.module.css';

interface ButtonProps {
  critical?: boolean;
  icon: React.ReactElement;
  onClick: () => void;
  recommended?: boolean;
  tooltip: string;
}

export function Button({
  critical,
  icon,
  onClick,
  recommended,
  tooltip,
}: ButtonProps) {
  return (
    <Tooltip content={tooltip} placement="bottom" showDelay={0}>
      <button
        className={cn(
          styles.button,
          critical && styles.critical,
          recommended && styles.recommended,
        )}
        onClick={onClick}
      >
        {icon}
      </button>
    </Tooltip>
  );
}
