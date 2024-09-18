import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <footer className="justify-self-end bg-black text-gray-500 text-center">@developed by @phfernandesmc</footer>
    </>
  );
};

export default MainLayout;
