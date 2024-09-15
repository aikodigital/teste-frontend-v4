import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <h1>Hello world 1</h1>
      <Outlet />
    </>
  );
};

export default MainLayout;
