import type React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navigation: React.FC = () => {
	const location = useLocation();

	return (
		<nav className="navigation">
			<div className="nav-logo">
				<img src="./img/aiko.png" alt="logo" className="logo" />
			</div>
			<div className="nav-items">
				<Link
					to={"/"}
					className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
				>
					<i className="fas fa-chart-bar" />
					Dashboard
				</Link>
				<Link
					to={"/map"}
					className={`nav-item ${location.pathname === "/map" ? "active" : ""}`}
				>
					<i className="fas fa-map-marker-alt" />
					Mapa
				</Link>
			</div>
		</nav>
	);
};
