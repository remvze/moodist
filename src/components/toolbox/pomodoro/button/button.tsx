import { Tooltip } from '@/components/tooltip';

import { cn } from '@/helpers/styles';

import styles from './button.module.css';

interface ButtonProps {
  icon: React.ReactElement;
  onClick: () => void;
  smallIcon?: boolean;
  tooltip: string;
}

export function Button({ icon, onClick, smallIcon, tooltip }: ButtonProps) {
  return (
    <Tooltip content={tooltip} hideDelay={0} placement="bottom" showDelay={0}>
      <button
        className={cn(styles.button, smallIcon && styles.smallIcon)}
        onClick={onClick}
      >
        {icon}
      </button>
    </Tooltip>
  );
}
