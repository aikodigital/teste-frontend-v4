import styled from "styled-components";
import { colors } from "../../styles";

export const Container = styled.div`
    background-color: ${colors.darkgreen};
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 50px;
    height: 100px;

    img {
        height: 80px;
    }
`