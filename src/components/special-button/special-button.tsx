import { cn } from '@/helpers/styles';

import styles from './special-button.module.css';

interface SpecialButtonProps {
  children: React.ReactNode;
  className?: string;
  href: string;
  internal?: boolean;
}

export function SpecialButton({
  children,
  className,
  href,
  internal,
}: SpecialButtonProps) {
  return (
    <a
      className={cn(styles.button, className)}
      href={href}
      {...(!internal ? { rel: 'noreferrer', target: '_blank' } : {})}
    >
      {children}
    </a>
  );
}
