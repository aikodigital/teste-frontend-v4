import type React from "react";
import "./SearchBar.css";

interface SearchBarProps {
	searchQuery: string;
	onSearchChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
	searchQuery,
	onSearchChange,
}: SearchBarProps) => {
	return (
		<div className="search-bar">
			<input
				type="text"
				placeholder="Buscar por nome, status..."
				value={searchQuery}
				onChange={(e) => onSearchChange(e.target.value)}
				className="search-input"
			/>
		</div>
	);
};
