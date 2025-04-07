import { CircleMarker, Popup, Tooltip } from 'react-leaflet';
import StateHistoryTable from './StateHistoryTable';

export default function CustomMarker({
  lastPosition,
  lastState,
  stateHistory,
}) {
  const textColors = {
    "#2ecc71": "text-[#2ecc71]",
    "#f1c40f": "text-[#f1c40f]",
    "#e74c3c": "text-[#e74c3c]",
  }

  return (
    <CircleMarker
      center={[lastPosition.lastLat, lastPosition.lastLon]}
      color={lastState.color}
      fillColor={lastState.color}
      radius={20}
    >
      <Tooltip
        sticky
        className="text-lg"
      >
        <span className={textColors[lastState.color]}>{lastState.name}</span>
      </Tooltip>

      <Popup
        maxHeight={300}
        minWidth={350}
        className="text-lg"
      >
        <StateHistoryTable
          stateHistory={stateHistory}
          textColors={textColors}
        />
      </Popup>
    </CircleMarker>
  )
}