import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Button } from '@mui/material';
import { selectFilterStateModel } from '../../../../store/selectors/selectFilterStateModel';
import { setFilteredStateModel } from '../../../../store/slices/equipmentStateHistorySlice';

export default function StateModelFilter() {
    const states = useSelector((state) => state.equipmentState.data)
    const models = useSelector((state) => state.equipmentModel.data)
    const equipmentLatestHistory = useSelector((state) => state.equipmentPositionHistory.equipmentLatestHistory)
    const [selectedState, setSelectedState] = useState('')
    const [selectedModel, setSelectedModel] = useState('')
    const dispatch = useDispatch();

    const handleChangeState = (event) => {
        setSelectedState(event.target.value);
        dispatch(setFilteredStateModel(selectFilterStateModel(event.target.value, selectedModel)({
            equipmentPositionHistory: { equipmentLatestHistory }
        })))
    };

    const handleChangeModel = (event) => {
        setSelectedModel(event.target.value);
        dispatch(setFilteredStateModel(selectFilterStateModel(selectedState, event.target.value)({
            equipmentPositionHistory: { equipmentLatestHistory }
        })))
    };

    const handleClear = () => {
        setSelectedModel('')
        setSelectedState('')
        dispatch(setFilteredStateModel(null))
    }

    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl fullWidth sx={{ width: 140 }} >
                <InputLabel

                    sx={{
                        color: 'white',
                    }}
                >Estado</InputLabel>
                <Select
                    value={selectedState}
                    label="Estado"
                    onChange={handleChangeState}
                    variant='outlined'
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '& .MuiInputBase-input': {
                            backgroundColor: 'black',
                            color: 'white',
                        },
                    }}
                >
                    {states.map(state => (
                        <MenuItem value={state.id} key={state.id}>{state.name}</MenuItem>
                    ))}

                </Select>
            </FormControl>

            <FormControl fullWidth sx={{ minWidth: 140, maxWidth: 'min-content' }} >
                <InputLabel

                    sx={{
                        color: 'white',
                    }}
                >Modelo</InputLabel>
                <Select
                    value={selectedModel}
                    label="Model"
                    onChange={handleChangeModel}
                    variant='outlined'
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '& .MuiInputBase-input': {
                            backgroundColor: 'black',
                            color: 'white',
                        },
                    }}
                >
                    {models.map(model => (
                        <MenuItem value={model.id} key={model.id}>{model.name}</MenuItem>
                    ))}

                </Select>
            </FormControl>
            <Button
                variant='outlined'
                sx={{
                    height: '45px',
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                        borderColor: '#f0f8ffe7',
                        color: '#f0f8ffe7',
                    }
                }}
                onClick={handleClear}
            >Limpar</Button>
        </Box >
    );
}
