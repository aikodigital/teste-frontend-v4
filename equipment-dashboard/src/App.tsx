import { EquipmentProvider } from './context/EquipmentContext';
import AppContent from './components/AppContent';

const App: React.FC = () => {
  return (
    <EquipmentProvider>
      <AppContent />
    </EquipmentProvider>
  );
};

export default App;
