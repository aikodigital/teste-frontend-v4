import Link from 'next/link'

export interface MenuProps {
  menu: boolean
  handleMenu?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function ItensMenu({ menu, handleMenu }: MenuProps) {
  return (
    <ul
      className={`w-full md:w-auto text-2xl md:text-xl md:text-md ${!menu ? 'hidden' : 'flex flex-col'} md:flex md:items-center`}
    >
      <li className="hover:bg-bglight dark:hover:bg-bgdark pl-2 md:pl-0 cursor-pointer  pr-2 md:hover:bg-transparent ">
        <Link
          onClick={handleMenu}
          href={'/equipments'}
          className="border-l-8 md:border-none md:pl-0 md:my-0 border-primary pl-2 rounded-md my-2"
        >
          Equipamentos
        </Link>
      </li>
    </ul>
  )
}
