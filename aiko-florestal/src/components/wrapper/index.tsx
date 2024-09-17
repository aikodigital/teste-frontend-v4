import { Params, useParams } from "react-router-dom";

import Header from "@/components/header";
import AppMenu from "@/components/menu";
import { useAppState } from "@/hooks/useAppState";

interface PageWrapperProps {
   children: React.ReactNode;
   render?: (params: Readonly<Params<string>>) => React.ReactNode;
}

export default function PageWrapper({ children, render }: PageWrapperProps) {
   const param = useParams();
   const { sidebarState } = useAppState();

   return (
      <div className="min-h-full">
         <Header />
         <AppMenu />
         <div className={`flex flex-col ${sidebarState ? "lg:pl-64" : "lg:pl-14"} `}>
            <div style={{ margin: 16, paddingBottom: 28 }}>
               {children}
               {render && render(param)}
            </div>
         </div>
      </div>
   );
}
