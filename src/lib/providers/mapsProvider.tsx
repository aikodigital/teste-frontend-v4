'use client'
import { APIProvider } from '@vis.gl/react-google-maps';

export default function MapsProvider({ children }: any) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      {children}
    </APIProvider>
  )
}