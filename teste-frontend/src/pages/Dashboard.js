import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  Fade,
  Chip,
  Divider,
  Stack,
  LinearProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { getLatestPositions, getLatestStates } from '../services/api';
import Map from '../components/Map';
import FilterPanel from '../components/FilterPanel';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Label } from 'recharts';
import { alpha } from '@mui/material/styles';

// Ícones
import EquipmentIcon from '@mui/icons-material/Construction';
import OperatingIcon from '@mui/icons-material/PlayCircleOutline';
import StoppedIcon from '@mui/icons-material/PauseCircleOutline';
import MaintenanceIcon from '@mui/icons-material/BuildCircleOutlined';

const Dashboard = ({ 
  equipments, 
  equipmentModels, 
  equipmentStates, 
  positionHistory, 
  stateHistory 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Estados para filtros
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Calcular as últimas posições e estados
  const latestPositions = useMemo(() => getLatestPositions(positionHistory), [positionHistory]);
  const latestStates = useMemo(() => getLatestStates(stateHistory), [stateHistory]);
  
  // Filtrar equipamentos com base nos critérios
  const filteredEquipments = useMemo(() => {
    let filtered = [...equipments];
    
    // Filtrar por modelo
    if (selectedModel) {
      filtered = filtered.filter(e => e.equipmentModelId === selectedModel);
    }
    
    // Filtrar por estado atual
    if (selectedState) {
      filtered = filtered.filter(e => {
        const state = latestStates.find(s => s.equipmentId === e.id);
        return state && state.latestState && state.latestState.equipmentStateId === selectedState;
      });
    }
    
    // Filtrar por termo de pesquisa
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(e => e.name.toLowerCase().includes(search));
    }
    
    return filtered;
  }, [equipments, selectedModel, selectedState, searchTerm, latestStates]);
  
  // Filtrar as posições e estados baseado nos equipamentos filtrados
  const filteredPositions = useMemo(() => {
    const filteredIds = filteredEquipments.map(e => e.id);
    return latestPositions.filter(p => filteredIds.includes(p.equipmentId));
  }, [filteredEquipments, latestPositions]);
  
  const filteredLatestStates = useMemo(() => {
    const filteredIds = filteredEquipments.map(e => e.id);
    return latestStates.filter(s => filteredIds.includes(s.equipmentId));
  }, [filteredEquipments, latestStates]);
  
  // Estatísticas dos equipamentos filtrados
  const stats = useMemo(() => {
    const totalEquipments = filteredEquipments.length;
    
    // Contar por estado
    const countByState = {};
    equipmentStates.forEach(state => {
      countByState[state.id] = 0;
    });
    
    filteredLatestStates.forEach(item => {
      if (item.latestState) {
        const stateId = item.latestState.equipmentStateId;
        countByState[stateId] = (countByState[stateId] || 0) + 1;
      }
    });
    
    // Contar por modelo
    const countByModel = {};
    equipmentModels.forEach(model => {
      countByModel[model.id] = 0;
    });
    
    filteredEquipments.forEach(equipment => {
      const modelId = equipment.equipmentModelId;
      countByModel[modelId] = (countByModel[modelId] || 0) + 1;
    });
    
    return {
      total: totalEquipments,
      byState: countByState,
      byModel: countByModel
    };
  }, [filteredEquipments, filteredLatestStates, equipmentStates, equipmentModels]);

  // Função para pegar o ícone baseado no estado
  const getStateIcon = (stateId) => {
    const state = equipmentStates.find(s => s.id === stateId);
    if (!state) return <EquipmentIcon />;
    
    switch(state.name) {
      case 'Operando':
        return <OperatingIcon />;
      case 'Parado':
        return <StoppedIcon />;
      case 'Manutenção':
        return <MaintenanceIcon />;
      default:
        return <EquipmentIcon />;
    }
  };

  // Calcular a distribuição de estado para o gráfico
  const calculateStateDistribution = () => {
    const total = stats.total;
    if (total === 0) return [];
    
    return equipmentStates.map(state => {
      const count = stats.byState[state.id] || 0;
      const percentage = (count / total) * 100;
      return {
        id: state.id,
        name: state.name,
        color: state.color,
        count,
        percentage
      };
    });
  };

  const stateDistribution = calculateStateDistribution();

  return (
    <Fade in={true} timeout={500}>
      <Box>
        <Box sx={{ mb: 3, mt: 1 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Dashboard de Monitoramento
          </Typography>
          <Typography color="text.secondary" variant="body1">
            Visualize e gerencie os equipamentos de operação florestal em tempo real.
          </Typography>
        </Box>
        
        {/* Painel de filtros */}
        <FilterPanel 
          equipmentModels={equipmentModels}
          equipmentStates={equipmentStates}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        
        {/* Cards de estatísticas */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* Total de Equipamentos */}
          <Grid xs={12} sm={6} md={3}>
            <Card 
              elevation={1}
              sx={{ 
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[4]
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" fontWeight="medium">
                      Total de Equipamentos
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" sx={{ mt: 1, color: theme.palette.primary.main }}>
                      {stats.total}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      borderRadius: '0px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.palette.primary.main
                    }}
                  >
                    <EquipmentIcon fontSize="medium" />
                  </Box>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Distribuição por Modelos:
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
                    {equipmentModels.map(model => {
                      const count = stats.byModel[model.id] || 0;
                      if (count === 0) return null;
                      return (
                        <Chip 
                          key={model.id}
                          size="small"
                          label={`${model.name}: ${count}`}
                          variant="outlined"
                          sx={{ 
                            borderColor: theme.palette.primary.light,
                            backgroundColor: 'rgba(25, 118, 210, 0.04)'
                          }}
                        />
                      );
                    })}
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Cards por estado */}
          {equipmentStates.map(state => (
            <Grid xs={12} sm={6} md={3} key={state.id}>
              <Card 
                elevation={1}
                sx={{ 
                  height: '100%',
                  borderTop: `4px solid ${state.color}`,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography color="text.secondary" variant="body2" fontWeight="medium">
                        {state.name}
                      </Typography>
                      <Typography variant="h3" fontWeight="bold" sx={{ mt: 1, color: state.color }}>
                        {stats.byState[state.id] || 0}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 46,
                        height: 46,
                        backgroundColor: `${state.color}20`,
                        borderRadius: '0px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: state.color
                      }}
                    >
                      {getStateIcon(state.id)}
                    </Box>
                  </Box>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {stats.total > 0 
                        ? `Representa ${Math.round((stats.byState[state.id] || 0) / stats.total * 100)}% do total`
                        : 'Sem equipamentos'
                      }
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={stats.total > 0 ? (stats.byState[state.id] || 0) / stats.total * 100 : 0} 
                      sx={{ 
                        mt: 1, 
                        height: 6, 
                        borderRadius: 0,
                        backgroundColor: `${state.color}20`,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: state.color
                        }
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Distribuição de estados - Using Recharts Donut Chart */}
        {!isMobile && stats.total > 0 && (
          <Card sx={{ mb: 3 }}>
            <CardHeader 
              title="Distribuição de Estados" 
              titleTypographyProps={{ 
                variant: 'h6', 
                fontWeight: '600',
                fontFamily: "'Inter', sans-serif",
                color: theme.palette.mode === 'light' ? '#102A43' : '#E2E8F0'
              }}
              sx={{ pb: 1 }}
            />
            <Divider sx={{ borderColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }} />
            <CardContent sx={{ pt: 3 }}>
              <Box sx={{ height: 280, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      {stateDistribution.map((entry, index) => (
                        <linearGradient key={`gradient-${index}`} id={`gradientColor${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={alpha(entry.color, 0.9)} stopOpacity={1}/>
                          <stop offset="100%" stopColor={alpha(entry.color, 0.6)} stopOpacity={1}/>
                        </linearGradient>
                      ))}
                    </defs>
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: alpha(theme.palette.background.paper, 0.9),
                        backdropFilter: 'blur(5px)',
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: theme.shape.borderRadius,
                        boxShadow: theme.shadows[4],
                        fontFamily: "'Inter', sans-serif"
                      }}
                      itemStyle={{ color: theme.palette.text.primary }}
                      formatter={(value, name, props) => [`${value} (${props.payload.percentage.toFixed(1)}%)`, props.payload.name]}
                    />
                    <Pie
                      data={stateDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      innerRadius="65%"
                      outerRadius="90%"
                      fill="#8884d8"
                      paddingAngle={2}
                      cornerRadius={4}
                      dataKey="count"
                      stroke="none"
                    >
                      {stateDistribution.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#gradientColor${index})`} 
                          style={{ 
                            filter: `drop-shadow(0px 2px 4px ${alpha(entry.color, 0.3)})`,
                            transition: 'transform 0.3s ease, opacity 0.3s ease',
                          }}
                        />
                      ))}
                      <Label 
                        value={stats.total}
                        position="center"
                        dy={-10}
                        style={{
                          fontSize: '2rem', 
                          fontWeight: '600',
                          fontFamily: "'Inter', sans-serif",
                          fill: theme.palette.text.primary
                        }}
                      />
                      <Label 
                        value="Total"
                        position="center"
                        dy={20}
                        style={{
                          fontSize: '0.9rem',
                          fontFamily: "'Inter', sans-serif",
                          fill: theme.palette.text.secondary
                        }}
                      />
                    </Pie>
                    <Legend 
                      verticalAlign="bottom" 
                      align="center"
                      iconType="circle"
                      iconSize={10}
                      wrapperStyle={{ 
                        paddingTop: '20px',
                        fontFamily: "'Inter', sans-serif"
                      }}
                      formatter={(value, entry) => (
                        <span style={{ color: theme.palette.text.secondary, marginLeft: '5px' }}>
                          {value} ({entry.payload.percentage.toFixed(1)}%)
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        )}
        
        {/* Mapa */}
        <Card 
          elevation={2}
          sx={{ 
            mb: 3, 
            overflow: 'hidden',
            transition: 'box-shadow 0.3s',
            '&:hover': {
              boxShadow: theme.shadows[8]
            }
          }}
        >
          <CardHeader 
            title="Localização dos Equipamentos" 
            titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
            subheader={`${filteredPositions.length} equipamentos no mapa`}
          />
          <Divider />
          <Box 
            sx={{ 
              p: { xs: 1, md: 2 },
              borderRadius: theme.shape.borderRadius,
              overflow: 'hidden',
              height: '100%'
            }}
          >
            <Map 
              equipments={filteredEquipments}
              equipmentModels={equipmentModels}
              latestPositions={filteredPositions}
              latestStates={filteredLatestStates}
              equipmentStates={equipmentStates}
            />
          </Box>
        </Card>
      </Box>
    </Fade>
  );
};

export default Dashboard; 