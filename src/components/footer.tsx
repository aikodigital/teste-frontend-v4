import Socials from './socials'
import Logo from './logo'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center w-full">
      <div className="shadow-shadowlight dark:shadow-none  py-2 min-h-24 w-full flex flex-col justify-around items-center dark:border-t-[1px] dark:border-zinc-800 gap-3">
        <div className="flex items-center gap-3">
          <Logo />{' '}
          <div className="text-xl flex flex-col gap-2 font-bold">
            <h1>Desafio Frontend</h1> <Socials />
          </div>
        </div>
        <p className="text-sm">
          Desenvolvido por:{' '}
          <Link
            href={'https://sandrofernandesdev.vercel.app/'}
            target="blank"
            className="dark:text-green-600 font-bold"
          >
            Sandro Fernandes
          </Link>
        </p>
      </div>
    </footer>
  )
}
