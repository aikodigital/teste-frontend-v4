/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getMarkerIcon, fetchData, calculateProductivity, filteredEquipments} from '../utils/utils';
import { useEquipmentState } from './../utils/useEquipmentState';
import Map from '../components/map';
import Filtered from '../components/filtered';
import Informs from '../components/Informs';
import "../index.css"
const containerStyle = {
  width: '60vw',
  height: '60vh',
};

const Home: React.FC = () => {
  const {
    equipments,
    setEquipments,
    selectedEquipment,
    setSelectedEquipment,
    setEquipmentModels,
    equipmentStates,
    setEquipmentStates,
    selectedStateFilter,
    setSelectedStateFilter,
    selectedDate,
    setSelectedDate,
    availableDates,
    setAvailableDates,
    selectedEquipmentFilter,
    setSelectedEquipmentFilter
  } = useEquipmentState();
 

  useEffect(() => {
    const loadData = async () => {
      const { updatedEquipments, modelData, stateData, allDates,   } = await fetchData();

      setEquipments(updatedEquipments);
      setEquipmentModels(modelData);
      setEquipmentStates(stateData);
      setAvailableDates(allDates);
    };

     loadData();
  }, [setEquipments, setEquipmentModels, setEquipmentStates, setAvailableDates]);

 
  const handleMarkerClick = (equipment: string) => {
    setSelectedEquipment(equipment);
  };

  
  return (
    <div id="centralizar" >
      <Filtered equipments={equipments} equipmentStates={equipmentStates} availableDates={availableDates} setSelectedDate={setSelectedDate} setSelectedStateFilter={setSelectedStateFilter} setSelectedEquipmentFilter={setSelectedEquipmentFilter} selectedEquipmentFilter={selectedEquipmentFilter} selectedDate={selectedDate} selectedStateFilter={ selectedStateFilter} />

      <LoadScript googleMapsApiKey="AIzaSyBr3TmOoj3mKGAISSETNPIsBXh7WoVnew8">
        <GoogleMap mapContainerStyle={containerStyle} center={{ lat: -19.126536, lng: -45.947756 }} zoom={13}>
        {filteredEquipments(equipments, selectedEquipmentFilter, selectedStateFilter, selectedDate).map((equipment: any, index: number) => (
          <Marker
            key={index}
            position={{ lat: equipment.lastPosition.lat, lng: equipment.lastPosition.lon }}
            title={`${equipment.name} - ${equipment.model}`}
            onClick={() => handleMarkerClick(equipment)}
            icon={getMarkerIcon(equipment)}
          />
        ))}

          {selectedEquipment && (
            <InfoWindow
              position={{ lat: selectedEquipment.lastPosition.lat, lng: selectedEquipment.lastPosition.lon }}
              onCloseClick={() => setSelectedEquipment(null)}
            >
              <Map selectedEquipment={selectedEquipment} />
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
 
      <Informs 
        equipments={equipments} 
        selectedEquipmentFilter={selectedEquipmentFilter} 
        selectedStateFilter={selectedStateFilter} 
        filteredEquipments={filteredEquipments} 
        selectedDate={selectedDate} 
        calculateProductivity={calculateProductivity} 
        />
        </div>
  );
};

export default Home;
