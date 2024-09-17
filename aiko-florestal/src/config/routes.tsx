/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { EquipmentsRoutes } from "@/modules/equipments/routes";

export type ProjectRoute = {
   path: string;
   use: string;
   element: JSX.Element;
};

export type ProjectRoutes = {
   [x: string]: ProjectRoute;
};

export const ROUTES = {
   ...EquipmentsRoutes,
};

export default function ApplicationRoutes() {
   useEffect(() => {
      setTimeout(() => {
      }, 1000);
   }, []);

   function getRoutes() {
      return Object.keys(ROUTES).map((k) => {
         const rt = ROUTES[k as keyof typeof ROUTES];
         return <Route key={k} {...rt} />;
      });
   }

   return (
      <BrowserRouter>
         <Routes>
            {getRoutes()}
         </Routes>
      </BrowserRouter>
   );
}
