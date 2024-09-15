import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <footer className="justify-self-end">teste / Pedro Fernandes</footer>
    </>
  );
};

export default MainLayout;
