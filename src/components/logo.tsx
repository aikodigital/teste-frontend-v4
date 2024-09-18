import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/aiko.png'

export default function Logo() {
  return (
    <Link href={'/'}>
      <Image src={logo} alt="logo" height={180} width={80} />
    </Link>
  )
}
