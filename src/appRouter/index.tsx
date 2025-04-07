import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Wrapper from '../components/wrapper';

const Home = lazy(() => import('../pages/home'));
const EquipmentDetail = lazy(() => import('../pages/equipment-detail'));
const ErrorPage = lazy(() => import('../pages/errorPage'));
const NotFound = lazy(() => import('../pages/notFound'));

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <Wrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: '/equipmentdetail/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EquipmentDetail />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      { path: '*', element: <NotFound />, errorElement: <ErrorPage /> },
    ],
  },
]);

export default AppRouter;
