import './navbar.css'
import AikoLogo from '../../assets/img/aiko.png'
import { Filter } from 'lucide-react';

const NavBar = () => {


  return (
    <div id="nav-bar">
      <img 
        src={AikoLogo} 
        alt='aiko-logo'
      />    
    </div>
  )
}

export default NavBar