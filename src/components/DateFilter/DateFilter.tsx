import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateFilterProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  filterData: (date: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  selectedDate,
  setSelectedDate,
  filterData,
}) => {
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = formatDateToMMDDYYYY(date);
      setSelectedDate(formattedDate);
      filterData(formattedDate);
    } else {
      setSelectedDate("");
      filterData("");
    }
  };

  const formatDateToMMDDYYYY = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const formatDateForPicker = (date: Date | null): Date | null => {
    return date
      ? new Date(date.getFullYear(), date.getMonth(), date.getDate())
      : null;
  };

  return (
    <div className="dateInputContainer">
      <h4>Filtrar Data:</h4>
      <DatePicker
        selected={formatDateForPicker(selectedDate ? new Date(selectedDate) : null)}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy" // Usa o formato correto
        placeholderText="mm/dd/yyyy"
        className="date-filter"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15}
        showMonthDropdown
        isClearable
      />
    </div>
  );
};

export default DateFilter;
