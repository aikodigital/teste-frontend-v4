import logo from '../../assets/aiko.png'
import marker from 'leaflet/dist/images/marker-icon.png'
import equipmentsStateHistoryServices from "../../services/equipmentsStateHistoryServices"
import { Grid, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography } from "@mui/material"
import equipmentServices from '../../services/equipment'
import equipmentsStateServices from '../../services/equipmentsStateServices'


interface ISideMenu {
    equipmentId: string
}

export default function SideMenu({ equipmentId }: ISideMenu): JSX.Element {
    const { getEquipmentsById } = equipmentServices()
    const { getEquipmentsStateById } = equipmentsStateServices()
    const { getEquipmentsStateHistoryById } = equipmentsStateHistoryServices()

    const equipment = getEquipmentsById(equipmentId)
    const equipmentStateHistoryById = getEquipmentsStateHistoryById(equipmentId)


    const formattedData = equipmentStateHistoryById?.states.map(e => {
        const status = getEquipmentsStateById(e.equipmentStateId)

        return {
            id: e.equipmentStateId,
            date: e.date,
            status,
        }
    })

    return (
        <Grid overflow="auto" maxHeight="100%">
            <Grid display="flex" flex="1" justifyContent="center" alignItems="center" rowSpacing={3}>
                <Grid item id="logo">
                    <img src={logo} alt="logotipo da Aiko" />
                </Grid>
            </Grid>
            <List sx={{ width: '100%' }}>
                <ListSubheader>
                    Histórico {equipment?.name}
                </ListSubheader>
                {formattedData?.sort().reverse().map(e =>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <img alt="imagem do marcador" src={marker} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography sx={{ color: e?.status?.color }}>
                                    {e.status?.name}
                                </Typography>}
                            secondary={
                                <Typography
                                    component="span"
                                    variant="body2"
                                >
                                    {new Date(e.date).toLocaleString()}
                                </Typography>
                            } />
                    </ListItem>
                )}
            </List>
        </Grid>
    )
}