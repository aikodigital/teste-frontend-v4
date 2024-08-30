import Image from "next/image";

export default function Header() {
  return (
    <nav
      className="bg-white shadow text-white p-5 sm:p-2 md:flex md:justify-between 
    md:items-center"
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center">
          <Image
            src="/img/aiko.png"
            alt="Logo"
            width={95}
            height={95}
            priority={true}
          />
        </a>
      </div>
    </nav>
  );
}
