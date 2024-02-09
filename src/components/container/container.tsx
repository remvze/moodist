import { cn } from '@/helpers/styles';

import styles from './container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  tight?: boolean;
}

export function Container({ children, className, tight }: ContainerProps) {
  return (
    <div className={cn(styles.container, className, tight && styles.tight)}>
      {children}
    </div>
  );
}
