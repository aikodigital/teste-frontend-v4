import React from "react";
import { Header, Map } from "@/components";

export default function Home() {
  const coords = { lat: -22.643817607474194, lng: -54.83826654568867 }

  return (
    <div className="w-full h-full min-h-screen">
      <Header />
      <main className="w-full h-full">
        <Map coords={coords} />
      </main>
    </div>
  );
}
