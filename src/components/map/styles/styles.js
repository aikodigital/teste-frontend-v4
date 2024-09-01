import styled from "styled-components";

export const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh; 
    margin-top: 50px;
    
    @media (max-width: 390px) {
        height: 80vh;
    }
`;

export const MapWrapper = styled.div`
    width: 100%;
    max-width: 1000px;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;
