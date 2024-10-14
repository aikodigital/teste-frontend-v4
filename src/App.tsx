import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { createTheme, ThemeProvider } from '@mui/material';
import { ClassRoomProvider } from './contexts/ClassroomContext';
import { StudentProvider } from './contexts/StudentContext';
import { StatisticsProvider } from './contexts/StatisticsContext';
import { GradedStudentProvider } from './contexts/GradedStudent';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7a7abc', // Roxo principal
    },
    secondary: {
      main: '#4e4eb5', // Roxo secundário
    },
    background: {
      default: '#F0F0F0', // Lavanda
    },
    text: {
      primary: '#4B4B4B', // Cinza Escuro
      secondary: '#babae5', // Roxo claro
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatisticsProvider>
        <ClassRoomProvider>
          <StudentProvider>
            <GradedStudentProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                </Routes>
              </Router>
            </GradedStudentProvider>
          </StudentProvider>
        </ClassRoomProvider>
      </StatisticsProvider>
    </ThemeProvider>
  );
}

export default App;