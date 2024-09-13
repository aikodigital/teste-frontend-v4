// TimeFilter.tsx
import React from "react";
import "./TimeFilter.scss";

interface TimeFilterProps {
  selectedHour: string;
  setSelectedHour: (hour: string) => void;
  selectedMinutes: string;
  setSelectedMinutes: (minutes: string) => void;
  selectedAmPm: string;
  setSelectedAmPm: (amPm: string) => void;
}

const TimeFilter: React.FC<TimeFilterProps> = ({
  selectedHour,
  setSelectedHour,
  selectedMinutes,
  setSelectedMinutes,
  selectedAmPm,
  setSelectedAmPm,
}) => {
  return (
    <div className="time-filter-container">
      <input
        type="number"
        value={selectedHour}
        onChange={(e) => setSelectedHour(e.target.value)}
        className="hour-filter"
        placeholder="Hora (1-12)"
        min="1"
        max="12"
      />
      <input
        type="number"
        value={selectedMinutes}
        onChange={(e) => setSelectedMinutes(e.target.value)}
        className="minutes-filter"
        placeholder="Minutos (0-59)"
        min="0"
        max="59"
      />
      <select
        value={selectedAmPm}
        onChange={(e) => setSelectedAmPm(e.target.value)}
        className="ampm-filter"
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

export default TimeFilter;
