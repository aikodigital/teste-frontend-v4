import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { forwardRef } from 'react';
import { Fragment } from 'react';
import { Button } from '@mui/material';
import styles from './historyTable.module.css'
import { useEquipmentsContext } from '@/app/context/equipmentsContext';
import CloseIcon from '@mui/icons-material/Close';
import { setFilteredHistory } from '../../../../store/slices/equipmentStateHistorySlice';

export default function HistoryTable() {
    const filteredHistory = useSelector((state) => state.equipmentStateHistory.filteredHistory);
    const equipmentLatestHistory = useSelector((state) => state.equipmentPositionHistory.equipmentLatestHistory)
    const { setEquipmentsMapMarkers, setGainProductivity } = useEquipmentsContext()
    const dispatch = useDispatch();

    const handleTrajeto = () => {
        setEquipmentsMapMarkers(filteredHistory)
    }

    const handleClose = () => {
        dispatch(setFilteredHistory([]))
        setEquipmentsMapMarkers(equipmentLatestHistory)
        setGainProductivity(null)
    }

    return (
        <div className={styles.historyContainer}>
            {filteredHistory.length > 0 && <>
                <Paper sx={{ height: 600, width: 350, position: 'relative' }}>
                    <CloseIcon
                        sx={{ position: 'absolute', left: '88%', top: '1%', cursor: 'pointer', zIndex: 3 }}
                        onClick={handleClose}
                    />
                    <TableVirtuoso
                        data={filteredHistory}
                        components={{
                            Table: (props) => (
                                <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
                            ),
                            Scroller: forwardRef((props, ref) => <div {...props} ref={ref} />),

                            TableBody: forwardRef((props, ref) => <tbody {...props} ref={ref} />),
                            TableRow: forwardRef((props, ref) => <TableRow {...props} ref={ref} />)
                        }}

                        fixedHeaderContent={() => (
                            <>
                                <TableRow sx={{ background: 'white' }}>
                                    <TableCell colSpan={2} sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                        {filteredHistory.length > 0 ? (
                                            <>ID do Equipamento: <br />
                                                {filteredHistory[0].equipmentId}
                                            </>
                                        ) : 'Sem Dados'}
                                    </TableCell>
                                </TableRow>
                                <TableRow sx={{ background: 'white' }}>
                                    <TableCell sx={{ width: '60%', fontWeight: 'bold' }}>Data</TableCell>
                                    <TableCell sx={{ width: '40%', fontWeight: 'bold' }}>Estado</TableCell>
                                </TableRow>
                            </>
                        )}
                        itemContent={(index, history) => (
                            <Fragment>
                                <TableCell sx={{ width: '60%' }}>{format(new Date(history.date), "dd/MM/yyyy HH:mm")}</TableCell>
                                <TableCell sx={{ width: '40%', color: `${history.stateColor}` }}>{history.stateName}</TableCell>
                            </Fragment>
                        )}
                    />
                </Paper>
                <Button
                    variant='contained'
                    sx={{ backgroundColor: '#6a60e8' }}
                    onClick={handleTrajeto}
                >Mostrar trajetória</Button>
            </>}

        </div >
    );
}
