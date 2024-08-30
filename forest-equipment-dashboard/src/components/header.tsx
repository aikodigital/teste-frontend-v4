import LogoAiko from '@/assets/img/aiko.png';
import Image from 'next/image';
import { ModeToggle } from './mode-toggle';
import Link from 'next/link';

function Header() {
  return (
    <header className="bg-white-700 border-b px-4 py-2 shadow">
      <nav className="mx-auto flex w-10/12 max-w-screen-2xl items-center justify-between">
        <Link href="/">
          <Image src={LogoAiko} alt="Logo Aiko" className="max-w-32" />
        </Link>
        <ModeToggle />
      </nav>
    </header>
  );
}

export { Header };
