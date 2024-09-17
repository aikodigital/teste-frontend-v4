import './App.css';
import { Layout } from './components/Map/index.js'; 
import { Header } from './components/header/index.js';
function App() {
  return (
    <div className="App">
      <Header />
      <Layout />
    </div>
  );
}

export default App;
