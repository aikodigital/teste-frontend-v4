import "@/styles/globals.css"



import { Sidebar } from "@/components/sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
    
        <Sidebar/>
        {children}
      </body>
    </html>
  );
}
