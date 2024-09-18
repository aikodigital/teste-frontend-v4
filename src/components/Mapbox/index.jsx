import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const mapboxToken = process.env.REACT_APP_API_TOKEN;


const Mapbox = () => {
    
    
    const equipments = useSelector((state) => state.equipments)
    const equipmentMarkers = equipments.filtered
    const focus = equipments.focus

    console.log(equipments)


    const [view, setView] = useState(focus);

    useEffect(() => {
        setView(focus);
    }, [focus]);

    



    return (
        
        <Map
            {...view}
            onMove={e => setView(e.view)}
            style={{ width: '100%', height: '100%',}}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={mapboxToken}
        >

            {equipmentMarkers.map( ({lastPos, lastState, name, model, id}) => (

                <div key={id}>
                    <Marker latitude={lastPos.lat} longitude={lastPos.lon}/>
                    <Popup latitude={lastPos.lat} longitude={lastPos.lon} closeOnClick={false} anchor="top" >
                        <div>
                            <h3>{name}</h3>
                            <h3>{model}</h3>
                            <h4 style={{color: lastState.color}}>{lastState.name}</h4>
                        </div>
                    </Popup>
                </div>

            ))}
        </Map>



    );
};

export default Mapbox;