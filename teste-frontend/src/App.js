import React, { useState, useEffect, createContext, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Global, css, keyframes } from '@emotion/react';

// Import Theme
import theme, { getThemedComponents } from './theme';

// Components
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import EquipmentDetail from './pages/EquipmentDetail';

// Services
import { fetchData } from './services/api';

// Criar o contexto do tema
export const ColorModeContext = createContext({ 
  toggleColorMode: () => {},
  mode: 'light' 
});

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
`;

const subtlePulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const subtleGlow = keyframes`
  0% { box-shadow: 0 0 0 rgba(25, 118, 210, 0); }
  50% { box-shadow: 0 0 10px rgba(25, 118, 210, 0.2); }
  100% { box-shadow: 0 0 0 rgba(25, 118, 210, 0); }
`;

// Global styles
const globalStyles = mode => css`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.6s cubic-bezier(0.22, 1, 0.36, 1), color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    animation: ${fadeIn} 0.5s ease-in-out;
  }
  
  /* Global hover transitions for all interactive elements */
  a, button, [role="button"], 
  .MuiButtonBase-root, .MuiIconButton-root, 
  .MuiChip-root, .MuiMenuItem-root, .MuiListItem-root,
  .MuiCard-root, .MuiPaper-root {
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1) !important;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    will-change: transform, box-shadow, background-color;
  }
  
  /* Microinteraction on any clickable element */
  a:active, button:active, [role="button"]:active, 
  .MuiButtonBase-root:active, .MuiIconButton-root:active {
    transform: scale(0.96) !important;
    transition: transform 0.15s cubic-bezier(0.22, 1, 0.36, 1) !important;
  }
  
  /* Scrollbar customization */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'};
    border-radius: 4px;
    transition: background-color 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: ${mode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
    border-radius: 4px;
    transition: background-color 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${mode === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'};
  }
  
  /* Animation for page transitions */
  .page-enter {
    opacity: 0;
    transform: translateY(10px);
  }
  
  .page-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  
  .page-exit {
    opacity: 1;
    transform: translateY(0);
  }
  
  .page-exit-active {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  
  /* Enhanced hover effects for common elements */
  .MuiButton-root {
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
      opacity: 0;
      transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1);
      z-index: 0;
    }
    
    &:hover {
      transform: translateY(-4px) scale(1.01);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(25, 118, 210, 0.15);
      
      &::after {
        opacity: 1;
      }
    }
    
    &:active {
      transition: transform 0.15s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.15s cubic-bezier(0.22, 1, 0.36, 1);
    }
  }
  
  .MuiIconButton-root:hover {
    transform: translateY(-4px) scale(1.15);
    box-shadow: 0 6px 16px ${mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.3)'};
    animation: ${subtlePulse} 1.5s infinite cubic-bezier(0.22, 1, 0.36, 1);
    background-color: ${mode === 'light' ? 'rgba(25, 118, 210, 0.08)' : 'rgba(144, 202, 249, 0.08)'};
  }
  
  .MuiChip-root:hover {
    transform: translateY(-4px) scale(1.03);
    animation: ${subtleGlow} 2s infinite cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
  
  .MuiMenuItem-root:hover,
  .MuiListItem-root:hover {
    transform: translateX(5px);
    background-image: linear-gradient(to right, 
      ${mode === 'light' ? 'rgba(25, 118, 210, 0.03)' : 'rgba(144, 202, 249, 0.03)'}, 
      ${mode === 'light' ? 'rgba(25, 118, 210, 0.08)' : 'rgba(144, 202, 249, 0.08)'}
    );
    box-shadow: inset 2px 0 0 ${mode === 'light' ? 'rgba(25, 118, 210, 0.7)' : 'rgba(144, 202, 249, 0.7)'};
  }
  
  .MuiCard-root {
    transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    
    &:hover {
      transform: translateY(-8px) scale(1.01);
      box-shadow: 
        0 14px 28px ${mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.3)'},
        0 10px 10px ${mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.15)'},
        0 0 0 1px ${mode === 'light' ? 'rgba(25, 118, 210, 0.1)' : 'rgba(144, 202, 249, 0.1)'};
    }
  }
  
  .MuiPaper-root:hover {
    box-shadow: 
      0 10px 25px ${mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.25)'},
      0 0 0 1px ${mode === 'light' ? 'rgba(25, 118, 210, 0.08)' : 'rgba(144, 202, 249, 0.08)'};
  }
  
  /* Theme transition animation */
  .MuiPaper-root,
  .MuiCard-root,
  .MuiAppBar-root,
  .MuiDrawer-paper,
  .MuiAccordion-root,
  .MuiAlert-root,
  .MuiAutocomplete-paper,
  .MuiDialog-paper,
  .MuiPopover-paper,
  .MuiSnackbar-root,
  .MuiTooltip-tooltip,
  .MuiMenu-paper {
    transition: 
      background-color 0.6s cubic-bezier(0.22, 1, 0.36, 1), 
      box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1), 
      border-color 0.6s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) !important;
  }
`;

function App() {
  const [equipments, setEquipments] = useState([]);
  const [equipmentModels, setEquipmentModels] = useState([]);
  const [equipmentStates, setEquipmentStates] = useState([]);
  const [positionHistory, setPositionHistory] = useState([]);
  const [stateHistory, setStateHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState(() => {
    // Verifica se há uma preferência salva
    const savedMode = localStorage.getItem('themeMode');
    // Verifica a preferência do sistema se não houver uma preferência salva
    if (!savedMode) {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDarkMode ? 'dark' : 'light';
    }
    return savedMode;
  });

  // Memorizar o tema baseado no modo atual
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode);
          return newMode;
        });
      },
      mode,
    }),
    [mode]
  );

  // Memo do tema para evitar recálculos desnecessários
  const currentTheme = useMemo(() => getThemedComponents(mode), [mode]);

  // Atualizar modo do tema com base na preferência do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Apenas atualiza se não houver uma preferência salva
      if (!localStorage.getItem('themeMode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          equipmentsData,
          equipmentModelsData,
          equipmentStatesData,
          positionHistoryData,
          stateHistoryData
        ] = await Promise.all([
          fetchData('equipment.json'),
          fetchData('equipmentModel.json'),
          fetchData('equipmentState.json'),
          fetchData('equipmentPositionHistory.json'),
          fetchData('equipmentStateHistory.json')
        ]);

        setEquipments(equipmentsData);
        setEquipmentModels(equipmentModelsData);
        setEquipmentStates(equipmentStatesData);
        setPositionHistory(positionHistoryData);
        setStateHistory(stateHistoryData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Global styles={globalStyles(mode)} />
        <Router>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100vh',
            transition: 'background-color 0.5s ease-in-out, color 0.5s ease-in-out',
            bgcolor: 'background.default',
            color: 'text.primary'
          }}>
            <Header />
            <Box 
              component="main" 
              sx={{ 
                flexGrow: 1, 
                p: { xs: 2, sm: 3 }, 
                maxWidth: '1400px', 
                width: '100%', 
                mx: 'auto',
                transition: 'all 0.5s ease-in-out'
              }}
            >
              {isLoading ? (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    flexDirection: 'column',
                    gap: 2
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: '3px solid transparent',
                      borderTopColor: currentTheme.palette.primary.main,
                      animation: 'spin 1s linear infinite',
                      '@keyframes spin': {
                        '0%': {
                          transform: 'rotate(0deg)'
                        },
                        '100%': {
                          transform: 'rotate(360deg)'
                        }
                      }
                    }}
                  />
                  <Box sx={{ typography: 'h6', color: 'text.secondary' }}>
                    Carregando dados...
                  </Box>
                </Box>
              ) : (
                <Routes>
                  <Route 
                    path="/" 
                    element={
                      <Dashboard
                        equipments={equipments}
                        equipmentModels={equipmentModels}
                        equipmentStates={equipmentStates}
                        positionHistory={positionHistory}
                        stateHistory={stateHistory}
                      />
                    } 
                  />
                  <Route 
                    path="/equipment/:id" 
                    element={
                      <EquipmentDetail
                        equipments={equipments}
                        equipmentModels={equipmentModels}
                        equipmentStates={equipmentStates}
                        positionHistory={positionHistory}
                        stateHistory={stateHistory}
                      />
                    } 
                  />
                </Routes>
              )}
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
