import { Link } from 'react-router-dom';
import AikoLogo from '../assets/img/aiko.png';

function Header() {
  return (
    <div className="flex items-center justify-between px-9 py-5 bg-tertiary border-b-[1px] border-secondary">
      <div>
        <Link to="/">
          <img src={AikoLogo} alt="Aiko Logo" className="h-12" style={{ minWidth: '97px' }} />
        </Link>
      </div>
      <div className="flex gap-5">
        <Link
          to="/"
          className="relative text-2xl inline-flex justify-start items-center gap-2 text-left w-fit pb-1 box-border border-b-2 border-transparent after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default Header;
