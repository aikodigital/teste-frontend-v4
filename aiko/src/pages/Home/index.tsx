import Map from "../../components/Map";
import { Grid } from "@mui/material";
import SideMenu from "../../components/SideMenu";

export default function Home(): JSX.Element {
    return (
        <Grid container>
            <Grid xs={9}>
                <Map />
            </Grid>
            <Grid xs={3}>
                <SideMenu />
            </Grid>

        </Grid>
    )
}
