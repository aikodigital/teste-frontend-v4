/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import styles from './Checkbox.module.css';

type CheckboxType = {
  id: string;
  label: string;
  onChecked?: (e: boolean) => void;
  disabled?: boolean;
  checked?: boolean;
  iconSize?: number;
};

const CheckboxComponent = ({
  id,
  label,
  onChecked,
  disabled,
  checked,
  iconSize = 15,
}: CheckboxType) => {
  return (
    <div className={styles.wrapper}>
      <Checkbox.Root
        className={styles.checkboxRoot}
        onCheckedChange={onChecked}
        id={id}
        aria-label={label}
        disabled={disabled}
        checked={checked}
      >
        <Checkbox.Indicator className={styles.checkboxIndicator}>
          <Check size={iconSize} color="#fff" weight="bold" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label
        className={`${styles.label} ${disabled ? styles.labelDisabled : ''}`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxComponent;