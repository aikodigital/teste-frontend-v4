import React, { useEffect, useState } from "react";
import { HiFilter } from "react-icons/hi";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

interface EquipmentFiltersProps {
  filterState: string;
  setFilterState: (state: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  states: { id: string; name: string }[];
  clearFilters: () => void;
  records: { date: string }[]; 
}

const EquipmentFilters: React.FC<EquipmentFiltersProps> = ({
  filterState,
  setFilterState,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  states,
  clearFilters,
  records, 
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");

  const hasFilters = filterState || startDate || endDate;

  useEffect(() => {
    if (records.length > 0) {
      const dates = records.map(record => new Date(record.date));
      const min = new Date(Math.min(...dates.map(date => date.getTime())));
      const max = new Date(Math.max(...dates.map(date => date.getTime())));
      setMinDate(min.toISOString().split("T")[0]); 
      setMaxDate(max.toISOString().split("T")[0]);
    }
  }, [records]);

  useEffect(() => {
   
    if (!startDate && minDate) setStartDate(minDate);
    if (!endDate && maxDate) setEndDate(maxDate);
  }, [minDate, maxDate, startDate, endDate, setStartDate, setEndDate]);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Tippy
      content={
        <div className="flex flex-col min-w-64 space-y-4 bg-white rounded-lg p-4">
          <h2 className="text-gray-900 text-2xl border-b-2 pb-2">Filtros:</h2>
          <div className="flex flex-col space-y-2">
            <label className="flex flex-col">
              Estado:
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              >
                <option value="">Todos</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col">
              Data Inicial:
              <input
                type="date"
                value={startDate}
                min={minDate} 
                max={maxDate} 
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              />
            </label>
            <label className="flex flex-col">
              Data Final:
              <input
                type="date"
                value={endDate}
                min={minDate} 
                max={maxDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-lg p-2"
              />
            </label>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                Limpar Filtros
              </button>
            )}
          </div>
        </div>
      }
      visible={isVisible}
      onClickOutside={() => setIsVisible(false)}
      interactive={true}
      placement="bottom-end"
    >
      <button
        onClick={handleToggle}
        className="flex items-center space-x-2 p-2 bg-indigo-500 text-white rounded-lg"
      >
        <HiFilter size={24} />
        <span>Filtros</span>
      </button>
    </Tippy>
  );
};

export default EquipmentFilters;
