import React from 'react';
import Radio from '@mui/material/Radio';
import styles from './RadioGroup.module.css';

interface RadioGroupProps {
  selectedValue: string | number;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  values: Array<{
    label: string;
    value: string | number;
  }>;
  direction?: 'row' | 'column';
  sizeRadio?: number;
}

const RadioGroup = ({
  values,
  selectedValue,
  onChange,
  direction = 'row',
  sizeRadio = 25,
}: RadioGroupProps) => {
  return (
    <div className={`${styles.wrapper} ${direction === 'row' ? styles.wrapperRow : styles.wrapperColumn}`}>
      {values?.map((item, index) => (
        <div className={styles.wrapperRadio} key={index}>
          <Radio
            aria-label={item.label}
            checked={selectedValue === item?.value}
            onChange={onChange}
            value={item?.value}
            name="radio-buttons"
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: sizeRadio,
              },
            }}
          />
          <label className={styles.label}>{item?.label}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;