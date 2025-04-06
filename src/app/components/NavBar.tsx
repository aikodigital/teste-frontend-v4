"use client";
import { Image } from "react-bootstrap";
import { State, useEquipment } from "@/app/context/EquipmentContex";
import { useState } from "react";

export default function NavBar() {
  const { setSearchTerm, setStatusFilter, states, equipments, stateHistory } = useEquipment();
  const [searchValue, setSearchValue] = useState("");

  const handleStatusChange = (statusId: string | null) => {
    setStatusFilter(statusId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    setSearchTerm(value);
  };

  const hasEquipmentWithState = (stateId: string): boolean => {
    return equipments.some((equipment) => {
      const history = stateHistory.find(h => h.equipmentId === equipment.id)?.states || [];
      const currentStateId = history.length > 0 ? history[history.length - 1].equipmentStateId : null;
      return currentStateId === stateId;
    });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Image
          src="https://github.com/aikodigital/teste-frontend-v4/raw/master/img/aiko.png"
          alt="Aiko logo"
          width={100}
        />
        <div style={{ display: "flex", gap: "12px" }}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                style={{ color: "white" }}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filtros
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => handleStatusChange(null)}
                  >
                    Todos
                  </a>
                </li>
                {states.map((state: State) => {
                  const disabled = !hasEquipmentWithState(state.id);
                  return (
                    <li key={state.id}>
                      <a
                        className={`dropdown-item ${disabled ? "disabled text-muted" : ""}`}
                        onClick={(e) => {
                          if (disabled) {
                            e.preventDefault();
                          } else {
                            handleStatusChange(state.id);
                          }
                        }}
                        style={{
                          pointerEvents: disabled ? "none" : "auto",
                          color: disabled ? "#aaa" : "black",
                        }}
                      >
                        {state.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar equipamentos"
            value={searchValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </nav>
  );
}
