import { ThemeProvider } from './components/theme-provider';
import { Provider } from './provider';
import GlobalRoute from './routes';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider>
        <GlobalRoute />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
