import { InputProps } from './models';

import { InputContainerStyled, InputStyled, LabelStyled } from './styles';

export const Input = ({ testId, label, ...props }: InputProps) => {
  return (
    <InputContainerStyled>
      {label ? <LabelStyled htmlFor={props.name}>{label}</LabelStyled> : null}

      <InputStyled data-testid={testId} id={props.name} {...props} />
    </InputContainerStyled>
  );
};
