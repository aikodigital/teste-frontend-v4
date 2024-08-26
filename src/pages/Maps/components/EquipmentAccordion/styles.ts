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
