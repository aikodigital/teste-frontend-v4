import Map from "../../components/Map";
import { Grid } from "@mui/material";
import SideMenu from "../../components/SideMenu";
import { useEffect, useState } from "react";

export default function Home(): JSX.Element {
    const [id, setId] = useState("")

    function getSelectedEquipment() {
        setId(window.location.pathname.replace("/", ""))
    }

    useEffect(getSelectedEquipment, [])

    return (
        <Grid container>
            <Grid item xs={9}>
                <Map getSelectedEquipment={getSelectedEquipment} />
            </Grid>
            <Grid item xs={3}>
                <SideMenu equipmentId={id} />
            </Grid>

        </Grid>
    )
}
