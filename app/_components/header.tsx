import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return ( 
        <header className="w-full flex items-center gap-2 py-6 px-5 border-b">
            <Link href={"/"}>
                <Image src="/aiko.png" alt="Logo" width={50} height={50} />
            </Link>
        </header>
     );
}
 
export default Header;