import './styles/App.css';
import Wrapper from './layout/Wrapper/wrapper';
import NavBar from './layout/NavBar/navbar';
import Map from './layout/Map/map';

function App() {
  return (
    <Wrapper>
      <NavBar />
      <Map />
    </Wrapper>
  );
}

export default App;
