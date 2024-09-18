import logo from '../assets/aiko.png'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link to='/'>
          <img src={logo} alt="Aiko Logo" className="h-12" />
        </Link>
      </div>
      <div className="flex items-center">
        <Link to="/equipamentos" className="text-lg font-bold">Equipamentos</Link>
      </div>
    </header>
  )
}
