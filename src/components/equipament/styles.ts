import styled from "styled-components";

export const EquipmentContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative; /* Necessário para posicionar elementos absolutos dentro do contêiner */
`;

export const EquipmentTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const EquipmentModel = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1rem;

  strong {
    color: #333;
  }
`;

export const EarningsTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const EarningsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const EarningsItem = styled.li`
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;

  strong {
    color: #333;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StateColor = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const LastState = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

export const LastPosition = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;