import { useMarkers } from '@/hooks';

import { MapComponent } from './components';

function App() {
  const markers = useMarkers();

  return (
    <>
      <h1>Aiko - Teste Frontend</h1>
      {markers.length > 0 ? <MapComponent markers={markers} /> : null}
    </>
  );
}

export default App;
