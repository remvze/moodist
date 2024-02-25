import { Tooltip } from '@/components/tooltip';

import styles from './button.module.css';

interface ButtonProps {
  icon: React.ReactElement;
  onClick: () => void;
  tooltip: string;
}

export function Button({ icon, onClick, tooltip }: ButtonProps) {
  return (
    <Tooltip content={tooltip} hideDelay={0} placement="bottom" showDelay={0}>
      <button className={styles.button} onClick={onClick}>
        {icon}
      </button>
    </Tooltip>
  );
}
