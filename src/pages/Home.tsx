import { useState } from "react";
import Header from "../components/Header";
import MapComponent from "../components/MapComponent";
import SideBar from "../components/SideBar";

const Home: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  return (
    <>
      <Header
        onToggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
      />
      <div className="home flex-1 relative w-full">
        <SideBar isVisible={isSidebarVisible} />
        <MapComponent />
      </div>
    </>
  );
};

export default Home;
