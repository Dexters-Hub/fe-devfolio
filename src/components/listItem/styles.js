import styled from "styled-components";

export const ListContainer = styled.div`

    justify-content: center;
    display: flex;
    margin-top: 3rem;
`;

export const BearerColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:flex-start;  
    border-radius: 5px;
    margin: 0.5em;
    width: 32rem;
`;

export const Placeholder = styled.div`
  position: absolute;
  width: 100%;
  height: 54px;
  border: 2px dashed #aaa;
  pointer-events: none;
  box-sizing: border-box;
`;