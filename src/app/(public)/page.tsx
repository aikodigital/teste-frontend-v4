"use client";

import ResponsiveAppBar from "@/components/topbar";
import HomeMap from "@/components/views/map";
import { MainContainer } from "@/styles/home";

export default function Home() {
  return (
    <MainContainer>
      <ResponsiveAppBar />
      <HomeMap />
    </MainContainer>
  );
}
