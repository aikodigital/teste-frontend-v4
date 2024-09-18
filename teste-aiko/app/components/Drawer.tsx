import { ArrowRightFromLine } from 'lucide-react';
import { ArrowLeftFromLine } from 'lucide-react';

import { drawerStore } from '../../store/drawerStore';

export const Drawer = () => {
  const drawerStatus = drawerStore((state) => state.drawerStatus);
  const drawerToggle = drawerStore((state) => state.toggleDrawerStatus);

  return (
    <div className="flex items-center bg-transparent cursor-pointer" onClick={drawerToggle}>
      {drawerStatus ? <ArrowLeftFromLine /> : <ArrowRightFromLine />}
    </div>
  );
};
