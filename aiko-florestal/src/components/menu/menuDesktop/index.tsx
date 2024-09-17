import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PropsWithChildren } from 'react';

import { menuStyle, TMenuItem } from '@//components/menu';
import { useAppState } from '@/hooks/useAppState';

export type TMenuDesktop = {
   navigation: TMenuItem[];
   secondaryNavigation: TMenuItem[];
};

export default function MenuDesktop({ children }: PropsWithChildren) {
   const { openSidebar, closeSidebar, sidebarState } = useAppState();
   
   return (
      <div className={`${sidebarState ? "lg:w-64" : "w-[58px]"} overflow-x-hidden border-r border-gray-300 lg:fixed lg:inset-y-0 lg:flex lg:flex-col hidden`} data-testid="menu-desktop">
      <div
         className={`${menuStyle.bgColor} ${menuStyle.text} flex grow flex-col pt-5 pb-4 w-full`}
      >
         {children}
         {sidebarState ?
            <button type='button' className="ml-3 mt-8 flex w-full items-center justify-start font-['Inter'] text-lg font-medium text-zinc-700 gap-3 outline-none" onClick={() => !sidebarState ? openSidebar() : closeSidebar()}><ArrowLeft className="h-5 w-5 text-black" /> Esconder Menu</button>
            :
            <button type='button' className='flex w-[58px] items-center justify-center outline-none' onClick={() => !sidebarState ? openSidebar() : closeSidebar()}> <ArrowRight className="h-5 w-5 text-black" /> </button>
         }
      </div>
   </div>
   );
}
