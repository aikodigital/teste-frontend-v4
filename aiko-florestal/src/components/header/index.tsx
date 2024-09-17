import HeaderMenuButton from '@/components/header/components/menuButton';
import { useAppState } from '@/hooks/useAppState';

export default function Header() {
   const { sidebarState } = useAppState();

   return (
      <header className={`flex mt-[-4px] flex-1 flex-col fixed w-full z-10 ${sidebarState ? "lg:pl-64" : "lg:pl-14"}`} data-testid="header-container">
         <div className="flex h-16 w-full shrink-0 content-center items-center justify-between">
            <HeaderMenuButton />
         </div>
      </header>
   );
}
