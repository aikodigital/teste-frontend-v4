import styled from "styled-components";

export const SidebarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    

    
    .filters{
        display: flex;
        flex-direction: column;
        width: 100%;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 20px;
        background-color: aliceblue;

        .search{

            margin-bottom: 16px;

            input{
                font-size: 1em;
                padding: 4px;
                border-radius: 4px;
                border:solid 1px grey;
                width: 100%;
            }

        }

        .filters-wrapper{

            display: flex;
            justify-content: space-between;

            .status-filter, .model-filter{
                display: flex;
                flex-direction: column;
                width: 45%;
            }
    
            
            select{
                padding: 4px;
                border-radius: 4px;
                border:solid 1px grey;
            }

        }


    }

`


export const ListItem = styled.li`
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: -5px 5px 15px rgb(0,0,0,0.1) ;
    border-radius: 16px;


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
        }
        
        .list-model{
            margin-bottom: 8px;
        }
    }


`