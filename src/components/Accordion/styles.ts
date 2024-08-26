import styled, { keyframes } from 'styled-components';
import * as RadixAccordion from '@radix-ui/react-accordion';

const slideDown = keyframes`
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
`;

const slideUp = keyframes`
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
`;

export const AccordionContainerStyled = styled(RadixAccordion.Root)`
  display: flex;
  flex-direction: column;
  width: 100%;

  border: 1px solid ${(props) => props.theme.neutral.default};
  border-radius: 0.5rem;
  
  background-color: ${(props) => props.theme.background.light};

  &:focus-within, &:hover {
    border-color: ${(props) => props.theme.primary.default};
  }
`;

export const AccordionItemStyled = styled(RadixAccordion.Item)`
  display: flex;
  flex-direction: column;
  width: 100%;

  overflow: hidden;
`;

export const AccordionTriggerStyled = styled(RadixAccordion.Trigger)`
  display: flex;
  align-items: center;
  width: 100%;

  padding: 1rem;

  .AccordionChevron {
    color: ${(props) => props.theme.text.base};
    transition: transform 0.3s cubic-bezier(0.87, 0, 0.13, 1);
  }

  &[data-state='open'] {
    > .AccordionChevron
    {
      transform: rotate(180deg);
    }
  }
`;

export const AccordionContentStyled = styled(RadixAccordion.Content)`
  display: flex;
  flex-direction: column;

  &[data-state='open'] {
    animation: ${slideDown} 0.3s cubic-bezier(0.87, 0, 0.13, 1);
  }

  &[data-state='closed'] {
    animation: ${slideUp} 0.3s cubic-bezier(0.87, 0, 0.13, 1);
  }

  &[hidden] {
    animation: ${slideUp} 0s cubic-bezier(0.87, 0, 0.13, 1);
  }
`;
