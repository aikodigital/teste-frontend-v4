import { useMemo } from 'react';
import { Button } from '@mui/material';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';

import { palette } from '~/styles/colors';
import { DetailsModal } from '~/components/details-modal/details.layout';
import { MapMarkers } from '~/components/marker/marker.layout';

import { Logo, MapWrapper } from './akio-equipments.styles';
import { AikoEquipmentsProperties } from './akio-equipments.types';
import { logo } from '~/assets/image-mapping';
import { EquipmentFiltersComponent } from '~/components/filter/filter.layout';

export const AikoEquipmentsLayout = ({
  tab,
  model,
  state,
  chartData,
  details,
  markers,
  historyVisible,
  filters,
  data,
  clearFilters,
  updateFilter,
  handleClose,
  handleOpen,
  handleTabChange,
  findStateNameById,
  toggleHistoryVisibility,
}: AikoEquipmentsProperties) => {
  const centerPosition: [number, number] = [-19, -46];

  const polylinePositions = useMemo<[number, number][]>(
    () =>
      markers
        .filter((marker) => marker.position?.lat && marker.position?.lon)
        .map((marker) => [marker.position.lat, marker.position.lon]),
    [markers]
  );

  const renderMarkers = (items: typeof data) =>
    items.map((equipment) => (
      <MapMarkers
        key={equipment.id}
        equipment={equipment}
        onMarkerClick={handleOpen}
      />
    ));

  const renderPolyline = () => {
    if (!historyVisible || polylinePositions.length < 2) return null;

    return (
      <Polyline
        positions={polylinePositions}
        pathOptions={{
          color: palette.secondary,
          dashArray: '10',
        }}
      />
    );
  };

  const renderToggleHistoryButton = () => {
    if (!historyVisible) return null;

    return (
      <Button
        variant='contained'
        color='error'
        onClick={toggleHistoryVisibility}
        sx={{
          position: 'absolute',
          top: 80,
          right: 16,
          zIndex: 1000,
        }}
      >
        Ocultar histórico
      </Button>
    );
  };

  return (
    <MapWrapper>
      <MapContainer center={centerPosition} zoom={12} scrollWheelZoom>
        {renderToggleHistoryButton()}
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <Logo src={logo} />
        {renderMarkers(data)}
        {renderMarkers(markers)}
        {renderPolyline()}
        <EquipmentFiltersComponent
          filters={filters}
          onChange={updateFilter}
          onClear={clearFilters}
          model={model}
          state={state}
        />
      </MapContainer>

      <DetailsModal
        tab={tab}
        open={!!details}
        details={details}
        areaChartData={chartData.areaChartData}
        pieChartData={chartData.pieChartData}
        onClose={handleClose}
        onTabChange={handleTabChange}
        findStateNameById={findStateNameById}
        toggleViewHistoryOnMap={toggleHistoryVisibility}
      />
    </MapWrapper>
  );
};
