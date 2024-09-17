import { Dialog, Transition } from '@headlessui/react';
import { Fragment, PropsWithChildren } from 'react';

import { menuStyle, TMenuItem } from '@/components/menu';
import CloseButton from '@/components/menu/components/closeButton';
import AppTransition from '@/components/transitions';
import { useAppState } from '@/hooks/useAppState';

export type MenuProps = {
   navigation: TMenuItem[];
   secondaryNavigation: TMenuItem[];
};
export default function MenuMobile({ children }: PropsWithChildren) {
   const { menuState, closeMenu } = useAppState();

   return (
      <Transition.Root show={menuState || false} as={Fragment}>
         <Dialog as="div" className="relative z-40 lg:hidden" onClose={closeMenu}>
            <AppTransition transition="menuDrawerMain" child={true}>
               <div className="fixed inset-0 bg-gray-600 opacity-75" />
            </AppTransition>
            <div className="fixed inset-0 z-40 flex">
               <AppTransition
                  transition="menuDrawer"
                  child={true}
                  encapsulate={false}
               >
                  <Dialog.Panel
                     className={`${menuStyle.bgColor} ${menuStyle.text}   relative flex w-full max-w-xs flex-1 flex-col pt-5 pb-4`}
                  >
                     <AppTransition transition="menuClose" child={true}>
                        <CloseButton onClick={closeMenu} />
                     </AppTransition>
                     {children}
                  </Dialog.Panel>
               </AppTransition>
            </div>
         </Dialog>
      </Transition.Root>
   );
}
