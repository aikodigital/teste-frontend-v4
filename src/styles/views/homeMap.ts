import { montserrat } from "@/app/fonts/fonts";
import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  width: 60vw;
  background-color: #ececf6;
  margin-top: 3rem;
  border-radius: 1rem;
  position: relative;
`;

export const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export const Tooltip = styled.div`
  position: absolute;
  background: #fff;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
  display: none;
  pointer-events: none;
  color: black;
  width: 15rem;
  font-family: ${montserrat.style.fontFamily};
`;

export const ResetButton = styled.button`
  position: absolute;
  padding: 10px 20px;
  background-color: ${({ disabled }) => (disabled ? "#cccccc" : "#007bff")};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  bottom: 1rem;
  font-family: ${montserrat.style.fontFamily};
`;
