import styled, { createGlobalStyle } from 'styled-components'

const EstiloGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
  }
`
export const Container = styled.div`
  display: grid;
  grid-template-columns: 224px auto;
  grid-template-rows: auto auto;
  background-color: #f0663e;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const ChartsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin: 1px 5px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    margin: 0;
    padding: 10px;
    width: 100%;
  }
`
export const ChartCard = styled.div`
  flex: 1;
  background-color: #eee;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`
export const ChartWrapper = styled.div`
  width: 100%;
  max-height: 100%;
`

export default EstiloGlobal
