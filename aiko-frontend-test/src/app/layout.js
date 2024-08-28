'use client';
import "./globals.css";
import { Provider } from 'react-redux';
import { store } from '../../store/makeStore';
import EquipmentsProvider from "./context/equipmentsContext";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <EquipmentsProvider>
            {children}
          </EquipmentsProvider>
        </Provider>
      </body>
    </html>
  );
}
