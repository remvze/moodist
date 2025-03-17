import * as RadixSlider from '@radix-ui/react-slider';
import styles from './slider.module.css';

type SliderProps = {
  className?: string;
  defaultValue?: number;
  disabled?: boolean;
  max?: number;
  min?: number;
  onChange?: (value: number) => void;
  step?: number;
  value?: number;
};

export function Slider({
  className,
  defaultValue = 50,
  disabled = false,
  max = 100,
  min = 0,
  onChange,
  step = 1,
  value,
}: SliderProps) {
  const handleValueChange = (values: number[]) => {
    if (onChange) onChange(values[0]);
  };

  return (
    <RadixSlider.Root
      className={`${styles.sliderRoot} ${className}`}
      defaultValue={[defaultValue]}
      disabled={disabled}
      max={max}
      min={min}
      step={step}
      tabIndex={0}
      value={value !== undefined ? [value] : undefined}
      onValueChange={handleValueChange}
    >
      <RadixSlider.Track className={styles.sliderTrack}>
        <RadixSlider.Range className={styles.sliderRange} />
      </RadixSlider.Track>
      <RadixSlider.Thumb className={styles.sliderThumb} />
    </RadixSlider.Root>
  );
}
