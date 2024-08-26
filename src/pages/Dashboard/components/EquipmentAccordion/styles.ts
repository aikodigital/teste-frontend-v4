import styled from 'styled-components';

export const EquipmentAccordionTriggerContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-right: 0.5rem;
  }
`;

export const EquipmentAccordionTextsStyled = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-start;

  gap: 0.25rem;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: ${(props) => props.theme.text.base};
  }

  span {
    font-size: 0.875rem;
    color: ${(props) => props.theme.text.baseLight};
  }
`;

export const EquipmentAccordionIconStyled = styled.img`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const EquipmentAccordionContentStyled = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;
  padding: 1rem;

  border-top: 1px solid ${(props) => props.theme.neutral.default};
`;

export const EquipmentAccordionContentListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  list-style: none;
  margin: 0;
  padding-inline-start: 2rem;
`;

export const EquipmentAccordionContentListItemStyled = styled.li`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 0.25rem;

  .row {
    display: flex;
    align-items: flex-start;
    width: 100%;
    gap: 0.25rem;

    strong {
      font-size: 0.875rem;
      color: ${(props) => props.theme.text.base};
    }

    span {
      font-size: 0.875rem;
      color: ${(props) => props.theme.text.baseLight};
    }

    &.header {
      margin-bottom: 0.125rem;

     strong, span {
        font-size: 1rem;
        color: ${(props) => props.theme.text.base};
      }
    }

    &:last-child {
      margin-bottom: 0.75rem;
    }
  }



  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 1rem;
    height: 1rem;
    top: 0;
    left: -2rem;

    border-radius: 50%;

    background-color: ${(props) => props.theme.neutral.default};
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 2px;
    height: calc(100% - 1.25rem);

    left: -1.55rem;
    bottom: 0;

    background-color: ${(props) => props.theme.neutral.default};
  }

  &:last-child {
    &::before {
      background-color: ${(props) => props.theme.primary.default};
    }

    &::after {
      display: none;
    }
  }

`;

export const EquipmentAccordionFooterStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 1rem;
  padding: 1rem;

  border-top: 1px solid ${(props) => props.theme.neutral.default};
`;

export const EquipmentAccordionFooterItemStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  strong {
    font-size: 0.875rem;
    color: ${(props) => props.theme.text.base};
  }

  span {
    font-size: 0.875rem;
    color: ${(props) => props.theme.text.baseLight};
  }
`;
