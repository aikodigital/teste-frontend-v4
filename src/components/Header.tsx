
import aikoLogo from "../assets/img/aikologo.png";
import gearLogo from "../assets/img/gearlogo.png";
import EquipmentSearch from "./EquipmentSearch";

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={aikoLogo}
            alt="Aiko Logo" 
            className="w-16 h-16 object-contain"
          />
          
          <div className="flex items-end">
            <h1 className="text-4xl font-heading font-bold text-[#0047AB]">
              <span className="ml-2">Gear Tracker</span>
            </h1>
            <img 
              src={gearLogo}
              alt="Gear Logo" 
              className="w-5 h-5 object-contain mb-1.5 ml-1"
              aria-hidden="true"
            />
          </div>
        </div>
        
        <div className="relative w-64">
          <EquipmentSearch />
        </div>
      </div>
    </header>
  );
};

export default Header;
