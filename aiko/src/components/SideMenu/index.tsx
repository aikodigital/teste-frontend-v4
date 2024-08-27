import logo from '../../assets/aiko.png'
import { Grid, List, ListItem, ListItemButton } from "@mui/material"
import equipmentsStateHistoryServices from "../../services/equipmentsStateHistoryServices"

interface ISideMenu {
    equipmentId: string
}

export default function SideMenu({ equipmentId }: ISideMenu): JSX.Element {
    const { getEquipmentsStateHistoryById } = equipmentsStateHistoryServices()

    const equipmentStateHistoryById = getEquipmentsStateHistoryById(equipmentId)

    const formattedData = equipmentStateHistoryById?.states.map(e => {
        return {
            id: e.equipmentStateId,
            date: e.date,
        }
    })

    return (
        <>
            <Grid container display="flex" justifyContent="center" alignItems="center" rowSpacing={3}>
                <Grid item id="logo">
                    <img src={logo} alt="logotipo da Aiko" />
                </Grid>
                <Grid item id="title">
                    <h1>Sistema de Gestão</h1>
                </Grid>
            </Grid>
            <Grid container >
                <Grid item xs={12}  >
                    <List sx={{ overflow: 'auto' }}>
                        {formattedData?.sort().reverse().map((e) =>
                            <ListItem>
                                <ListItemButton>
                                    {e.date}
                                </ListItemButton>
                            </ListItem>)}

                    </List>
                </Grid>
            </Grid>
        </>
    )
}