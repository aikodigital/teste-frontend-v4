import {
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { ReactElement } from 'react';
import { EquipmentDetails } from '~/hooks/use-equipment-details';
import { AreaChartComponent, AreaChartData } from '../recharts/area.rechart';
import { PieChartComponent, PieChartData } from '../recharts/pie.rechart';
import {
  ClearButton,
  Col,
  Dialog,
  InfoBox,
  Item,
  ListItem,
  Row,
  SectionSubtitle,
  SectionTitle,
  Subtitle,
  TextField,
  ViewHistoryButton,
} from './details.styles';

interface DetailsModalProperties {
  open: boolean;
  tab: number;
  selectedDate: string;
  details?: EquipmentDetails;
  pieChartData: PieChartData[];
  areaChartData: AreaChartData[];
  findStateNameById: (stateId: string) => string;
  onClose: () => void;
  onTabChange: (tab: number) => void;
  toggleViewHistoryOnMap: () => void;
  handleDateChange: (date: string) => void;
}

export const DetailsModal = ({
  open,
  tab,
  details,
  pieChartData,
  areaChartData,
  selectedDate,
  findStateNameById,
  onClose,
  onTabChange,
  toggleViewHistoryOnMap,
  handleDateChange,
}: DetailsModalProperties) => {
  const renderItem = (label: string, value?: string | number) => (
    <Item>
      <strong>{label}:</strong> {value || '—'}
    </Item>
  );

  const renderStateItem = (date: string, name: string, stateId: string) => (
    <ListItem key={stateId}>
      <ListItemText
        primary={<Subtitle>{new Date(date).toLocaleString('pt-BR')}</Subtitle>}
        secondary={
          <>
            {renderItem('Estado', name)}
            {renderItem('ID do Estado', stateId)}
          </>
        }
      />
    </ListItem>
  );

  const renderHeader = (details: EquipmentDetails) => (
    <InfoBox>
      <Row>
        <Col>
          <SectionTitle>Informações do Equipamento</SectionTitle>
          {renderItem('ID', details.id)}
          {renderItem('Nome', details.name)}
          {renderItem('Modelo', details.model?.name)}
          {renderItem('ID do Modelo', details.model?.id)}
        </Col>
        <ViewHistoryButton
          onClick={() => {
            onClose();
            toggleViewHistoryOnMap();
          }}
        >
          Ver histórico no mapa
        </ViewHistoryButton>
      </Row>
    </InfoBox>
  );

  const renderStatesHistory = (details: EquipmentDetails) => (
    <>
      <SectionTitle>Histórico de Estados</SectionTitle>
      {details.states.length > 0 ? (
        <List>
          {details.states.map((state, index) => (
            <>
              {renderStateItem(
                state.date,
                findStateNameById(state.equipmentStateId),
                state.equipmentStateId
              )}
              {index < details.states.length - 1 && <Divider />}
            </>
          ))}
        </List>
      ) : (
        <Typography>Sem histórico disponível.</Typography>
      )}
    </>
  );

  const renderPieChart = () => (
    <>
      <SectionSubtitle>Análise de Produtividade</SectionSubtitle>
      <PieChartComponent data={pieChartData} />
    </>
  );

  const renderAreaChart = () => (
    <>
      <SectionSubtitle>Análise de evolução da produtividade</SectionSubtitle>
      <AreaChartComponent data={areaChartData} />
    </>
  );

  const renderProductivity = () => (
    <>
      <SectionTitle>Produtividade</SectionTitle>
      <Row style={{ marginTop: 16, justifyContent: 'normal', gap: 16 }}>
        <TextField
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          label='Filtrar por Data'
          placeholder='dd/mm/aaaa'
          inputProps={{
            type: 'date',
            min: details?.states[0].date,
            max: details?.states[details?.states.length - 1].date,
          }}
        />
        <ClearButton
          disabled={!selectedDate}
          onClick={() => handleDateChange('')}
        >
          Limpar Filtros
        </ClearButton>
      </Row>
      <List>
        {renderPieChart()}
        {renderAreaChart()}
      </List>
    </>
  );

  const renderContent = (details: EquipmentDetails) => {
    const content: { [key: number]: ReactElement } = {
      0: renderStatesHistory(details),
      1: renderProductivity(),
    };

    return content[tab] || null;
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      {details && (
        <>
          <DialogTitle>Detalhes do Equipamento</DialogTitle>
          <Tabs
            value={tab}
            onChange={(_, newIndex) => onTabChange(newIndex)}
            centered
          >
            <Tab label='Informações e Histórico' />
            <Tab label='Produtividade' />
          </Tabs>
          <DialogContent dividers>
            {renderHeader(details)}
            {renderContent(details)}
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};
