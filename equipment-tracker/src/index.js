import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Importa o Provider do React-Redux
import { configureStore } from '@reduxjs/toolkit'; // Importa a função configureStore do Redux Toolkit
import equipmentReducer from './store/equipmentSlice'; // Importa o reducer do equipment
import App from './App'; // Importa o componente principal da aplicação
import './index.css'; // Importa o arquivo de estilos

// Cria a store do Redux usando o reducer dos equipamentos
const store = configureStore({
  reducer: {
    equipment: equipmentReducer, // Adiciona o reducer de equipamentos à store
  },
});

// Renderiza a aplicação React com o Provider do Redux, que torna a store acessível a todos os componentes
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') // Monta a aplicação no DOM dentro do elemento 'root'
);
