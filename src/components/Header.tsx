import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/svg/logo.svg";

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  isSidebarVisible,
}) => {
  return (
    <div className="navbar bg-base-100 flex-none">
      <div className="flex-1">
        <img src={Logo} alt="Logo" width="150" />
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={onToggleSidebar}>
          {isSidebarVisible ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Header;
