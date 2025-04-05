import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  TextField,
  Box,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Collapse,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Badge,
  Tooltip,
  useTheme,
  Button,
  Stack,
  Menu,
  alpha
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const FilterPanel = ({ 
  equipmentModels, 
  equipmentStates, 
  selectedModel, 
  setSelectedModel,
  selectedState,
  setSelectedState,
  searchTerm,
  setSearchTerm
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(true);
  
  // Estados para os menus de modelo e estado
  const [modelMenuAnchor, setModelMenuAnchor] = useState(null);
  const [stateMenuAnchor, setStateMenuAnchor] = useState(null);
  
  // Verifica se há algum filtro ativo
  const hasActiveFilters = Boolean(selectedModel || selectedState || searchTerm);
  
  // Calcular a contagem de filtros ativos
  const activeFilterCount = [selectedModel, selectedState, searchTerm].filter(Boolean).length;
  
  // Limpar todos os filtros
  const clearFilters = () => {
    setSelectedModel('');
    setSelectedState('');
    setSearchTerm('');
  };

  // Limpar um filtro específico
  const clearFilter = (filterType) => {
    switch(filterType) {
      case 'model':
        setSelectedModel('');
        break;
      case 'state':
        setSelectedState('');
        break;
      case 'search':
        setSearchTerm('');
        break;
      default:
        break;
    }
  };

  // Manipuladores para os menus
  const handleModelMenuOpen = (event) => {
    setModelMenuAnchor(event.currentTarget);
  };

  const handleModelMenuClose = () => {
    setModelMenuAnchor(null);
  };

  const handleStateMenuOpen = (event) => {
    setStateMenuAnchor(event.currentTarget);
  };

  const handleStateMenuClose = () => {
    setStateMenuAnchor(null);
  };

  const handleModelSelect = (modelId) => {
    setSelectedModel(modelId);
    handleModelMenuClose();
  };

  const handleStateSelect = (stateId) => {
    setSelectedState(stateId);
    handleStateMenuClose();
  };

  // Obter nome do modelo selecionado
  const selectedModelName = selectedModel 
    ? equipmentModels.find(m => m.id === selectedModel)?.name || 'Desconhecido'
    : '';

  // Obter nome e cor do estado selecionado
  const selectedStateInfo = selectedState 
    ? equipmentStates.find(s => s.id === selectedState) 
    : null;
  
  return (
    <Card 
      elevation={1} 
      sx={{ 
        mb: 3,
        overflow: 'visible',
        borderRadius: 3,
        transition: 'all 0.3s ease-in-out',
        border: hasActiveFilters ? `1px solid ${theme.palette.primary.light}` : '1px solid transparent',
        '&:hover': {
          boxShadow: hasActiveFilters ? theme.shadows[4] : theme.shadows[2]
        }
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
            <Badge 
              badgeContent={activeFilterCount} 
              color="primary"
              sx={{ mr: 2 }}
              invisible={!hasActiveFilters}
            >
              <FilterListIcon color={hasActiveFilters ? "primary" : "action"} />
            </Badge>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Filtros
            </Typography>
            {expanded ? <ExpandLessIcon sx={{ ml: 1 }} fontSize="small" /> : <ExpandMoreIcon sx={{ ml: 1 }} fontSize="small" />}
          </Box>
        }
        action={
          hasActiveFilters && (
            <Tooltip title="Limpar todos os filtros">
              <Chip 
                label="Limpar todos" 
                onClick={clearFilters} 
                variant="outlined"
                color="primary"
                size="small"
                deleteIcon={<ClearIcon />}
                onDelete={clearFilters}
                sx={{ 
                  transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  borderWidth: '1.5px',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(25, 118, 210, 0.2), transparent)',
                    transition: 'left 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 0,
                    pointerEvents: 'none',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 5px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(25, 118, 210, 0.15)',
                    '&::before': {
                      left: '100%',
                    },
                  },
                  '&:active': {
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)'
                  }
                }}
              />
            </Tooltip>
          )
        }
        sx={{ 
          py: 1.5, 
          cursor: 'pointer', 
          backgroundColor: hasActiveFilters ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
          transition: 'background-color 0.2s',
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
        }}
        onClick={() => setExpanded(!expanded)}
      />
      
      <Collapse in={expanded} timeout={300}>
        <Divider />
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Grid container spacing={2}>
            {/* Pesquisa por nome */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Pesquisar equipamento"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ex: CA-0001"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="clear search"
                        onClick={() => clearFilter('search')}
                        edge="end"
                        size="small"
                        sx={{
                          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                          '&:hover': {
                            transform: 'rotate(90deg) scale(1.1)',
                            color: theme.palette.error.main,
                            backgroundColor: alpha(theme.palette.error.main, 0.05),
                          }
                        }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { 
                    borderRadius: 0,
                    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    '&:hover': {
                      boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.15)'
                    },
                    ...(searchTerm && {
                      borderColor: theme.palette.primary.main,
                      boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.15)'
                    })
                  }
                }}
              />
            </Grid>
            
            {/* Filtro por modelo - Nova implementação */}
            <Grid item xs={12} md={4}>
              <Stack spacing={0.5}>
                <Typography variant="body2" fontWeight={500} color="text.secondary">
                  Modelo de Equipamento
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    color={selectedModel ? "primary" : "inherit"}
                    size="small"
                    endIcon={<KeyboardArrowDownIcon />}
                    onClick={handleModelMenuOpen}
                    sx={{
                      borderRadius: theme.shape.borderRadius,
                      textTransform: 'none',
                      fontWeight: 500,
                      minWidth: '150px',
                      justifyContent: 'space-between',
                      backgroundColor: selectedModel ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                      position: 'relative',
                      overflow: 'hidden',
                      borderWidth: '1.5px',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        transition: 'left 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                        zIndex: 0,
                        pointerEvents: 'none',
                      },
                      '&:hover': {
                        backgroundColor: selectedModel ? alpha(theme.palette.primary.main, 0.15) : alpha(theme.palette.action.hover, 0.15),
                        transform: 'translateY(-5px)',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.1), 0 0 0 1px rgba(25, 118, 210, 0.2)',
                        '& .MuiSvgIcon-root': {
                          transform: 'rotate(180deg)',
                        },
                        '&::before': {
                          left: '100%',
                        },
                      },
                      '& .MuiSvgIcon-root': {
                        transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                      },
                      '&:active': {
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)'
                      },
                      transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                      boxShadow: selectedModel ? `0 0 0 1px ${theme.palette.primary.main}` : 'none',
                    }}
                    aria-haspopup="true"
                    aria-expanded={Boolean(modelMenuAnchor) ? 'true' : undefined}
                  >
                    {selectedModel ? 'Selecionado' : 'Selecionar Modelo'}
                  </Button>
                  
                  {selectedModel && (
                    <Tooltip title="Limpar filtro de modelo">
                      <IconButton
                        size="small"
                        sx={{ 
                          ml: 1,
                          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                          '&:hover': {
                            transform: 'translateY(-5px) rotate(90deg) scale(1.1)',
                            backgroundColor: alpha(theme.palette.error.main, 0.08),
                            color: theme.palette.error.main,
                            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                          },
                          '&:active': {
                            transform: 'translateY(-2px) rotate(90deg)',
                            transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)'
                          }
                        }}
                        onClick={() => clearFilter('model')}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
                
                {selectedModel && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 0.5, 
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                      maxWidth: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                      animation: 'fadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                      '@keyframes fadeIn': {
                        '0%': { opacity: 0, transform: 'translateY(-5px)' },
                        '100%': { opacity: 1, transform: 'translateY(0)' }
                      }
                    }}
                  >
                    {selectedModelName}
                  </Typography>
                )}
                
                <Menu
                  anchorEl={modelMenuAnchor}
                  open={Boolean(modelMenuAnchor)}
                  onClose={handleModelMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      borderRadius: 3,
                      boxShadow: theme.shadows[3],
                      maxHeight: 300,
                      width: 250,
                    }
                  }}
                >
                  <MenuItem 
                    onClick={() => handleModelSelect('')}
                    sx={{
                      borderLeft: '3px solid transparent',
                      transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, rgba(25, 118, 210, 0.03), transparent)',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                        zIndex: -1,
                        pointerEvents: 'none',
                      },
                      '&:hover': { 
                        borderLeft: `3px solid ${theme.palette.primary.main}`,
                        backgroundColor: alpha(theme.palette.primary.main, 0.06),
                        transform: 'translateX(8px)',
                        '&::before': {
                          transform: 'translateX(0)'
                        }
                      },
                      ...(selectedModel === '' && { 
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        borderLeft: `3px solid ${theme.palette.primary.main}`
                      })
                    }}
                  >
                    <em>Todos os modelos</em>
                  </MenuItem>
                  
                  {equipmentModels.map(model => (
                    <MenuItem 
                      key={model.id} 
                      onClick={() => handleModelSelect(model.id)}
                      sx={{
                        minHeight: '45px',
                        py: 1,
                        borderLeft: '3px solid transparent',
                        transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, rgba(25, 118, 210, 0.03), transparent)',
                          transform: 'translateX(-100%)',
                          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                          zIndex: -1,
                          pointerEvents: 'none',
                        },
                        '&:hover': { 
                          borderLeft: `3px solid ${theme.palette.primary.main}`,
                          backgroundColor: alpha(theme.palette.primary.main, 0.06),
                          transform: 'translateX(8px)',
                          '&::before': {
                            transform: 'translateX(0)'
                          }
                        },
                        ...(selectedModel === model.id && { 
                          backgroundColor: alpha(theme.palette.primary.main, 0.08),
                          borderLeft: `3px solid ${theme.palette.primary.main}`
                        })
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          maxWidth: '100%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'normal',
                          wordBreak: 'break-word',
                          lineHeight: 1.3
                        }}
                      >
                        {model.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Stack>
            </Grid>
            
            {/* Filtro por estado - Nova implementação */}
            <Grid item xs={12} md={4}>
              <Stack spacing={0.5}>
                <Typography variant="body2" fontWeight={500} color="text.secondary">
                  Estado Atual
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    color={selectedState ? "primary" : "inherit"}
                    size="small"
                    endIcon={<KeyboardArrowDownIcon />}
                    onClick={handleStateMenuOpen}
                    sx={{
                      borderRadius: theme.shape.borderRadius,
                      textTransform: 'none',
                      fontWeight: 500,
                      minWidth: '150px',
                      justifyContent: 'space-between',
                      backgroundColor: selectedState ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                      position: 'relative',
                      overflow: 'hidden',
                      borderWidth: '1.5px',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        transition: 'left 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                        zIndex: 0,
                        pointerEvents: 'none',
                      },
                      '&:hover': {
                        backgroundColor: selectedState ? alpha(theme.palette.primary.main, 0.15) : alpha(theme.palette.action.hover, 0.15),
                        transform: 'translateY(-5px)',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.1), 0 0 0 1px rgba(25, 118, 210, 0.2)',
                        '& .MuiSvgIcon-root': {
                          transform: 'rotate(180deg)',
                        },
                        '&::before': {
                          left: '100%',
                        },
                      },
                      '& .MuiSvgIcon-root': {
                        transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                      },
                      '&:active': {
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)'
                      },
                      transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                      boxShadow: selectedState ? `0 0 0 1px ${theme.palette.primary.main}` : 'none',
                    }}
                    aria-haspopup="true"
                    aria-expanded={Boolean(stateMenuAnchor) ? 'true' : undefined}
                  >
                    {selectedState ? 'Selecionado' : 'Selecionar Estado'}
                  </Button>
                  
                  {selectedState && (
                    <Tooltip title="Limpar filtro de estado">
                      <IconButton
                        size="small"
                        sx={{ 
                          ml: 1,
                          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                          '&:hover': {
                            transform: 'translateY(-5px) rotate(90deg) scale(1.1)',
                            backgroundColor: alpha(theme.palette.error.main, 0.08),
                            color: theme.palette.error.main,
                            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                          },
                          '&:active': {
                            transform: 'translateY(-2px) rotate(90deg)',
                            transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)'
                          }
                        }}
                        onClick={() => clearFilter('state')}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
                
                {selectedState && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        backgroundColor: selectedStateInfo?.color || 'grey',
                        mr: 1,
                        border: `1px solid ${alpha(selectedStateInfo?.color || 'grey', 0.5)}`
                      }} 
                    />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.palette.primary.main,
                        fontWeight: 500
                      }}
                    >
                      {selectedStateInfo?.name || 'Desconhecido'}
                    </Typography>
                  </Box>
                )}
                
                <Menu
                  anchorEl={stateMenuAnchor}
                  open={Boolean(stateMenuAnchor)}
                  onClose={handleStateMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      borderRadius: 3,
                      boxShadow: theme.shadows[3],
                      maxHeight: 300,
                      width: 250,
                    }
                  }}
                >
                  <MenuItem 
                    onClick={() => handleStateSelect('')}
                    sx={{
                      borderLeft: '3px solid transparent',
                      transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, rgba(25, 118, 210, 0.03), transparent)',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                        zIndex: -1,
                        pointerEvents: 'none',
                      },
                      '&:hover': { 
                        borderLeft: `3px solid ${theme.palette.primary.main}`,
                        backgroundColor: alpha(theme.palette.primary.main, 0.06),
                        transform: 'translateX(8px)',
                        '&::before': {
                          transform: 'translateX(0)'
                        }
                      },
                      ...(selectedState === '' && { 
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        borderLeft: `3px solid ${theme.palette.primary.main}`
                      })
                    }}
                  >
                    <em>Todos os estados</em>
                  </MenuItem>
                  
                  {equipmentStates.map(state => (
                    <MenuItem 
                      key={state.id} 
                      onClick={() => handleStateSelect(state.id)}
                      sx={{
                        borderLeft: '3px solid transparent',
                        transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, rgba(25, 118, 210, 0.03), transparent)',
                          transform: 'translateX(-100%)',
                          transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                          zIndex: -1,
                          pointerEvents: 'none',
                        },
                        '&:hover': { 
                          borderLeft: `3px solid ${theme.palette.primary.main}`,
                          backgroundColor: alpha(theme.palette.primary.main, 0.06),
                          transform: 'translateX(8px)',
                          '&::before': {
                            transform: 'translateX(0)'
                          }
                        },
                        ...(selectedState === state.id && { 
                          backgroundColor: alpha(theme.palette.primary.main, 0.08),
                          borderLeft: `3px solid ${theme.palette.primary.main}`
                        })
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Box 
                          sx={{ 
                            width: 16, 
                            height: 16, 
                            borderRadius: '0%', 
                            backgroundColor: state.color,
                            mr: 1.5,
                            flexShrink: 0,
                            border: `1px solid ${alpha(state.color, 0.5)}`
                          }} 
                        />
                        <Typography 
                          variant="body2"
                          sx={{
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {state.name}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Menu>
              </Stack>
            </Grid>
          </Grid>
          
          {/* Filtros ativos */}
          {hasActiveFilters && (
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                Filtros ativos:
              </Typography>
              
              {selectedModel && (
                <Chip 
                  size="small"
                  label={
                    <Typography variant="caption" noWrap sx={{ maxWidth: 150, display: 'block' }}>
                      Modelo: {equipmentModels.find(m => m.id === selectedModel)?.name || 'Desconhecido'}
                    </Typography>
                  }
                  onDelete={() => clearFilter('model')}
                  color="primary"
                  variant="outlined"
                  sx={{ 
                    height: 'auto',
                    padding: '2px 0',
                    '& .MuiChip-label': { 
                      padding: '4px 8px'
                    },
                    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    borderWidth: '1.5px',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(25, 118, 210, 0.2), transparent)',
                      transition: 'left 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                      zIndex: 0,
                      pointerEvents: 'none',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 5px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(25, 118, 210, 0.15)',
                      '& .MuiChip-deleteIcon': {
                        transform: 'rotate(90deg)',
                      },
                      '&::before': {
                        left: '100%',
                      },
                    },
                    '& .MuiChip-deleteIcon': {
                      transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    },
                    '&:active': {
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)'
                    },
                    animation: 'fadeInLeft 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    '@keyframes fadeInLeft': {
                      '0%': { opacity: 0, transform: 'translateX(-10px)' },
                      '100%': { opacity: 1, transform: 'translateX(0)' }
                    }
                  }}
                />
              )}
              
              {selectedState && (
                <Chip 
                  size="small"
                  icon={
                    <Box 
                      sx={{ 
                        width: 10, 
                        height: 10, 
                        borderRadius: '0%', 
                        backgroundColor: equipmentStates.find(s => s.id === selectedState)?.color || 'grey',
                        ml: 1
                      }} 
                    />
                  }
                  label={`Estado: ${equipmentStates.find(s => s.id === selectedState)?.name || 'Desconhecido'}`}
                  onDelete={() => clearFilter('state')}
                  color="primary"
                  variant="outlined"
                  sx={{ 
                    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    borderWidth: '1.5px',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(25, 118, 210, 0.2), transparent)',
                      transition: 'left 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                      zIndex: 0,
                      pointerEvents: 'none',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 5px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(25, 118, 210, 0.15)',
                      '& .MuiChip-deleteIcon': {
                        transform: 'rotate(90deg)',
                      },
                      '&::before': {
                        left: '100%',
                      },
                    },
                    '& .MuiChip-deleteIcon': {
                      transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    },
                    '&:active': {
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)'
                    },
                    animation: 'fadeInLeft 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    '@keyframes fadeInLeft': {
                      '0%': { opacity: 0, transform: 'translateX(-10px)' },
                      '100%': { opacity: 1, transform: 'translateX(0)' }
                    }
                  }}
                />
              )}
              
              {searchTerm && (
                <Chip 
                  size="small"
                  label={`Pesquisa: ${searchTerm}`}
                  onDelete={() => clearFilter('search')}
                  color="primary"
                  variant="outlined"
                  sx={{ 
                    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    borderWidth: '1.5px',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(25, 118, 210, 0.2), transparent)',
                      transition: 'left 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                      zIndex: 0,
                      pointerEvents: 'none',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 5px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(25, 118, 210, 0.15)',
                      '& .MuiChip-deleteIcon': {
                        transform: 'rotate(90deg)',
                      },
                      '&::before': {
                        left: '100%',
                      },
                    },
                    '& .MuiChip-deleteIcon': {
                      transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    },
                    '&:active': {
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)'
                    },
                    animation: 'fadeInLeft 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    '@keyframes fadeInLeft': {
                      '0%': { opacity: 0, transform: 'translateX(-10px)' },
                      '100%': { opacity: 1, transform: 'translateX(0)' }
                    }
                  }}
                />
              )}
            </Box>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default FilterPanel; 