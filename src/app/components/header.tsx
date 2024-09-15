import Image from 'next/image';
import Link
 from 'next/link';
export default function Header() {
  return (
    <header>
      <div className='logo'>
        <Image
          src="/img/aiko.png" 
          alt="Logotipo-Aiko"
          width={150} 
          height={70} 
        />
        <Image
          src="/img/tracker_logo_transparent.png" 
          alt="Logotipo-Tracker"
          width={100}
          height={80} 
        />
      </div>
      <nav>
        <ul>
          <li><Link href="/">Home </Link></li>
          <li><Link href="/sobre">Sobre </Link></li>
          <li><Link href="/contato">Contato </Link></li>
        </ul>
      </nav>
    </header>
  );
}