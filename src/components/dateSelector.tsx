import { useState, useMemo, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, OutlinedInput, SelectChangeEvent } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';
import { IPositions } from '../interfaces/equipmentPositionHistory';

interface DateSelectorProps {
  positions: IPositions[];
  onSelect: (position: IPositions) => void;
}

export default function DateSelector({ positions, onSelect }: DateSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');

  const groupedByDate = useMemo(() => {
    const map: Record<string, IPositions[]> = {};
    positions.forEach((pos) => {
      const date = new Date(pos.date);
      const key = date.toDateString();
      if (!map[key]) map[key] = [];
      map[key].push(pos);
    });
    return map;
  }, [positions]);

  useEffect(() => {
    if (!selectedDate && Object.keys(groupedByDate).length > 0) {
      const lastKey = Object.keys(groupedByDate)[Object.keys(groupedByDate).length - 1];
      const lastDate = new Date(lastKey);
      setSelectedDate(lastDate);
    }
  }, [groupedByDate, selectedDate]);

  const availableTimes = selectedDate
    ? groupedByDate[selectedDate.toDateString()]?.map((pos) =>
        new Date(pos.date).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      ) || []
    : [];

  const handleTimeChange = (event: SelectChangeEvent) => {
    const hora = event.target.value;
    setSelectedTime(hora);

    const selectedPosition = groupedByDate[selectedDate!.toDateString()]?.find((pos) => {
      const time = new Date(pos.date).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      return time === hora;
    });

    if (selectedPosition) {
      onSelect(selectedPosition);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <div className="flex gap-4 items-end">
        <DatePicker
          label="Selecione a data"
          value={selectedDate}
          onChange={(newDate) => {
            setSelectedDate(newDate);
            setSelectedTime('');
          }}
          shouldDisableDate={(date) => !groupedByDate[date.toDateString()]}
        />
        <FormControl sx={{ minWidth: 180 }} disabled={!selectedDate}>
          <InputLabel id="time-select-label">Hora</InputLabel>
          <Select
            labelId="time-select-label"
            value={selectedTime}
            onChange={handleTimeChange}
            input={<OutlinedInput label="Hora" />}
          >
            {availableTimes.map((hora, idx) => (
              <MenuItem key={idx} value={hora}>
                {hora}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </LocalizationProvider>
  );
}
