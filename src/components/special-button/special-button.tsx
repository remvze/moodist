import { cn } from '@/helpers/styles';

import styles from './special-button.module.css';

interface SpecialButtonProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export function SpecialButton({
  children,
  className,
  href,
}: SpecialButtonProps) {
  return (
    <a
      className={cn(styles.button, className)}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
