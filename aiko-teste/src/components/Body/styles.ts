import styled from "styled-components";
import { colors } from "../../styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  font-weight: bold; 
  color: ${colors.green}
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

    input[type="checkbox"] {
        margin: 5px;
        width: 15px;
        height: 15px;
        cursor: pointer;
        accent-color: ${colors.lightgreen}; 

        &:checked {
        background-color: ${colors.darkgreen}; 
        border-color: ${colors.darkgreen}; 
        }
    }

  label {
    margin: 10px;
  }
`;