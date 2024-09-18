import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import Button from "./Button";
import { useState } from "react";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`${styles.sidebar} ${
        isSidebarOpen ? styles.open : styles.closed
      }`}
    >
      <Logo />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Kevin Lami Inc.
        </p>
      </footer>
      <Button onClick={toggleSidebar} type={"toggleSidebar"}>
        <i className={`arrow ${isSidebarOpen ? "left" : "right"}`}></i>
      </Button>
    </div>
  );
}

export default Sidebar;
