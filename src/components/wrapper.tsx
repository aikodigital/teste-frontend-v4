import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

function Wrapper() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow m-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Wrapper;
