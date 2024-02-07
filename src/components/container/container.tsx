import { cn } from '@/helpers/styles';

import styles from './container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cn(styles.container, className)}>{children}</div>;
}
