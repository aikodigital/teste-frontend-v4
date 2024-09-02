// c:/workstation/forest-operation-app/src/App.js

import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MapComponent from './components/Map'; // ou a página que for o conteúdo principal

function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <MapComponent /> {/* Substitua pelo componente principal da sua página */}
            </main>
            <Footer />
        </div>
    );
}

export default App;
