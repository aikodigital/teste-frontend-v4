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
        <Grid display="flex" maxHeight="100vh">
            <Grid item width="70%" >
                <Map getSelectedEquipment={getSelectedEquipment} />
            </Grid>
            <Grid item width="30%" position="relative">
                <SideMenu equipmentId={id} />
            </Grid>
        </Grid>
    )
}
