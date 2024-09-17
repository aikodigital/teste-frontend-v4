import { useCallback, useContext } from 'react';

import { AppStateContext, AppStateContextData } from '@/context/appState';

export function useAppState() {
   const { setMenuState, setSidebarState, ...rest } =
      useContext<AppStateContextData>(AppStateContext);

   const openMenu = useCallback(() => {
      setMenuState(true);
   }, [setMenuState]);

   const closeMenu = useCallback(() => {
      setMenuState(false);
   }, [setMenuState]);

   const openSidebar = useCallback(() => {
      setSidebarState(true);
   }, [setSidebarState]);

   const closeSidebar = useCallback(() => {
      setSidebarState(false);
   }, [setSidebarState]);

   return {
      openMenu,
      closeMenu,
      openSidebar,
      closeSidebar,
      ...rest,
   };
}
