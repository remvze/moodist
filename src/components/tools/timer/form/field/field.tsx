import styles from './field.module.css';

interface FieldProps {
  children?: React.ReactNode;
  label: string;
  onChange: (value: string | number) => void;
  optional?: boolean;
  type: 'text' | 'select';
  value: string | number;
}

export function Field({
  children,
  label,
  onChange,
  optional,
  type,
  value,
}: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={label.toLowerCase()}>
        {label}{' '}
        {optional && <span className={styles.optional}>(optional)</span>}
      </label>

      {type === 'text' && (
        <input
          autoComplete="off"
          className={styles.input}
          id={label.toLowerCase()}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}

      {type === 'select' && (
        <select
          autoComplete="off"
          className={styles.input}
          id={label.toLowerCase()}
          value={value}
          onChange={e => onChange(parseInt(e.target.value))}
        >
          {children}
        </select>
      )}
    </div>
  );
}
