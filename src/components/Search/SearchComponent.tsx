import React, { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { setSearchQuery, setSelectedEquipmentId } from "../../store/equipmentSlice";

//styles
import styles from "./SearchComponent.module.css";

//images 
import searchIcon from "../../assets/img/search.png";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setSearchQuery(query.trim() === "" ? null : query.trim().toLowerCase()));
    dispatch(setSelectedEquipmentId(null));
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex">
        <input
          type="text"
          placeholder="Pequisar Equipamento ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`${styles.searchInput}`}
        />
        <button
          onClick={handleSearch}
          className={`${styles.searchButton}`}
        >
          <img src={searchIcon} alt="Search" width={50} height={50} />
        </button>
      </div>

    </div>
  );
};

export default Search;
