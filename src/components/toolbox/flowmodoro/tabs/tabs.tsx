import { cn } from '@/helpers/styles';

import styles from './tabs.module.css';

interface TabsProps {
  onSelect: (id: string) => void;
  selectedTab: string;
  tabs: Array<{ id: string; label: string }>;
}

export function Tabs({ onSelect, selectedTab, tabs }: TabsProps) {
  return (
    <div className={styles.tabs}>
      {tabs.map(tab => (
        <button
          className={cn(styles.tab, selectedTab === tab.id && styles.selected)}
          key={tab.id}
          onClick={() => onSelect(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
