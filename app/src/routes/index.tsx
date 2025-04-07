import { Route, Routes } from 'react-router';
import paths from './paths';
import Home from '@/pages/home';
import NotFound from '@/pages/not-found';

const GlobalRoute = () => (
  <Routes>
    <Route path={paths.home} element={<Home />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default GlobalRoute;
