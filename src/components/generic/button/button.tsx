import { Tooltip } from '@/components/tooltip';

import { cn } from '@/helpers/styles';

import styles from './button.module.css';

interface ButtonProps {
  disabled?: boolean;
  icon: React.ReactElement;
  onClick: () => void;
  smallIcon?: boolean;
  tooltip: string;
}

export function Button({
  disabled = false,
  icon,
  onClick,
  smallIcon,
  tooltip,
}: ButtonProps) {
  return (
    <Tooltip content={tooltip} placement="bottom" showDelay={0}>
      <button
        className={cn(styles.button, smallIcon && styles.smallIcon)}
        disabled={disabled}
        onClick={onClick}
      >
        {icon}
      </button>
    </Tooltip>
  );
}
