import { SelectProps } from './models';

import {
  LabelStyled,
  SelectContainerStyled,
  SelectInputStyled,
} from './styles';

export const Select = ({ label, ...props }: SelectProps) => {
  return (
    <SelectContainerStyled>
      {label ? <LabelStyled htmlFor={props.name}>{label}</LabelStyled> : null}

      <SelectInputStyled
        id={props.name}
        classNamePrefix={'react-select'}
        {...props}
      />
    </SelectContainerStyled>
  );
};
