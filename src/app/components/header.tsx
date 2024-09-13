import Image from 'next/image';
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
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}