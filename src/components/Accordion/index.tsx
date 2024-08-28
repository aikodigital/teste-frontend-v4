import { forwardRef } from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { FaChevronDown } from 'react-icons/fa';

import {
  AccordionContainerProps,
  AccordionContentProps,
  AccordionItemProps,
  AccordionTriggerProps,
} from './models';

import {
  AccordionContentStyled,
  AccordionContainerStyled,
  AccordionItemStyled,
  AccordionTriggerStyled,
} from './styles';

export const AccordionContainer = forwardRef<
  HTMLDivElement,
  AccordionContainerProps
>(({ children, ...props }, forwardedRef) => (
  <AccordionContainerStyled {...props} ref={forwardedRef}>
    {children}
  </AccordionContainerStyled>
));

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, ...props }, forwardedRef) => (
    <AccordionItemStyled {...props} ref={forwardedRef}>
      {children}
    </AccordionItemStyled>
  )
);

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, ...props }, forwardedRef) => (
  <RadixAccordion.Header>
    <AccordionTriggerStyled {...props} ref={forwardedRef}>
      {children}
      <FaChevronDown className="AccordionChevron" aria-hidden />
    </AccordionTriggerStyled>
  </RadixAccordion.Header>
));

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, ...props }, forwardedRef) => (
  <AccordionContentStyled {...props} ref={forwardedRef}>
    {children}
  </AccordionContentStyled>
));
