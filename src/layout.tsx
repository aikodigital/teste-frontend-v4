import { ReactNode } from "react";
import { AppSidebarComponent } from "./components/app-sidebar.component";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Input } from "./components/ui/input";

type LayoutProps = {
  children: ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebarComponent />
      <main className="w-screen h-screen overflow-hidden flex flex-col items-start">
        {/* <div className="flex items-center justify-between w-full p-2"> */}
        <div className="z-[999] fixed">
          <SidebarTrigger />
        </div>
        {/* <Input placeholder="Search" className="w-1/3" /> */}
        {/* </div> */}
        {children}
      </main>
    </SidebarProvider>
  );
}
