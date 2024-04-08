import { cn } from '@/helpers/styles';

import styles from './container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  tight?: boolean;
  wide?: boolean;
}

export function Container({
  children,
  className,
  tight,
  wide,
}: ContainerProps) {
  return (
    <div
      className={cn(
        styles.container,
        className,
        tight && styles.tight,
        wide && styles.wide,
      )}
    >
      {children}
    </div>
  );
}
