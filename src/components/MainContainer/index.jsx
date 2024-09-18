import { Container, Wrapper } from "./style"
import Mapbox from "../Mapbox"
import Sidebar from "../Sidebar"





    

const MainContainer = () => {

    return(
        <Container>
            <Wrapper>
                <div className="map-container">
                    <Mapbox />
                </div>
                <div className="sidebar-container">
                    <Sidebar/>
                </div>
            </Wrapper>
        </Container>
    )
}

export default MainContainer