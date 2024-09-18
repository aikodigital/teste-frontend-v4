import styled from "styled-components";


export const ListItem = styled.li`
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: -5px 5px 15px rgb(0,0,0,0.1) ;
    border-radius: 16px;

    .list-item-wrapper{
        display: flex;
        justify-content: space-between;

        .eq-infos{
            display: flex;
            flex-direction: column;
            width: auto;
    
            p{
                display: inline-block;
                align-self: flex-start;
                width: auto;
            }
    
            .list-status{
                padding: 4px;
                color: white;
                border-radius: 4px;
            }
    
            .list-name{
                font-size: 1.3em;
                font-weight: bold;
                cursor: pointer;

            }
            
            .list-model{
                margin-bottom: 8px;
            }

            
        }
        
        .btns{
            display: flex;
            flex-direction: column;
        }

        button{
            display: inline-block;
            align-self: flex-end;

            border: solid 1px grey;
            background-color: transparent;
            padding: 4px;
            border-radius: 4px;
            cursor:pointer;
            margin-bottom: 8px;

            transition: 200ms;

            &:hover{
                background-color: grey;
                color: white;
            }
        }
    }



`


export const History = styled.div`

    padding: 8px;
    background-color: aliceblue;
    border-radius: 8px;
    margin-top: 20px;

    max-height: 300px;
    overflow-y: scroll;

    li{
        display: flex;
        justify-content: space-between;
        padding-bottom: 4px;
        margin-bottom: 8px;
        border-bottom: solid 1px grey;

        p:last-child{
            color: white;
        }
    }
`