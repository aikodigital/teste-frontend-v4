import type React from "react";
import { useEffect, useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	Polyline,
	ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./EquipmentMap.css";

import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { EquipmentController } from "../controllers/EquipmentController";
import {
	type Equipment,
	type EquipmentStateHistory,
	type EquipmentPositionHistory,
	EquipmentStatus,
	type EquipmentState,
} from "../models/EquipmentModel";

export const getEquipmentTypeColor = (modelName?: string) => {
	switch (modelName) {
		case "Caminhão de carga":
			return "#2196F3";
		case "Harvester":
			return "#9C27B0";
		case "Garra traçadora":
			return "#FF5722";
		default:
			return "#999";
	}
};

const getEquipmentTypeIcon = (modelName?: string) => {
	switch (modelName) {
		case "Caminhão de carga":
			return "fa-truck-moving";
		case "Harvester":
			return "fa-tractor";
		case "Garra traçadora":
			return "fa-gears";
		default:
			return "fa-question";
	}
};

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return date.toLocaleString("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		year: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});
};

const MapController = ({
	selectedPosition,
	zoom,
	shouldFly = false,
	offsetX = 0,
}: {
	selectedPosition: [number, number];
	zoom: number;
	shouldFly?: boolean;
	offsetX?: number;
}) => {
	const map = useMap();

	useEffect(() => {
		if (shouldFly) {
			if (offsetX !== 0) {
				const targetPoint = map
					.project(selectedPosition, zoom)
					.add([offsetX, 0]);
				const targetLatLng = map.unproject(targetPoint, zoom);
				map.flyTo(targetLatLng, zoom, {
					duration: 1.5,
				});
			} else {
				map.flyTo(selectedPosition, zoom, {
					duration: 1.5,
				});
			}
		}
	}, [map, selectedPosition, zoom, shouldFly, offsetX]);

	return null;
};

export const EquipmentMap: React.FC = () => {
	const equipmentController = EquipmentController.getInstance();
	const [equipments, setEquipments] = useState<Equipment[]>([]);
	const [stateHistory, setStateHistory] = useState<{
		[key: string]: EquipmentStateHistory;
	}>({});
	const [positionHistory, setPositionHistory] = useState<{
		[key: string]: EquipmentPositionHistory;
	}>({});
	const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
		null,
	);
	const [showRoute, setShowRoute] = useState(false);
	const [mapCenter, setMapCenter] = useState<[number, number]>([
		-19.126536, -45.947756,
	]);
	const [mapZoom, setMapZoom] = useState(11);
	const [searchParams] = useSearchParams();
	const equipmentId = searchParams.get("equipmentId");
	const [timelineIndex, setTimelineIndex] = useState<number>(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [playbackSpeed, setPlaybackSpeed] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const initializeData = async () => {
			await equipmentController.initialize();
			const allEquipments = await equipmentController.getEquipments();
			setEquipments(allEquipments);

			if (equipmentId) {
				const equipment = allEquipments.find((e) => e.id === equipmentId);
				if (equipment) {
					const position = equipmentController.getLatestPosition(equipment.id);
					if (position) {
						setMapCenter([position.lat, position.lon]);
						setMapZoom(13);
						setSelectedEquipment(equipment.id);
					}
				}
			}

			const stateHist: { [key: string]: EquipmentStateHistory } = {};
			const positionHist: { [key: string]: EquipmentPositionHistory } = {};

			for (const equipment of allEquipments) {
				const equipmentStateHistory =
					await equipmentController.getEquipmentStateHistory(equipment.id);
				const equipmentPositionHistory =
					await equipmentController.getEquipmentPositionHistory(equipment.id);

				if (equipmentStateHistory) {
					stateHist[equipment.id] = equipmentStateHistory;
				}
				if (equipmentPositionHistory) {
					positionHist[equipment.id] = equipmentPositionHistory;
				}
			}

			setStateHistory(stateHist);
			setPositionHistory(positionHist);
		};

		initializeData();
	}, [equipmentController, equipmentId]);

	const handleMarkerClick = (equipment: Equipment) => {
		const position = equipmentController.getLatestPosition(equipment.id);
		if (position) {
			setMapCenter([position.lat + 0.05, position.lon]);
			setMapZoom(13);
			setSelectedEquipment(equipment.id);
			setShowRoute(false);
		}
	};

	const getRoutePoints = (
		equipmentId: string,
		upToIndex?: number,
	): [number, number][] => {
		const history = positionHistory[equipmentId];
		if (!history || !history.positions) return [];

		const sortedPositions = history.positions.sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
		);

		if (typeof upToIndex === "number") {
			return sortedPositions
				.slice(0, upToIndex + 1)
				.map((pos) => [pos.lat, pos.lon]);
		}

		return sortedPositions.map((pos) => [pos.lat, pos.lon]);
	};

	const RouteControl = () => {
		if (!selectedEquipment) return null;

		const history = positionHistory[selectedEquipment];
		if (!history || !history.positions || history.positions.length === 0)
			return null;

		return (
			<div className="route-control">
				<button
					type="button"
					className={`route-button ${showRoute ? "active" : ""}`}
					onClick={() => setShowRoute(!showRoute)}
				>
					<i className="fas fa-route" />
					{showRoute ? "Ocultar Trajeto" : "Mostrar Trajeto"}
				</button>
				{showRoute && (
					<div className="route-info">
						{history.positions.length} pontos no trajeto
					</div>
				)}
			</div>
		);
	};

	const TimelineControl = () => {
		if (!selectedEquipment || !showRoute) return null;

		const history = positionHistory[selectedEquipment];
		if (!history || !history.positions || history.positions.length === 0)
			return null;

		const sortedPositions = history.positions.sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
		);

		const currentPosition = sortedPositions[timelineIndex];
		const startDate = sortedPositions[0].date;
		const endDate = sortedPositions[sortedPositions.length - 1].date;

		const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			setTimelineIndex(Number(event.target.value));
		};

		const togglePlayback = () => {
			if (timelineIndex >= sortedPositions.length - 1) {
				setTimelineIndex(0);
			}
			setIsPlaying(!isPlaying);
		};

		const adjustSpeed = () => {
			const speeds = [1, 2, 4, 8];
			const currentIndex = speeds.indexOf(playbackSpeed);
			const nextIndex = (currentIndex + 1) % speeds.length;
			setPlaybackSpeed(speeds[nextIndex]);
		};

		return (
			<div className="timeline-control">
				<div className="timeline-header">
					<div className="timeline-title">
						<i className="fas fa-clock" />
						Linha do Tempo
					</div>
					<div className="timeline-controls">
						<button
							type="button"
							className="timeline-button"
							onClick={() => setTimelineIndex(0)}
							title="Voltar ao início"
						>
							<i className="fas fa-step-backward" />
						</button>
						<button
							type="button"
							className="timeline-button"
							onClick={togglePlayback}
							title={isPlaying ? "Pausar" : "Reproduzir"}
						>
							<i className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`} />
						</button>
						<button
							type="button"
							className="timeline-button"
							onClick={adjustSpeed}
							title="Ajustar velocidade"
						>
							{playbackSpeed}x
						</button>
					</div>
				</div>

				<div className="timeline-slider">
					<input
						type="range"
						min="0"
						max={sortedPositions.length - 1}
						value={timelineIndex}
						onChange={handleSliderChange}
					/>
					<div className="timeline-info">
						<span>{formatDate(startDate)}</span>
						<span>{formatDate(endDate)}</span>
					</div>
					<div className="timeline-date">
						{formatDate(currentPosition.date)}
					</div>
				</div>
			</div>
		);
	};

	useEffect(() => {
		if (!selectedEquipment || !showRoute) return;

		const history = positionHistory[selectedEquipment];
		if (!history || !history.positions || history.positions.length === 0)
			return;

		const sortedPositions = history.positions.sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
		);

		let interval: NodeJS.Timeout;
		if (isPlaying) {
			interval = setInterval(() => {
				setTimelineIndex((prev) => {
					if (prev >= sortedPositions.length - 1) {
						setIsPlaying(false);
						return prev;
					}
					return prev + 1;
				});
			}, 1000 / playbackSpeed);
		}
		return () => clearInterval(interval);
	}, [isPlaying, playbackSpeed, selectedEquipment, showRoute, positionHistory]);

	const getMarkerIcon = (state: EquipmentState | null, modelName?: string) => {
		const typeColor = getEquipmentTypeColor(modelName);
		const stateColor = state?.color || "#999";
		const icon = getEquipmentTypeIcon(modelName);

		return L.divIcon({
			className: "custom-div-icon",
			html: `
                <div class="marker-content" style="background-color: ${stateColor}; border: 3px solid ${typeColor}; width: 32px; height: 32px; border-radius: 50%;">
                    <i class="fas ${icon}"></i>
                </div>
                ${state?.name === EquipmentStatus.OPERATING ? `<div class="marker-pulse" style="border: 2px solid ${stateColor}"></div>` : ""}
            `,
			iconSize: [40, 40],
			iconAnchor: [20, 20],
		});
	};

	const filteredEquipments = equipments.filter((equipment) => {
		const currentState = equipmentController.getCurrentState(equipment.id);

		const searchLower = searchQuery.toLowerCase();
		const matchesSearch =
			searchQuery === "" ||
			equipment.name.toLowerCase().includes(searchLower) ||
			currentState?.name.toLowerCase().includes(searchLower) ||
			false;

		return matchesSearch;
	});

	return (
		<div className="map-container">
			<div className="map-filters">
				<SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
			</div>
			<div className="map-controls">
				<RouteControl />
			</div>
			<TimelineControl />
			<MapContainer
				center={mapCenter}
				zoom={mapZoom}
				scrollWheelZoom={false}
				doubleClickZoom={true}
				style={{ height: "100%", width: "100%" }}
				zoomControl={false}
			>
				<ZoomControl position="bottomright" />
				<MapController
					selectedPosition={mapCenter}
					zoom={mapZoom}
					shouldFly={true}
					offsetX={-150}
				/>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>

				{selectedEquipment && showRoute && (
					<Polyline
						positions={getRoutePoints(selectedEquipment, timelineIndex)}
						color={getEquipmentTypeColor(
							equipmentController.getEquipmentModelById(
								equipments.find((e) => e.id === selectedEquipment)
									?.equipmentModelId || "",
							)?.name,
						)}
						weight={2.5}
						opacity={0.7}
						smoothFactor={2}
						lineJoin="round"
						lineCap="round"
						dashArray="1, 8"
					/>
				)}

				{filteredEquipments.map((equipment) => {
					const position = equipmentController.getLatestPosition(equipment.id);
					const state = equipmentController.getCurrentState(equipment.id);
					const model = equipmentController.getEquipmentModelById(
						equipment.equipmentModelId,
					);
					const productivity = equipmentController.calculateProductivity(
						equipment.id,
					);
					const earnings = equipmentController.calculateEarnings(equipment.id);
					const history = stateHistory[equipment.id];
					const positions = positionHistory[equipment.id]?.positions || [];

					if (!position) return null;

					return (
						<Marker
							key={equipment.id}
							position={[position.lat, position.lon]}
							icon={getMarkerIcon(state || null, model?.name)}
							eventHandlers={{
								click: () => handleMarkerClick(equipment),
							}}
						>
							<Popup>
								<div className="map-popup">
									<div className="popup-header">
										<i
											className={`fas ${getEquipmentTypeIcon(model?.name)}`}
											style={{ color: getEquipmentTypeColor(model?.name) }}
										/>
										<h3>{equipment.name}</h3>
									</div>
									<div className="popup-model">{model?.name}</div>

									<div
										className="popup-state"
										style={{ backgroundColor: `${state?.color}20` }}
									>
										<i
											className="fas fa-circle"
											style={{ color: state?.color }}
										/>
										<span style={{ color: state?.color }}>
											{state?.name || "Desconhecido"}
										</span>
									</div>

									<div className="popup-stats">
										<div className="popup-stat">
											<div className="popup-stat-label">Produtividade</div>
											<div className="popup-stat-value">
												<i
													className="fas fa-chart-line"
													style={{ marginRight: "4px", color: "#2ecc71" }}
												/>
												{productivity.toFixed(1)}%
											</div>
										</div>
										<div className="popup-stat">
											<div className="popup-stat-label">Ganhos</div>
											<div className="popup-stat-value">
												<i
													className="fas fa-dollar-sign"
													style={{ marginRight: "4px", color: "#3498db" }}
												/>
												R$ {earnings.toFixed(2)}
											</div>
										</div>
									</div>

									{positions.length > 0 && (
										<div className="popup-route-info">
											<i className="fas fa-map-marker-alt" />
											{positions.length} pontos de localização registrados
										</div>
									)}

									{history?.states && history.states.length > 0 && (
										<div className="popup-history">
											<div className="popup-history-title">
												<i className="fas fa-history" />
												Histórico de Estados
											</div>
											<div className="history-list">
												{history.states
													.slice()
													.reverse()
													.map((historyState) => {
														const historyStateDetails =
															equipmentController.getEquipmentStateById(
																historyState.equipmentStateId,
															);
														return (
															<div
																key={historyState.date}
																className="history-item"
															>
																<div className="history-state">
																	<i
																		className="fas fa-circle"
																		style={{
																			color: historyStateDetails?.color,
																		}}
																	/>
																	<span>
																		{historyStateDetails?.name ||
																			"Desconhecido"}
																	</span>
																</div>
																<div className="history-date">
																	{formatDate(historyState.date)}
																</div>
															</div>
														);
													})}
											</div>
										</div>
									)}
								</div>
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
};
