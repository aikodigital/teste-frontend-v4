import { Icon, Point } from 'leaflet'

import iconToolMaintaining from '@assets/iconToolMaintaining.svg'
import iconToolStopped from '@assets/iconToolStopped.svg'
import iconToolWorking from '@assets/iconToolWorking.svg'

import iconTreeMaintaining from '@assets/iconTreeMaintaining.svg'
import iconTreeStopped from '@assets/iconTreeStopped.svg'
import iconTreeWorking from '@assets/iconTreeWorking.svg'

import iconTruckMaintaining from '@assets/iconTruckMaintaining.svg'
import iconTruckStopped from '@assets/iconTruckStopped.svg'
import iconTruckWorking from '@assets/iconTruckWorking.svg'

export const ToolMaintainingIcon = new Icon({
  iconUrl: iconToolMaintaining,
  iconSize: new Point(24, 24)
})
export const ToolWorkingIcon = new Icon({
  iconUrl: iconToolWorking,
  iconSize: new Point(24, 24)
})
export const ToolStoppedIcon = new Icon({
  iconUrl: iconToolStopped,
  iconSize: new Point(24, 24)
})

export const TreeMaintainingIcon = new Icon({
  iconUrl: iconTreeMaintaining,
  iconSize: new Point(24, 24)
})
export const TreeStoppedIcon = new Icon({
  iconUrl: iconTreeStopped,
  iconSize: new Point(24, 24)
})
export const TreeWorkingIcon = new Icon({
  iconUrl: iconTreeWorking,
  iconSize: new Point(24, 24)
})

export const TruckMaintainingIcon = new Icon({
  iconUrl: iconTruckMaintaining,
  iconSize: new Point(24, 24)
})
export const TruckStoppedIcon = new Icon({
  iconUrl: iconTruckStopped,
  iconSize: new Point(24, 24)
})
export const TruckWorkingIcon = new Icon({
  iconUrl: iconTruckWorking,
  iconSize: new Point(24, 24)
})
