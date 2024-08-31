import './App.css';
import { Title } from './styles/styles';
import Map from './components/map/Map';
import InputForm from './components/inputForm/Form';

function App() {
    return (
      <>
        <Title>
          Projeto Aiko de Mapas
        </Title>
        <InputForm />
        <Map />
      </>
    );
}

export default App;
