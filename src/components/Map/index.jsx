import "./styles.css"
import { useState } from "react"
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet"

import markerIconImage from "../../img/markerIcon.png"
import useEquipments from "../../hooks/useEquipments"

function Map() {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const {equipmentsToShow, getEquipmentDetails, getStateByEquipmentStateById, formatEquipmentDate} = useEquipments()

  const customIcon = new Icon({
    iconUrl: markerIconImage,
    iconSize: [38, 38],
  })

  return (
    <MapContainer
      center={[-15.793889, -47.882778]}
      zoom={7}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {equipmentsToShow.map((equip) => {
        const {model, selectedState, historyState } = getEquipmentDetails(equip)

        return (
          <Marker
            key={equip.id}
            position={[equip.positions.lat, equip.positions.lon]}
            icon={customIcon}
          >
            <Popup>
              <div className="popup-container">
                Equipamento: {model.name}
                <br />
                Nome: {equip.name}
                {selectedState && (
                  <div style={{ color: selectedState.color }}>
                    Estado: {selectedState.name}
                  </div>
                )}
              </div>
              <div className="modal-container">
                <Button variant="contained" onClick={handleOpen}>
                  Ver Histórico
                </Button>

                {isOpen && (
                  <Dialog
                    open={handleOpen}
                    onClose={handleClose}
                    scroll="paper"
                  >
                    <DialogTitle>
                      {model.name} {equip.name}
                    </DialogTitle>

                    <DialogContent>
                      {historyState[0].states.map((e, index) => {
                        const selectedDialogState = getStateByEquipmentStateById(e.equipmentStateId)
                        const dataFormatada = formatEquipmentDate(e.date)

                        return (
                          <div key={index}>
                            {dataFormatada} - {" "}
                            <span style={{ color: selectedDialogState.color }}>
                              {selectedDialogState?.name}
                            </span>
                          </div>
                        )
                      })}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Fechar</Button>
                    </DialogActions>
                  </Dialog>
                )}
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

export default Map
