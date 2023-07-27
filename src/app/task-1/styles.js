
import styled from 'styled-components';


export const Container = styled.div`
    height: 100vh;
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: center;
    
    font-family: 'Nunito Sans', sans-serif;
`;

export const ListContainer = styled.div`

    justify-content: center;
    display: flex;
    margin-top: 3rem;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #F2F2F3;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    justify-content: space-around;
    margin: 8rem;
    padding: 1em;
    width: 70%;


    @media screen and (max-width: 768px) {
        width: 100%;
        margin: 1rem;
        padding: 0;
    }

`;

export const BearerColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:flex-start;  
    border-radius: 5px;
    margin: 0.5em;
    width: 32rem;
`;


export const InnerCard = styled.div`
    color:#6A757A;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin: 1rem;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    height: 700px;
`;

export const CustomUnorderList = styled.div`
    color: #273339;
    
`;

export const Text = styled.li`
    margin: 1rem 1rem 0 1rem;
    font-size: 1rem;
`;

export const TextGrey = styled.div`
    color: #6A757A;
    margin: 2rem;
    font-size:1rem

`;