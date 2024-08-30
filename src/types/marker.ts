export interface IMarker { 
  equipmentId: string;
  lat: number;
  lng: number;
  name: string;
  icon: 'truck' | 'backhoe' | 'tractor'
  currentState: {
    date: string
    name: string
    id: string
    color: string
  }
 }