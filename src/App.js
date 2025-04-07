import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header";
import EquipmentList from "./components/EquipmentList";
import { Equipments } from './context/EquipmentContext'

function App() {
    return (
        <Equipments>
            <Router>
                <Header />
                <div className="container">
                    <Routes>
                        <Route exact path='/' element= {
                            <>
                                <EquipmentList/>
                            </>
                        }>
                        </Route>
                    </Routes>
                </div>
            </Router>
        </Equipments>
    )
}

export default App;