import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider'; // Import your custom theme provider if you have one
import { Provider } from 'react-redux';
import store from './store/store'; // Import your Redux store
import Layout from './components/common/Layout/layout';
import Home from './pages/Home/Home';
import History from './pages/History/History';
import { LoadScript } from '@react-google-maps/api';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}
        >
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/historico" element={<History />} />
                {/* <Route path="/faturamento" element={<Faturamento />} /> */}
              </Routes>
            </Layout>
          </Router>
        </LoadScript>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
