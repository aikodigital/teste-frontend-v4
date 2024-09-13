import { montserrat } from "@/app/fonts/fonts";
import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60vw;
  background-color: #ececf6;
  margin-top: 3rem;
  border-radius: 1rem;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  font-family: ${montserrat.style.fontFamily};
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
  flex: 1;

  select {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: white;
    background-color: #1d4692;
    font-family: ${montserrat.style.fontFamily};
    flex: 1;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 1rem;
  flex: 1;

  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    max-width: 400px;
    font-family: ${montserrat.style.fontFamily};
    color: white;
    background-color: #1d4692;

    &::placeholder {
      color: white;
    }
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 1rem;
`;

export const EquipList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-height: 60vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #888 #ececf6;
  font-family: ${montserrat.style.fontFamily};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #ececf6;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 2px solid #ececf6;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

export const EquipItem = styled.li`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

export const EquipName = styled.span`
  font-weight: bold;
  color: #555;
`;

export const EquipDetails = styled.div`
  font-size: 0.9rem;
  color: #777;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

export const HistorySection = styled.div`
  margin-top: 1rem;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  border: 1px solid #ddd;
  scrollbar-width: thin;
  scrollbar-color: #888 #f9f9f9;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f9f9f9;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 2px solid #f9f9f9;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

export const HistoryItem = styled.div`
  font-size: 0.9rem;
  color: #555;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  font-family: ${montserrat.style.fontFamily};

  span {
    display: block;
    margin-bottom: 0.25rem;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const HistoryDivider = styled.div`
  height: 1px;
  background-color: #ddd;
  margin: 1rem 0;
`;
