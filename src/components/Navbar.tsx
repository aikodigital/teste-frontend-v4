import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-[#FFFFFF]  w-full py-5 border-b border-[#D6DEEB]">
      <div className="xl:max-w-[1092px] w-full mx-auto h-14">
        <Link href="/">
          <Image
            alt="Aiko Logo"
            src="/images/aiko.png"
            width={97}
            height={48}
          />
        </Link>
      </div>
    </header>
  );
}
