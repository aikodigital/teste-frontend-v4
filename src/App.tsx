import { ThemeProvider } from 'styled-components';

import { EquipmentProvider } from './hooks';

import { Dashboard } from './pages';

import { theme } from './styles';

import 'leaflet/dist/leaflet.css';
import '@/styles/defaultStyle.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <EquipmentProvider>
        <Dashboard />
      </EquipmentProvider>
    </ThemeProvider>
  );
}

export default App;
