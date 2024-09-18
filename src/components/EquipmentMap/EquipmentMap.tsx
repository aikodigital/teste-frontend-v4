import EquipmentPositionHistory from '../../data/equipmentPositionHistory.json';
import { AdvancedMarker, APIProvider, Map, Pin } from '@vis.gl/react-google-maps';
import './EquipmentMap.css';
import { IEquipment } from '../../types/equipment';
import { GiFarmTractor, GiMineTruck, GiWolverineClaws } from "react-icons/gi";

interface EquipmentMapProps {
    equipments: IEquipment[],
    setEquipmentHistory: React.Dispatch<React.SetStateAction<IEquipment | undefined>>
}

export default function EquipmentMap({ equipments, setEquipmentHistory }: EquipmentMapProps) {
    function LatestLocation() {
        return equipments.map(equipment => {
            const positionHistory = EquipmentPositionHistory.find(position => position.equipmentId === equipment.id);

            const latestPosition = positionHistory?.positions?.reduce((latest, current) => {
                return new Date(current.date) > new Date(latest.date) ? current : latest;
            }, { date: '1970-01-01T00:00:00.000Z', lat: 0, lon: 0 });

            return {
                ...equipment,
                lat: latestPosition ? latestPosition.lat : 0,
                lng: latestPosition ? latestPosition.lon : 0,
                date: latestPosition ? latestPosition.date : ''
            };
        });
    }

    function calcCentroid() {
        const locations = LatestLocation();
        const sum = locations.reduce((acc, location) => {
            return {
                lat: acc.lat + location.lat,
                lng: acc.lng + location.lng
            };
        }, { lat: 0, lng: 0 });

        const centroid = {
            lat: sum.lat / locations.length,
            lng: sum.lng / locations.length
        };

        return centroid;
    }

    return (
        <div className="row mt-3">
            <div className="col d-flex justify-content-start">
                <div className='card mapCard'>
                    <APIProvider apiKey={'AIzaSyAO35HBokUxpmFxBGdD35_A4kK-3NKo0Z0'}>
                        <Map
                            style={{ width: '100%', height: '100%' }}
                            defaultCenter={calcCentroid()}
                            defaultZoom={11}
                            gestureHandling={'cooperative'}
                            disableDefaultUI={true}
                            mapId={'b1506ac5bb5b8cb4'}
                            colorScheme='FOLLOW_SYSTEM'
                        >
                            {
                                LatestLocation().map(equipment => (
                                    < AdvancedMarker
                                        key={equipment.id}
                                        position={{ lat: equipment.lat, lng: equipment.lng }}
                                        data-bs-toggle="modal"
                                        data-bs-target="#equipmentHistory"
                                        onClick={() => setEquipmentHistory(equipment)}
                                    >
                                        <div className="row">
                                            <h6>
                                                <span data-bs-toggle="modal"
                                                    data-bs-target="#equipmentHistory"
                                                    className="badge text-bg-secondary"
                                                >
                                                    {equipment.name}
                                                </span>
                                            </h6>
                                        </div>
                                        <div className="row">
                                            {equipment.equipmentModelId === 'a3540227-2f0e-4362-9517-92f41dabbfdf' ?
                                                <GiMineTruck id={`${equipment.id}icon`}
                                                    size={'3rem'}
                                                    color={equipment.state.color}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#equipmentHistory"
                                                />
                                                : equipment.equipmentModelId === 'a4b0c114-acd8-4151-9449-7d12ab9bf40f' ?
                                                    <GiFarmTractor
                                                        size={'3rem'}
                                                        color={equipment.state.color}
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#equipmentHistory"
                                                    />
                                                    : equipment.equipmentModelId === '9c3d009e-0d42-4a6e-9036-193e9bca3199' ?
                                                        <GiWolverineClaws
                                                            size={'3rem'}
                                                            color={equipment.state.color}
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#equipmentHistory"
                                                        />
                                                        : null}
                                        </div>
                                    </AdvancedMarker>
                                ))
                            }
                        </Map>
                    </APIProvider>
                </div>
            </div>
        </div >
    );
}
