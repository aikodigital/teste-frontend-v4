import styled from "styled-components";

export const FormBody = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    box-sizing: border-box; 
    height: auto;
    div {
        width: 100%; 
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        
        @media (min-width: 390px) {
            width: 60%;
        }
    }
    
    select {
        width: 100%;
        max-width: 200px;
        height: 30px;
        border-radius: 4px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .input-group {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 300px;
    }

    .input-group label {
        font-weight: bold;
        margin-bottom: 4px;
    }

    .input-group input {
        padding: 6px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        &::placeholder {
            color: #999;
        }
    }
`;
