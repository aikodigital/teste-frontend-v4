import React, { useState, useEffect, useContext, useCallback } from 'react';import data from '../data/dataHandler';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import DataContext from '../data/DataContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


import 'bootstrap-icons/font/bootstrap-icons.css';


const Filter = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedModels, setSelectedModels] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [modalData, setModalData] = useState(null); // Estado para armazenar os dados do modal
    const { filteredData, setFilteredData } = useContext(DataContext);

    const models = Array.from(new Set(data().map(equip => equip.model.name)));
    const statuses = Array.from(new Set(data().map(equip => equip.lastState.name)));

    const filterData = useCallback(() => {
        const filtered = data().filter(equip => {
            const matchName = equip.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchId = equip.id.slice(-12).toLowerCase().includes(searchTerm.toLowerCase());
            const matchModel = selectedModels.length === 0 || selectedModels.includes(equip.model.name);
            const matchStatus = selectedStatuses.length === 0 || selectedStatuses.includes(equip.lastState.name);

            return (matchName || matchId) && matchModel && matchStatus;
        });

        setFilteredData(filtered);
    }, [searchTerm, selectedModels, selectedStatuses, setFilteredData]);

    useEffect(() => {
        filterData();
    }, [filterData]);


    const customIcon = L.divIcon({
        className: 'custom-icon',
        html: '<i class="bi bi-geo-alt-fill" style="font-size:24px;"></i>',
        iconSize: [25, 35],
        popupAnchor: [0, -15],
    });
    
    function formatDate(isoDate) {
        const date = new Date(isoDate);
      
        const dia = date.getDate().toString().padStart(2, '0');
        const mes = (date.getMonth() + 1).toString().padStart(2, '0');
        const ano = date.getFullYear();   
      
        const hora = date.getHours().toString().padStart(2, '0');
        const minuto = date.getMinutes().toString().padStart(2,   
       '0');

        return `${dia}/${mes}/${ano} - ${hora}:${minuto}`;
    }

    const handleModelChange = (model) => {
        setSelectedModels(prev => 
            prev.includes(model) ? prev.filter(m => m !== model) : [...prev, model]
        );
    };

    const handleStatusChange = (status) => {
        setSelectedStatuses(prev => 
            prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
        );
    };

    const handleCardClick = (equip) => {
        setModalData(equip);
    };
    const closeModal = () => {
        setModalData(null); 
    };

    const renderModal = () => {
        if (!modalData) return null;

        return (
            <div className='modal-overlay' onClick={closeModal}>
                <div className='modal-container' onClick={(e) => e.stopPropagation()}>
                    <div className='modal-header'>
                    <div className='modal-header-title'>
                        <h2 className='modal-title'>{modalData.name}</h2>
                        <h3 className='modal-subtitle'>ID: {modalData.id}</h3>
                    </div>
                        <span className='modal-closer bi-x-circle-fill' onClick={closeModal}></span>
                    </div>

                    <div className='modal-body'>
                        <div className='modal-info'>

                            <div className='modal-body-header'>
                                <p>Modelo: {modalData.model.name}</p>
                                <p>Ultimo estado: {modalData.lastState.name}</p>
                            </div>

                            <div className='modal-map-container'>

                                <MapContainer center={[modalData.positionHistory[0].lat, modalData.positionHistory[0].lon]} zoom={11} id='mapContainer'>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    {modalData.positionHistory.map((position, index) => (
                                        <Marker key={index} position={[position.lat, position.lon]} icon={customIcon}>
                                            <Popup>
                                                    {formatDate(position.date)}
                                            </Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>

                            </div>


                            <h2>Histórico de estados:</h2>
                            <div className='stateHistory'>
                                {modalData.stateHistory.map((history, index) => (
                                    <div key={index} className='modal-body-state'>
                                        <p>Data: {formatDate(history.date)}</p>
                                        <p>Status: {history.stateName}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
        );
    };

    const popover = (
        <Popover id="popover-filter" className='p-0'>
            <Popover.Header as="h3">Filtros</Popover.Header>
            <Popover.Body className='d-flex flex-column'>
                <div className='popover-row'>
                    <label className='title-label'>Por modelo:</label>
                    {models.map((model, index) => (
                        <div key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="model"
                                    value={model}
                                    onChange={() => handleModelChange(model)}
                                    checked={selectedModels.includes(model)}
                                /> {model}
                            </label>
                        </div>
                    ))}
                </div>

                <div id='popover-line' />

                <div className='popover-row'>
                    <label className='title-label'>Por Status:</label>
                    {statuses.map((status, index) => (
                        <div key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="status"
                                    value={status}
                                    onChange={() => handleStatusChange(status)}
                                    checked={selectedStatuses.includes(status)}
                                /> {status}
                            </label>
                        </div>
                    ))}
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <div id="filter" className='rounded-start container'>
            <div id='search'>
                <input
                    type='text'
                    id='searchField'
                    placeholder='Digite o nome ou o ID do equipamento...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div id="filterButtonContainer">
                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                    <Button id='filterButton'>Filtrar</Button>
                </OverlayTrigger>
            </div>

            <div id='equipmentList'>
                {filteredData.length === 0 ? (
                    <div id='noCardContainer'>
                        <span id="noCardFound" className='text-center'>
                            Nenhum equipamento foi encontrado! Por favor, tente novamente com outra pesquisa ou com outras opções de filtragem.
                        </span>
                    </div>
                ) : (
                    <div className='equipmentCardContainer'>
                        {filteredData.map((equip, index) => (
                            <div
                                className='equipmentCard'
                                id={`equipmentCard${index}`}
                                key={equip.id}
                                onClick={() => handleCardClick(equip)}
                            >
                                <div className='equipmentCard-col-1'>
                                    <div className='equipmentCard-row-1'>
                                        <span id={`equipmentCard${index}Name`}>Nome: {equip.name}</span>
                                    </div>
                                    <div className='equipmentCard-row-2'>
                                        <span id={`equipmentCard${index}Id`}>ID: {equip.id.slice(-12)}</span>
                                    </div>
                                    <div className='equipmentCard-row-3'>
                                        <span id={`equipmentCard${index}Model`}>Modelo: {equip.model.name}</span>
                                    </div>
                                </div>
                                <div className='equipmentCard-col-2'>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-${index}`}>{equip.lastState.name}</Tooltip>}
                                    >
                                        <span
                                            className='statusCircle'
                                            id={`statusCircle${index}`}
                                            style={{ backgroundColor: `${equip.lastState.color}` }}
                                            data-status={equip.lastState.name}
                                        />
                                    </OverlayTrigger>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {renderModal()}
        </div>
    );
};

export default Filter;
