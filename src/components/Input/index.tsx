import { InputProps } from './models';

import { InputContainerStyled, InputStyled, LabelStyled } from './styles';

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <InputContainerStyled>
      {label ? <LabelStyled htmlFor={props.name}>{label}</LabelStyled> : null}

      <InputStyled id={props.name} {...props} />
    </InputContainerStyled>
  );
};
