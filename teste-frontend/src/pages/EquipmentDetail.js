import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Breadcrumbs, 
  Link,
  Button,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Tooltip,
  Fade,
  useTheme,
  Avatar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import StateHistory from '../components/StateHistory';
import EquipmentStats from '../components/EquipmentStats';
import PositionHistory from '../components/PositionHistory';

// Estado ícones
import OperatingIcon from '@mui/icons-material/PlayCircleOutline';
import StoppedIcon from '@mui/icons-material/PauseCircleOutline';
import MaintenanceIcon from '@mui/icons-material/BuildCircleOutlined';

const EquipmentDetail = ({ 
  equipments, 
  equipmentModels, 
  equipmentStates, 
  positionHistory, 
  stateHistory 
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Obter informações do equipamento
  const equipment = useMemo(() => 
    equipments.find(e => e.id === id), 
  [equipments, id]);
  
  // Obter informações do modelo do equipamento
  const equipmentModel = useMemo(() => 
    equipment ? equipmentModels.find(m => m.id === equipment.equipmentModelId) : null,
  [equipment, equipmentModels]);

  // Obter o último estado do equipamento
  const lastEquipmentState = useMemo(() => {
    const equipmentStateHistory = stateHistory.find(e => e.equipmentId === id);
    if (!equipmentStateHistory || !equipmentStateHistory.states || equipmentStateHistory.states.length === 0) {
      return null;
    }
    
    // Ordenar estados por data (mais recente primeiro)
    const sortedStates = [...equipmentStateHistory.states].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    const lastStateId = sortedStates[0].equipmentStateId;
    return equipmentStates.find(s => s.id === lastStateId);
  }, [id, stateHistory, equipmentStates]);

  // Função para obter o ícone do estado
  const getStateIcon = (stateName) => {
    switch(stateName) {
      case 'Operando':
        return <OperatingIcon />;
      case 'Parado':
        return <StoppedIcon />;
      case 'Manutenção':
        return <MaintenanceIcon />;
      default:
        return null;
    }
  };
  
  // Se o equipamento não existir, mostrar mensagem
  if (!equipment) {
    return (
      <Fade in={true} timeout={500}>
        <Box>
          <Paper sx={{ p: 3, mb: 2, borderRadius: theme.shape.borderRadius, textAlign: 'center' }}>
            <Typography variant="h5" color="error" gutterBottom>
              Equipamento não encontrado
            </Typography>
            <Typography color="text.secondary" paragraph>
              O equipamento solicitado não está disponível ou não existe.
            </Typography>
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/')}
              sx={{ mt: 2 }}
            >
              Voltar para o Dashboard
            </Button>
          </Paper>
        </Box>
      </Fade>
    );
  }
  
  return (
    <Fade in={true} timeout={500}>
      <Box>
        {/* Navegação */}
        <Box sx={{ mb: 2 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              color="inherit"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              <ArrowBackIcon sx={{ mr: 0.5 }} fontSize="small" />
              Dashboard
            </Link>
            <Typography color="text.primary">{equipment.name}</Typography>
          </Breadcrumbs>
        </Box>
        
        {/* Cabeçalho */}
        <Card 
          elevation={2} 
          sx={{ 
            mb: 3, 
            overflow: 'hidden',
            borderRadius: 0,
            transition: 'box-shadow 0.3s',
            '&:hover': {
              boxShadow: theme.shadows[5]
            }
          }}
        >
          <Box 
            sx={{ 
              p: 3,
              borderBottom: lastEquipmentState ? `4px solid ${lastEquipmentState.color}` : 'none',
              background: 'linear-gradient(to right, rgba(25, 118, 210, 0.05), rgba(25, 118, 210, 0.02))',
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={7}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    sx={{ 
                      width: 60, 
                      height: 60, 
                      bgcolor: theme.palette.primary.main,
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      mr: 2,
                      boxShadow: theme.shadows[3]
                    }}
                  >
                    {equipment.name.substring(0, 2)}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {equipment.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <Typography variant="subtitle1" color="text.secondary">
                        {equipmentModel ? equipmentModel.name : 'Modelo desconhecido'}
                      </Typography>
                      {lastEquipmentState && (
                        <Chip 
                          size="small"
                          label={lastEquipmentState.name}
                          sx={{ 
                            ml: 2, 
                            bgcolor: lastEquipmentState.color,
                            color: 'white',
                            fontWeight: 'medium',
                            '& .MuiChip-icon': {
                              color: 'white'
                            }
                          }}
                          icon={getStateIcon(lastEquipmentState.name)}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={5}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                    sx={{ mr: 1 }}
                  >
                    Voltar
                  </Button>
                  
                  <Tooltip title="Compartilhar">
                    <IconButton
                      color="primary"
                      sx={{ 
                        borderRadius: '0px',
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Imprimir">
                    <IconButton
                      color="primary"
                      sx={{ 
                        borderRadius: '0px',
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <PrintIcon />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Exportar">
                    <IconButton
                      color="primary"
                      sx={{ 
                        borderRadius: '0px',
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
        
        {/* Estatísticas do Equipamento */}
        <Card 
          elevation={1} 
          sx={{ 
            mb: 3,
            transition: 'all 0.3s',
            '&:hover': {
              boxShadow: theme.shadows[4]
            }
          }}
        >
          <CardHeader 
            title="Estatísticas e Desempenho" 
            titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
          />
          <Divider />
          <CardContent>
            <EquipmentStats 
              equipmentId={id}
              equipment={equipment}
              equipmentModel={equipmentModel}
              stateHistory={stateHistory}
              equipmentStates={equipmentStates}
              equipmentModels={equipmentModels}
              equipments={equipments}
            />
          </CardContent>
        </Card>
        
        {/* Histórico de posições (trajeto) */}
        <Card 
          elevation={1} 
          sx={{ 
            mb: 3,
            transition: 'all 0.3s',
            '&:hover': {
              boxShadow: theme.shadows[4]
            }
          }}
        >
          <CardHeader 
            title="Histórico de Posições" 
            titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
            subheader="Visualize o trajeto realizado pelo equipamento ao longo do tempo"
          />
          <Divider />
          <CardContent>
            <PositionHistory 
              equipmentId={id}
              positionHistory={positionHistory}
            />
          </CardContent>
        </Card>
        
        {/* Histórico de estados */}
        <Card 
          elevation={1} 
          sx={{ 
            mb: 3,
            transition: 'all 0.3s',
            '&:hover': {
              boxShadow: theme.shadows[4]
            }
          }}
        >
          <CardHeader 
            title="Histórico de Estados" 
            titleTypographyProps={{ variant: 'h6', fontWeight: 'medium' }}
            subheader="Acompanhe as mudanças de estado do equipamento"
          />
          <Divider />
          <CardContent sx={{ p: { xs: 1, md: 2 } }}>
            <StateHistory 
              equipmentId={id}
              stateHistory={stateHistory}
              equipmentStates={equipmentStates}
            />
          </CardContent>
        </Card>
        
        <Box sx={{ mt: 4, textAlign: 'center', py: 2, color: 'text.secondary' }}>
          <Typography variant="body2">
            Sistema de Monitoramento Florestal • {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
};

export default EquipmentDetail; 