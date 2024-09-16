import React from 'react';
import { Box, FormControl, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface FilterDateProps {
  onDateChange: (date: Dayjs | null) => void;
}

const FilterDate: React.FC<FilterDateProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <InputLabel id="date-picker-label">Data</InputLabel>
          <DatePicker
            label="Data"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <input {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
};

export default FilterDate;