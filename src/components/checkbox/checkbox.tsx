import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { FaCheck } from 'react-icons/fa6/index';

import styles from './checkbox.module.css';

type CheckboxInputProps = {
  checked?: boolean;
  className?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

export function Checkbox({
  checked,
  className,
  defaultChecked = false,
  disabled = false,
  onChange,
}: CheckboxInputProps) {
  const handleCheckedChange = (checked: boolean) => {
    if (onChange) onChange(checked);
  };

  return (
    <RadixCheckbox.Root
      checked={checked}
      className={`${styles.checkboxRoot} ${className}`}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={handleCheckedChange}
    >
      <RadixCheckbox.Indicator className={styles.checkboxIndicator}>
        <FaCheck />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}
