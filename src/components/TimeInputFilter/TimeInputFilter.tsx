import React from "react";
import styles from "./TimeInputFilter.module.scss";

interface TimeInputFilterProps {
  selectedHour: string;
  setSelectedHour: React.Dispatch<React.SetStateAction<string>>;
  selectedAmPm: string;
  setSelectedAmPm: React.Dispatch<React.SetStateAction<string>>;
}

const TimeInputFilter: React.FC<TimeInputFilterProps> = ({
  selectedHour,
  setSelectedHour,
  selectedAmPm,
  setSelectedAmPm,
}) => {
  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");

    if (value.length > 2 && value.length <= 4) {
      value = value.slice(0, 2) + ":" + value.slice(2);
    } else if (value.length > 4) {
      value = value.slice(0, 2) + ":" + value.slice(2, 4);
    }

    if (value.length <= 5) {
      setSelectedHour(value);
    }
  };

  return (
    <div className={styles.timeFilterContainer}>
      <input
        type="text"
        value={selectedHour}
        onChange={handleTimeInputChange}
        className={styles.hourFilter}
        placeholder="Hora (HH:MM)"
        maxLength={5}
      />
      <select
        value={selectedAmPm}
        onChange={(e) => setSelectedAmPm(e.target.value)}
        className={styles.ampmFilter}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

export default TimeInputFilter;
