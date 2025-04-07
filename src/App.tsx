import { RouterProvider } from 'react-router-dom';
import AppRouter from './appRouter';

function App() {
  return (
    <section>
      <RouterProvider router={AppRouter} />
    </section>
  );
}

export default App;
