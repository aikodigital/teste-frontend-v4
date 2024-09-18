import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import MapView from './components/mapView';

// Definir a tipagem para os modelos
type ModelCount = {  
  name: string;
  count: number;
};

// Definir a tipagem para a produtividade
type ProductivityData = {
  id: string;
  name: string;
  productivity: number;
};

// Definir a tipagem para os ganhos
type EarningsData = {
  id: string;
  name: string;
  earnings: string;
};

function App() {

  

  const [dataCounts, setDataCounts] = useState<{
    stateCounts: { operando: number; parado: number; manutencao: number };
    modelCounts: ModelCount[];
    productivityData: ProductivityData[];
    earningsData: EarningsData[];
  }>({
    stateCounts: { operando: 0, parado: 0, manutencao: 0 },
    modelCounts: [],
    productivityData: [],
    earningsData: []
  });

  const totalOperando = dataCounts.stateCounts.operando;
  const totalParado = dataCounts.stateCounts.parado;
  const totalManutencao = dataCounts.stateCounts.manutencao;
  const modelCounts = dataCounts.modelCounts;
  const productivityData = dataCounts.productivityData.map((data) => ({
      ...data,
      productivity: Number(data.productivity) // Assegura que a produtividade é um número
  }));
  const earningsData = dataCounts.earningsData;
  
  return (
    <div className="App">
      <header className="header">
        <h1>Monitoramento Inteligente de Equipamentos</h1>
        <p>Otimize sua operação com insights precisos e em tempo real.</p>
      </header>
      <div className="content">
        <aside className="sidebar">
          <h2 className="infos-title">Status dos Equipamentos</h2>
          <div className="infos-summary">
            <div className="infos-item">
              <span className="icon-operando"></span> 
              <span>Operando: {totalOperando}</span>
            </div>
            <div className="infos-item">
              <span className="icon-parado"></span>
              <span>Parado: {totalParado}</span>
            </div>
            <div className="infos-item">
              <span className="icon-manutencao"></span>
              <span>Manutenção: {totalManutencao}</span>
            </div>
          </div>
          <h2 className="infos-title-margin">Modelos de Equipamentos</h2>
          <div className="infos-summary">
            {modelCounts.map((model) => (
              <div className="infos-item" key={model.name}>
                <span>{model.name}: {model.count}</span>
              </div>
            ))}
          </div>
          <h2 className="infos-title-margin">Produtividade dos Equipamentos</h2>
          <div className="infos-content" >
            <div className="infos-summary-width">
              {productivityData.map((equip) => (
                <div className="infos-item" key={equip.id}>
                  <span>{equip.name}: {equip.productivity}%</span>
                </div>
              ))}
            </div>
              {productivityData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={productivityData}>
                      <XAxis dataKey="name" />
                      <YAxis/>
                      <Tooltip />
                      <Bar dataKey="productivity" name="Produtividade" fill="#00c100" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p>Sem dados de produtividade disponíveis.</p>
              )}
          </div>
          <h2 className="infos-title-margin">Ganho dos Equipamentos</h2>
          <div>
            {earningsData.map((equip) => (
              <div className="infos-item" key={equip.id}>
                <span>{equip.name}: R$ {Number(equip.earnings).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            ))}
          </div>
        </aside>
        <div className="map-container">
          <MapView onDataChange={setDataCounts}/>
        </div>
      </div>
      <span className='copyright'>&copy; 2024 Ana Berigo</span>
    </div>
  )
}

export default App
