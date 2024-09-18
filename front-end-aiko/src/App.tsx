import './App.scss';
import 'leaflet/dist/leaflet.css';
import AikoLogo from "../../img/aiko.png";
import MapComponent from './components/MapComponent';
import EquipmentComponent from './components/EquipmentComponent';
import { useState } from 'react';
import Documentation from './components/Documentation';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('map');
  const [animationState, setAnimationState] = useState('fade-in');

  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  
  const changeComponent = (component: string) => {
    setAnimationState('fade-out');
    setTimeout(() => {
      setActiveComponent(component);
      setAnimationState('fade-in');
    }, 500);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'map':
        return <MapComponent
          selectedState={selectedState}
          selectedModel={selectedModel}
          searchQuery={searchQuery}
        />;
      case 'equipmentmodels':
        return <EquipmentComponent />;
      case 'docs':
        return <Documentation/>;
      default:
        return <MapComponent 
        selectedState={selectedState}
        selectedModel={selectedModel}
        searchQuery={searchQuery}/>;
    }
  };

  return (
    <div className='mainContainer'>
      <div className='lContainer'>
        <img className="lContainer--image" src={AikoLogo} alt="Aiko Logo" />
        <div className='lContainer--navbar'>
          <button className="button-navbar" onClick={() => changeComponent('map')}>
             Mapa
          </button>
          <button className="button-navbar" onClick={() => changeComponent('equipmentmodels')}>
             Equipamentos
          </button>
          <button className="button-navbar" onClick={() => changeComponent('docs')}>
             Documentação
          </button>
          
        </div>
        <div className='filtragem'>
          <select className="filtragem--select" onChange={(e) => setSelectedState(e.target.value)} value={selectedState || ''}>
            <option className="filtragem--select_option" value="">Todos os Estados</option>
            <option className="filtragem--select_option" value="Operando">Operando</option>
            <option className="filtragem--select_option" value="Parado">Parado</option>
            <option className="filtragem--select_option" value="Manutenção">Manutenção</option>
          </select>
          <select className="filtragem--select" onChange={(e) => setSelectedModel(e.target.value)} value={selectedModel || ''}>
            <option className="filtragem--select_option" value="">Todos os Modelos</option>
            <option className="filtragem--select_option" value="Harvester">Harvester</option>
            <option className="filtragem--select_option" value="Caminhão de carga">Caminhão de carga</option>
            <option className="filtragem--select_option" value="Garra traçadora">Garra traçadora</option>
          </select>
          <input
            className='filtragem--input'
            type="text"
            placeholder="Pesquisar por nome"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className={`rContainer ${animationState}`}>
        <div className='rContainer--body'>
          <div className="rContainer--body_map">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
