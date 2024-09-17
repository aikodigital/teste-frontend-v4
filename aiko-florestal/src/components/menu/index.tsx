/* eslint-disable react-refresh/only-export-components */
import { Axe } from 'lucide-react';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import logoMiniImg from '@/assets/images/aiko.png';
import logoImg from '@/assets/images/logo-big.png';
import MenuItem from '@/components/menu/components/menuItem';
import MenuDesktop from '@/components/menu/menuDesktop';
import MenuMobile from '@/components/menu/menuMobile';
import { ROUTES } from '@/config/routes';
import { useAppState } from '@/hooks/useAppState';

export type DefaultRouteFunction = (a?: any) => void;

export type RoutesNavigator = {
   [str in keyof typeof ROUTES]: DefaultRouteFunction;
};

export type TMenuItem = {
   name: string;
   Icon?: React.ElementType;
   submenu?: Submenu[];
   isMobile?: boolean;
   enabled?: boolean;
   onClick?: (e: any) => void;
   current: boolean;
}

export type Submenu = Omit<TMenuItem, 'submenu'>;

export const menuStyle = {
   bgColor: 'bg-white',
   text: "text-zinc-700 font-medium text-lg font-['Inter']",
   menu: {
      active: 'bg-gray-100 text-zinc-700',
      hover: 'hover:bg-gray-100',
      common: '',
   },
   submenu: {
      active: 'bg-gray-100 text-zinc-700',
      hover: 'hover:bg-gray-100',
      common: '',
   },
};

export default function AppMenu() {
   const { sidebarState } = useAppState();
   const navigate = useNavigate();

   const checkIsRouteActive = useCallback((route: string) => {
      const actualRoute = window.location.pathname.replace('/', '');
      return route === actualRoute;
   }, []);

   const routes = useMemo(() => {
      const automaticRoutes: RoutesNavigator = {} as any;
      Object.keys(ROUTES).forEach((key: string) => {
         automaticRoutes[key as keyof typeof ROUTES] = () => {
            navigate(ROUTES[key as keyof typeof ROUTES].use);
         };
      });
      return {
         ...automaticRoutes,
         goBack: (route: string, content = {}) => {
            navigate(route, {
               state: { ...content, goingBack: true },
            });
         },
         clear: () => {
            navigate({}, { state: null });
         },
      };
   }, [navigate]);

   const { navigation } = useMemo(() => {
      const equipmentsMenuItem = {
         name: "Equipamentos",
         Icon: Axe,
         current: false,
         submenu: [
            {
               name: 'Mapa geral',
               onClick: () => navigate('/'),
               current: checkIsRouteActive(''),
            },
            {
               name: 'Lista de equipamentos',
               onClick: () => navigate('/equipments/list'),
               current: checkIsRouteActive('equipments/list'),
            },
         ],
      };

      const navigation: TMenuItem[] = [
         ...(equipmentsMenuItem ? [equipmentsMenuItem] : []),
      ];

      return { navigation };
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [ checkIsRouteActive, routes ]);

   const renderNavigation = useMemo(() => {
      return (
         <>
            {sidebarState ?
               <div className="px-4">
                  <img src={logoImg} />
               </div>
               :
               <div className="pl-2.5">
                  <img src={logoMiniImg} className='w-10 h-7' />
               </div>
            }
            <nav
               className="mt-2 flex flex-1 flex-col overflow-y-auto px-2 outline-none"
               aria-label="Sidebar"
            >
               <div className="space-y-1 ">
                  {navigation.map((i) => (
                     <MenuItem key={i.name} {...i} />
                  ))}
               </div>
            </nav>
         </>
      );
   }, [navigation, sidebarState]);

   return (
      <div className="text-sm">
         <MenuDesktop>{renderNavigation}</MenuDesktop>
         <MenuMobile>{renderNavigation}</MenuMobile>
      </div>
   );
}
