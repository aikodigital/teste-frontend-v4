import React, { useState, useEffect, useContext } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box,
  IconButton,
  useScrollTrigger,
  Container,
  useMediaQuery,
  Tooltip,
  Switch,
  alpha
} from '@mui/material';
import { Link } from 'react-router-dom';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../App';

// Professional elevation behavior
function ElevationScroll(props) {
  const { children } = props;
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? (isDarkMode ? 0 : 4) : 0,
    sx: {
      backdropFilter: trigger && !isDarkMode ? 'blur(8px)' : 'none',
      transition: 'all 0.3s ease',
      borderBottom: 'none',
    },
  });
}

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect management
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ElevationScroll>
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: theme.palette.mode === 'light' 
            ? '#102A43' // Dark blue for light mode for better contrast
            : '#0F172A', // Darker blue for dark mode
          transition: theme.palette.mode === 'light' ? 'background-color 0.3s ease, box-shadow 0.3s ease' : 'none',
          boxShadow: scrolled && theme.palette.mode === 'light'
            ? '0 4px 20px rgba(0,0,0,0.25)' 
            : 'none',
          height: { xs: 64, md: 70 },
          borderBottom: 'none'
        }}
      >
        <Container maxWidth="xl" sx={{ height: '100%' }}>
          <Toolbar 
            disableGutters 
            sx={{ 
              px: { xs: 2, sm: 3 },
              height: '100%',
              minHeight: { xs: 64, md: 70 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo Section */}
            <Box
              component={Link}
              to="/"
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'white',
                transition: 'opacity 0.2s ease',
                '&:hover': {
                  opacity: 0.9
                }
              }}
            >
              <Box
                sx={{
                  width: { xs: 38, md: 42 },
                  height: { xs: 38, md: 42 },
                  background: '#3B82F6', // Bright blue for high contrast
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  color: 'white',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: '1.2rem', md: '1.3rem' },
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  position: 'relative',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
                  }
                }}
              >
                M
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 600,
                    color: 'white',
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                    lineHeight: 1.2,
                  }}
                >
                  Monitoramento Florestal
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    fontFamily: "'Montserrat', sans-serif",
                    color: '#94A3B8', // Light gray for subtle contrast with white text
                    fontWeight: 500,
                    fontSize: '0.7rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    mt: 0.3
                  }}
                >
                  Sistema de Gestão Ambiental
                </Typography>
              </Box>
            </Box>

            {/* Right Section */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Dark/Light Mode Toggle */}
              <Box 
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: { xs: 0, sm: 2 },
                }}
              >
                {isMobile ? (
                  <Tooltip title={colorMode.mode === 'light' ? 'Modo escuro' : 'Modo claro'}>
                    <IconButton
                      onClick={colorMode.toggleColorMode}
                      edge="end"
                      size="small"
                      sx={{
                        color: 'white',
                        width: 38,
                        height: 38,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)'
                        }
                      }}
                    >
                      {colorMode.mode === 'light' ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      py: 0.8,
                      px: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 28,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)'
                      }
                    }}
                  >
                    <LightModeIcon 
                      fontSize="small" 
                      sx={{ 
                        color: 'white',
                        opacity: colorMode.mode === 'light' ? 1 : 0.6,
                        mr: 1
                      }} 
                    />
                    <Switch
                      checked={colorMode.mode === 'dark'}
                      onChange={colorMode.toggleColorMode}
                      size="small"
                      sx={{ 
                        mx: 0.5,
                        '& .MuiSwitch-thumb': {
                          background: colorMode.mode === 'light' 
                            ? '#FCD34D' // Yellow for light mode (sun)
                            : '#A78BFA', // Purple for dark mode (night)
                        },
                        '& .MuiSwitch-track': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3) !important',
                          opacity: 1,
                        }
                      }}
                    />
                    <DarkModeIcon 
                      fontSize="small" 
                      sx={{ 
                        color: 'white',
                        opacity: colorMode.mode === 'dark' ? 1 : 0.6,
                        ml: 1
                      }} 
                    />
                  </Box>
                )}
              </Box>

              {isMobile && (
                <Tooltip title="Menu">
                  <IconButton
                    edge="end"
                    aria-label="menu"
                    sx={{
                      ml: 1,
                      color: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)'
                      }
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header; 