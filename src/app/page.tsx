"use client";

import NavBar from "@/app/components/NavBar";
import Map from "./components/Map";

export default function Home() {
  return (
    <>
      <div>
        <NavBar />
        <Map />
      </div>
      <footer
        className="bg-dark"
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: "40px",
          textAlign: "center",
          color: "white",
          zIndex: 1000,
        }}
      >
        <div style={{ marginTop: "10px" }}>
          <p>Aiko © 2025</p>
        </div>
      </footer>
    </>
  );
}
