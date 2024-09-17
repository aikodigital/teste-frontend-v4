import React, { useState } from 'react';
import SelectLib, { Props as SelectProps } from 'react-select';
import { Control, Controller } from 'react-hook-form';
import styles from './Select.module.css';

interface Props extends Omit<SelectProps, 'placeholder'> {
  id: string;
  label: string;
  placeholder: string;
  options: { label: string; value: string | number }[];
  control: Control<any>;
  width?: string | number;
  height?: string | number;
  errorMessage?: string;
}

const Select: React.FC<Props> = ({
  id,
  label,
  options,
  control,
  width,
  height,
  placeholder,
  ...rest
}) => {
  const [onFocus, setOnFocus] = useState(false);

  return (
    <Controller
      control={control}
      defaultValue={rest.isMulti ? [] : rest.defaultValue ?? ''}
      name={id}
      render={({ field: { onChange, value, ref } }) => {
        const wrapperStyle = {
          width: width ? `${width}px` : '100%',
        };
        const labelStyle = {
          color: rest.errorMessage
            ? '#ff4d4f'
            : (rest.isMulti ? !!value.length : !!value || onFocus)
            ? '#002868'
            : '#bfbfbf',
          cursor: rest.isDisabled ? 'not-allowed' : 'pointer',
        };

        return (
          <div className={styles.wrapper} style={wrapperStyle}>
            <SelectLib
              aria-label={label}
              menuPortalTarget={document.body}
              ref={ref}
              classNamePrefix="react-select"
              value={
                rest.isMulti
                  ? options.filter((c) => value.includes(c.value))
                  : options.find((c) => c.value === value) ?? null
              }
              onChange={(val: any) =>
                rest.isMulti
                  ? onChange(val.map((c: any) => c.value))
                  : onChange(val?.value)
              }
              onFocus={() => setOnFocus(true)}
              onBlur={() => setOnFocus(false)}
              placeholder={placeholder}
              options={options}
              styles={{
                container: (baseStyles) => ({
                  ...baseStyles,
                  cursor: rest?.isDisabled ? 'not-allowed' : 'pointer',
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  color: '#bfbfbf',
                }),
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: rest?.errorMessage
                    ? '#ff4d4f'
                    : state.isDisabled
                    ? '#bfbfbf'
                    : state.hasValue
                    ? '#002868'
                    : '#bfbfbf',
                  boxShadow: 'none',
                  width: width ?? '100%',
                  borderRadius: '8px',
                  background: rest.isDisabled ? '#f0f0f0' : 'transparent',
                  '&:hover': {
                    borderColor: rest?.errorMessage
                      ? '#ff4d4f'
                      : '#002868',
                    cursor: rest.isDisabled ? 'not-allowed' : 'pointer',
                  },
                  outline: rest?.errorMessage
                    ? `1px solid #ff4d4f`
                    : state.isDisabled
                    ? `1px solid #bfbfbf`
                    : state.hasValue || state.isFocused
                    ? `1px solid #002868`
                    : 'none',
                }),
                option: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: '#f9f9f9',
                  color: '#000000',
                }),
                valueContainer: (provided) => ({
                  ...provided,
                  overflow: 'visible',
                  minHeight: height ?? 45,
                  width: width ?? 250,
                  fontSize: 16,
                  padding: '1rem',
                }),
                placeholder: (provided, state) => ({
                  ...provided,
                  fontFamily: 'Arial, sans-serif',
                  fontSize: (state.hasValue || state.selectProps.inputValue) && 14,
                  color: state.isDisabled
                    ? '#bfbfbf'
                    : state.hasValue || state.selectProps.inputValue
                    ? '#002868'
                    : '#d9d9d9',
                }),
                menuList: (provided) => ({
                  ...provided,
                  fontSize: 16,
                  maxHeight: '180px',
                }),
                multiValueLabel: (provided) => ({
                  ...provided,
                  maxWidth: '130px',
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  zIndex: 99999,
                }),
              }}
              {...rest}
            />
            <label htmlFor={id} style={labelStyle}>{label}</label>
          </div>
        );
      }}
    />
  );
};

export default Select;