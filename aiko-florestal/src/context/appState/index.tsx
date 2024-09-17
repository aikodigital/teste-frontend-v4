import React, { useState, createContext } from 'react';

interface PropChildrenType {
   children: React.ReactNode;
}

export type AppState = {
   profile?: string;
};

export interface AppStateContextData {
   menuState: boolean;
   setMenuState: React.Dispatch<React.SetStateAction<boolean>>;
   sidebarState: boolean;
   setSidebarState: React.Dispatch<React.SetStateAction<boolean>>;
   breadcrumbParent: string;
   setBreadcrumbParent: React.Dispatch<React.SetStateAction<string>>;
   breadcrumbChild: string;
   setBreadcrumbChild: React.Dispatch<React.SetStateAction<string>>;
}

export const AppStateContext = createContext<AppStateContextData>({} as AppStateContextData);
export const AppStateProvider = ({ children }: PropChildrenType) => {
   const [menuState, setMenuState] = useState<boolean>(false);
   const [sidebarState, setSidebarState] = useState<boolean>(true);

   const [breadcrumbParent, setBreadcrumbParent] = useState<string>('');
   const [breadcrumbChild, setBreadcrumbChild] = useState<string>('');

   return (
      <AppStateContext.Provider
         value={{
            menuState,
            setMenuState,
            sidebarState,
            setSidebarState,
            breadcrumbParent,
            setBreadcrumbParent,
            breadcrumbChild,
            setBreadcrumbChild,
         }}
      >
         {children}
      </AppStateContext.Provider>
   );
};
