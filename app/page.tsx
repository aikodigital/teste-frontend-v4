"use client";

import dynamic from "next/dynamic";
const EquipmentMap = dynamic(() => import("../components/Map"), {
    ssr: false,
});

export default function Home() {
    return (
        <div style={{ height: "100vh", position: "relative" }}>
            <EquipmentMap />
        </div>
    );
}