import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { forwardRef } from 'react';
import { Fragment } from 'react';

export default function HistoryTable() {
    const filteredHistory = useSelector((state) => state.equipmentStateHistory.filteredHistory);

    return (
        <>
            {filteredHistory.length > 0 && <Paper sx={{ height: 600, width: 350 }}>
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
            </Paper>}
        </>
    );
}
