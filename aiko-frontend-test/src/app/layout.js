'use client';
import "./globals.css";
import { Provider } from 'react-redux';
import { store } from '../../store/makeStore';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
