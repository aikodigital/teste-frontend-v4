import { useCallback, useEffect, useState } from "react";
import type { Equipment } from "../models/EquipmentModel";
import { EquipmentController } from "../controllers/EquipmentController";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";

type EquipmentStatusCount = {
	operating: number;
	maintenance: number;
	stopped: number;
};

export const Dashboard: React.FC = () => {
	const [equipments, setEquipments] = useState<Equipment[]>([]);
	const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([]);
	const [statusCount, setStatusCount] = useState<EquipmentStatusCount>({
		operating: 0,
		maintenance: 0,
		stopped: 0,
	});
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilter, setActiveFilter] = useState<string | null>(null);

	const equipmentController = EquipmentController.getInstance();
	const navigate = useNavigate();

	const getEquipmentTypeColor = (modelName?: string) => {
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

	const updateStatusCount = useCallback(
		(equipmentList: Equipment[]) => {
			const counts = {
				operating: 0,
				maintenance: 0,
				stopped: 0,
			};

			for (const equipment of equipmentList) {
				const state = equipmentController.getCurrentState(equipment.id);
				switch (state?.name) {
					case "Operando":
						counts.operating++;
						break;
					case "Manutenção":
						counts.maintenance++;
						break;
					case "Parado":
						counts.stopped++;
						break;
				}
			}

			setStatusCount(counts as EquipmentStatusCount);
		},
		[equipmentController],
	);

	useEffect(() => {
		const initializeData = async () => {
			await equipmentController.initialize();
			const allEquipments = await equipmentController.getEquipments();
			setEquipments(allEquipments);
			setFilteredEquipments(allEquipments);
			updateStatusCount(allEquipments);
		};

		initializeData();
	}, [equipmentController, updateStatusCount]);

	useEffect(() => {
		if (activeFilter) {
			const filtered = equipments.filter((equipment) => {
				const state = equipmentController.getCurrentState(equipment.id);
				return state?.name === activeFilter;
			});
			setFilteredEquipments(filtered);
		} else {
			setFilteredEquipments(equipments);
		}
		updateStatusCount(equipments);
	}, [activeFilter, equipments, equipmentController, updateStatusCount]);

	useEffect(() => {
		if (!searchQuery.trim()) {
			if (activeFilter) {
				const filtered = equipments.filter((equipment) => {
					const state = equipmentController.getCurrentState(equipment.id);
					return state?.name === activeFilter;
				});
				setFilteredEquipments(filtered);
			} else {
				setFilteredEquipments(equipments);
			}
			return;
		}

		const query = searchQuery.toLowerCase().trim();
		let results = equipments.filter((equipment) => {
			const model = equipmentController.getEquipmentModelById(
				equipment.equipmentModelId,
			);
			const state = equipmentController.getCurrentState(equipment.id);

			return (
				equipment.name.toLowerCase().includes(query) ||
				model?.name?.toLowerCase().includes(query) ||
				false ||
				state?.name?.toLowerCase().includes(query) ||
				false
			);
		});

		if (activeFilter) {
			results = results.filter((equipment) => {
				const state = equipmentController.getCurrentState(equipment.id);
				return state?.name === activeFilter;
			});
		}

		setFilteredEquipments(results);
	}, [searchQuery, equipments, activeFilter, equipmentController]);

	const handleFilterClick = (stateName: string) => {
		if (activeFilter === stateName) {
			setActiveFilter(null);
		} else {
			setActiveFilter(stateName);
		}
	};

	const getStatusCard = (
		title: string,
		count: number,
		color: string,
		icon: string,
	) => {
		const isActive = activeFilter === title;
		return (
			<div className={`status-card ${isActive ? "active" : ""}`}>
				<div className="status-header" style={{ color }}>
					<i className={`fas ${icon}`} />
					<span>{count}</span>
				</div>
				<div className="status-title">{title}</div>
				{}

				<button
					type="button"
					className="status-more"
					style={{ color }}
					onClick={(e) => {
						e.preventDefault();
						handleFilterClick(title);
					}}
				>
					{isActive ? (
						<>
							Limpar filtro <i className="fas fa-filter-circle-xmark" />
						</>
					) : (
						<>
							Filtrar equipamentos <i className="fas fa-filter" />
						</>
					)}
				</button>
			</div>
		);
	};

	const handleEquipmentClick = (equipment: Equipment) => {
		navigate(`/map?equipmentId=${equipment.id}`);
	};

	return (
		<div className="dashboard">
			<div className="dashboard-header">
				<h1>Dashboard</h1>
			</div>

			<SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

			<div className="status-cards">
				{getStatusCard(
					"Operando",
					statusCount.operating,
					"#2ecc71",
					"fa-check-circle",
				)}
				{getStatusCard(
					"Manutenção",
					statusCount.maintenance,
					"#e74c3c",
					"fa-wrench",
				)}
				{getStatusCard(
					"Parado",
					statusCount.stopped,
					"#f1c40f",
					"fa-pause-circle",
				)}
			</div>

			<div className="equipment-list">
				{filteredEquipments.map((equipment) => {
					const state = equipmentController.getCurrentState(equipment.id);
					const model = equipmentController.getEquipmentModelById(
						equipment.equipmentModelId,
					);
					const productivity = equipmentController.calculateProductivity(
						equipment.id,
					);
					const typeColor = getEquipmentTypeColor(model?.name);
					const typeIcon = getEquipmentTypeIcon(model?.name);

					return (
						<div
							key={equipment.id}
							className="equipment-card"
							onClick={() => handleEquipmentClick(equipment)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									handleEquipmentClick(equipment);
									e.preventDefault();
								}
							}}
							style={{
								cursor: "pointer",
								borderLeft: `4px solid ${typeColor}`,
							}}
						>
							<div className="equipment-header">
								<div className="equipment-title">
									<i
										className={`fas ${typeIcon}`}
										style={{ color: typeColor, marginRight: "8px" }}
									/>
									<h3>{equipment.name}</h3>
								</div>
								<span className="equipment-model">{model?.name}</span>
							</div>

							<div className="equipment-stats">
								<div className="stat">
									<i className="fas fa-thermometer-half" />
									<span>Produtividade: {productivity.toFixed(1)}%</span>
								</div>
								<div className="stat">
									<i
										className="fas fa-circle"
										style={{ color: state?.color }}
									/>
									<span>Estado: {state?.name || "Desconhecido"}</span>
								</div>
							</div>

							<div className="equipment-alerts">
								{state?.name === "Parado" && (
									<div className="alert">
										<i className="fas fa-clock" />
										Downtime (15)
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
