import equipmentPositionHistoryData from "../../data/equipmentPositionHistory.json";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { getEquipmentLatestPosition } from "../utils/getEquipmentLatestPosition";
import { getEquipmentName } from "../utils/getEquipmentName";
import { getEquipmentLatestState } from "../utils/getEquipmentLatestState";
import { useState } from "react";
import { getEquipmentPositionHistory } from "../utils/getEquipmentPositionHistory";
import { format } from "date-fns";

export function MapLoader() {

	const [showHistory, setShowStory] = useState(false);

	return (
		<MapContainer
			className="w-full h-screen"
			center={[-19.126536, -45.947756]}
			zoom={13}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			{equipmentPositionHistoryData.map((equipment) => {
				return (
					<Marker
						key={equipment.equipmentId}
						position={getEquipmentLatestPosition(equipment.positions)}
					>
						<Popup>
							<div className="text-base font-bold">
								Nome: {getEquipmentName(equipment.equipmentId)}
							</div>
							<div className="text-base font-bold">
								Status: {getEquipmentLatestState(equipment.equipmentId).name}
							</div>

							<button
								type="button"
								id="state-history-button"
								className="items-center justify-center gap-2 rounded-lg outline-none text-zinc-50 bg-blue-950 h-10 w-full font-bold"
								onClick = {() => setShowStory(!showHistory)}
							>
								Histórico
							</button>
							{showHistory && (
								<div className="w-full h-32 gap-2 p-1 overflow-auto">
									{getEquipmentPositionHistory(equipment.equipmentId).map(history => {

										const dateObj = new Date(history.date);

										const formattedDate = format(dateObj, 'dd/MM/yyyy HH:mm:ss' )

										return(
											<div className="flex flex-col w-52 py-1">
												Data:{formattedDate}
												<div>
													Lat: {history.lat}{' '}
													Lon: {history.lon}
												</div>
											</div>
										)
									})}
								</div>
							)}
						</Popup>
					</Marker>
				);
			})}
		</MapContainer>
	);
}
