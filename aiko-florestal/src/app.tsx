import Providers from '@/config/providers';
import ApplicationRoutes from '@/config/routes';

export function App() {
   return (
      <Providers>
         <ApplicationRoutes />
      </Providers>
   );
}

