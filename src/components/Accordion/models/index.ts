import { ComponentProps } from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';

export type AccordionContainerProps = ComponentProps<
  typeof RadixAccordion.Root
>;

export type AccordionItemProps = ComponentProps<typeof RadixAccordion.Item>;

export type AccordionTriggerProps = ComponentProps<
  typeof RadixAccordion.Trigger
>;

export type AccordionContentProps = ComponentProps<
  typeof RadixAccordion.Content
>;
