import { Transition as TransitionHeadless } from '@headlessui/react';
import { Fragment, PropsWithChildren, useEffect, useState } from 'react';

import { APPLICATION_TRANSITIONS } from '@/components/transitions/TraistionConfig';

export type TApplicationTransition = keyof typeof APPLICATION_TRANSITIONS;

export type TTransition = {
   show?: boolean | undefined;
   transition: keyof typeof APPLICATION_TRANSITIONS;
   child?: boolean;
   encapsulate?: boolean;
   delay?: number;
   disableTransition?: boolean;
} & PropsWithChildren;

export interface AditionalProps {
   show?: boolean;
}
export default function AppTransition({
   show,
   children,
   transition,
   child = false,
   encapsulate = true,
   delay = 0,
   disableTransition = false,
}: TTransition) {
   const [showComponent, setShowComponent] = useState(show);

   useEffect(() => {
      if (show !== undefined) {
         setTimeout(() => {
            setShowComponent(show);
         }, delay);
      }
   }, [delay, show, showComponent]);

   const TransationComponent = child
      ? TransitionHeadless.Child
      : TransitionHeadless;

   const Capsule = disableTransition ? Fragment : TransationComponent;

   const additionalProps: any = {};
   if (show !== undefined) {
      additionalProps.show = showComponent;
   }

   return (
      <Capsule
         as={Fragment}
         {...APPLICATION_TRANSITIONS[transition]}
         {...additionalProps}
      >
         {encapsulate ? <div> {children}</div> : children}
      </Capsule>
   );
}
