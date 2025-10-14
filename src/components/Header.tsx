// import { MapContainer, TileLayer, useMap } from 'react-leaflet'
// import aikoImg from "../../img/aiko.png"

export default function Header() {
  return (
    <>
        <div>
            <img src="../../img/aiko.png" alt="aiko" />
            <h2>criar filtros Header</h2>
            <select name="modelo" id="modelo">
                <option value="CA-0001">CA-0001</option>
                <option value="CA-0002">CA-0002</option>
                <option value="CA-0003">CA-0003</option>
                <option value="CA-0004">CA-0004</option>
            </select>
            <input type="date" name="date" id="date" />
            <select name="estado" id="estado">
                <option value="parado">parado</option>
                <option value="operando">operando</option>
                <option value="manutencao">manutencao</option>
            </select>
            <button>FILTER</button>
        </div>
    </>
  )
}
