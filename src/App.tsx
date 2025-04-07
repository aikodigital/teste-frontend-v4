import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { Dashboard } from "./views/Dashboard";
import { EquipmentMap } from "./views/EquipmentMap";

function App() {
	return (
		<Router>
			<div className="App">
				<Navigation />
				<main className="App-main">
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/map" element={<EquipmentMap />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
