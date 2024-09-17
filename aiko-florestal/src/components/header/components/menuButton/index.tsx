
import { Menu } from 'lucide-react';

import { useAppState } from '@/hooks/useAppState';

export default function HeaderMenuButton() {
  const { openMenu } = useAppState();
  
  return (
    <button
      type="button"
      className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-300 lg:hidden"
      onClick={openMenu}
    >
      <span className="sr-only">Open sidebar</span>
      <Menu className="h-6 w-6 text-zinc-800" aria-hidden="true" />
    </button>
  );
}
