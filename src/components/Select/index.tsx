import { SelectProps } from './models';

import {
  LabelStyled,
  SelectContainerStyled,
  SelectInputStyled,
} from './styles';

export const Select = ({ testId, label, ...props }: SelectProps) => {
  return (
    <SelectContainerStyled>
      {label ? <LabelStyled htmlFor={props.name}>{label}</LabelStyled> : null}

      <div data-testid={testId}>
        <SelectInputStyled
          id={props.name}
          classNamePrefix={'react-select'}
          {...props}
        />
      </div>
    </SelectContainerStyled>
  );
};
