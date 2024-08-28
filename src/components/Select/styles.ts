import styled from 'styled-components';
import ReactSelect from 'react-select';

export const SelectContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.25rem;
`;

export const LabelStyled = styled.label`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${(props) => props.theme.text.base};
`;

export const SelectInputStyled = styled(ReactSelect)`
  .react-select__control {
    width: 100%;
    height: 2.5rem;

    border: 1px solid ${(props) => props.theme.neutral.default};
    border-radius: 0.5rem;

    font-size: 1rem;
    color: ${(props) => props.theme.text.base};

    &:focus-within, &:hover {
      border-color: ${(props) => props.theme.primary.default};
      box-shadow: none;
    }
  }

  .react-select__indicator-separator {
    visibility: hidden;
  }

  .react-select__indicator {
    color: ${(props) => props.theme.text.baseLight};
  }

  .react-select__placeholder {
    font-size: 1rem;
    color: ${(props) => props.theme.text.baseLight};
  
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .react-select__menu {
    background-color: ${(props) => props.theme.background};

    border: 1px solid ${(props) => props.theme.neutral.default};
    border-radius: 0.5rem;

    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  }

  .react-select__single-value {
    font-size: 1rem;
    font-weight: 400;
    color: ${(props) => props.theme.text.base};
  }

  .react-select__option {
    font-size: 1rem;
    font-weight: 400;
    color: ${(props) => props.theme.text.base};
    background-color: ${(props) => props.theme.background};

    &--is-focused:not(.react-select__option--is-selected) {
      background-color: ${(props) => props.theme.neutral.default};
    }

    &--is-selected {
      background-color: ${(props) => props.theme.primary.dark};
      color: ${(props) => props.theme.text.white};
    }
  }
`;
