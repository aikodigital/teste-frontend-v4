'use client';
import { Marker, Popup } from "react-leaflet";

export default function CustomMarker({ position, popupText }: any) {
    return (
        <Marker position={position}>
            <Popup>{popupText}</Popup>
        </Marker>
    )
}