import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MyProvider from './context/context';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyProvider>
      <App />
    </MyProvider>
  </React.StrictMode>
);
