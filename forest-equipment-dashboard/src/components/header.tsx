import LogoAiko from '@/assets/img/aiko.png';
import Image from 'next/image';
import { ModeToggle } from './mode-toggle';

function Header() {
  return (
    <header>
      <nav className="flex items-center justify-between border-b px-4 py-2 shadow">
        <Image src={LogoAiko} alt="Logo Aiko" className="max-w-32" />
        <ModeToggle />
      </nav>
    </header>
  );
}

export { Header };
