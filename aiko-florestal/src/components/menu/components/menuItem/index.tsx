import clsx from 'clsx';
import { ChevronDownIcon } from 'lucide-react';
import { useCallback, useState } from 'react';

import { menuStyle, Submenu, TMenuItem } from '@/components/menu';
import MenuIcon from '@/components/menu/components/menuIcon';
import AppTransition from '@/components/transitions';
import { useAppState } from '@/hooks/useAppState';

export default function MenuItem(item: TMenuItem) {
   const [showSubmenu, setShowSubmenu] = useState(false);
   const { sidebarState } = useAppState();

   const onClickInMenu = () => {
      if (item.submenu?.length) {
         setShowSubmenu((open) => !open);
      }
      if (item.onClick) {
         item.onClick({} as any);
      }
   };

   const renderSubItems = useCallback((item: Submenu) => {

      return (
         <div className="flex w-full items-center pl-2" key={item.name}>
            {item.current && (
               <div className="w-[2px] h-9 bg-green-200 ml-2 rounded-lg mt-[-4px] mr-1" />
            )}
            <button
               type='button'
               role="menuitem"
               onClick={item.onClick}
               className={clsx(
                  item.current
                     ? `${menuStyle.submenu.active} ${menuStyle.submenu.active}`
                     : '',
                  ` ${menuStyle.submenu.hover} ${menuStyle.text} dark:hover:text-light flex w-full items-center rounded-md p-2 text-lg transition-colors duration-200 mb-1 text-start outline-none`,
               )}
            >
               <MenuIcon Icon={item.Icon} />
               {item.name}
            </button>
         </div>
      );
   }, []);

   return (
      <>
         <button
            type='button'
            key={item.name}
            onClick={onClickInMenu}
            className={clsx(
               item.current
                  ? `${menuStyle.menu.active} ${menuStyle.menu.active}`
                  : menuStyle.text,
               `${menuStyle.menu.hover} group flex w-full items-center rounded-md p-2 outline-none`,
            )}
            aria-current={item.current ? 'page' : undefined}
         >
            <div className="flex w-full justify-between">
               <div className="flex">
                  <MenuIcon Icon={item.Icon} />
                  {sidebarState && item.name}
               </div>
               <div className='flex items-center pr-1'>
                  {sidebarState && item.submenu?.length && (
                     <ChevronDownIcon color='#000000' strokeWidth="4"
                        className={clsx(
                           !showSubmenu || 'rotate-180',
                           'h-3 w-3 transition-all ',
                        )}
                        aria-hidden="true"
                     />
                  )}
               </div>
            </div>
         </button>
         <AppTransition show={showSubmenu} transition="fromTop">
            <div className="flex w-full flex-col pl-7">
               {sidebarState && item.submenu?.map((i) => renderSubItems(i))}
            </div>
         </AppTransition>
      </>
   );
}
