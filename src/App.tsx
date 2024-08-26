import { ThemeProvider } from 'styled-components';

import { Maps } from './pages';

import { theme } from './styles';

import 'leaflet/dist/leaflet.css';
import '@/styles/defaultStyle.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Maps />
    </ThemeProvider>
  );
}

export default App;
