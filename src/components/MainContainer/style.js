import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 8px;

`

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    height: 100%;


    .map-container{
        height: 100%;
        border-radius: 16px;
        overflow: hidden;
    }

    .sidebar-container{
        overflow-y: scroll;
    }

`