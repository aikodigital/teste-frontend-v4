import React from 'react';
import IconButton from '@mui/material/IconButton';
import { Brightness7, DarkMode } from '@mui/icons-material';
import { useThemeContext } from '../../../theme/useThemeContext';

const ThemeToggle: React.FC = () => {
  const { themeMode, toggleTheme } = useThemeContext();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {themeMode === 'dark' ? <Brightness7 /> : <DarkMode />}
    </IconButton>
  );
};

export default ThemeToggle;
