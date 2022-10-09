import styled from 'styled-components';
export const ProductListContainer = styled.div`
    display: grid;
    margin: 0 auto;
    grid-template: 1fr / 1fr 1fr 1fr;
    grid-gap: 50px;
    grid-row-gap: 80px; 
    width: 80%;
`
export const Empty = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60vw
`
export const Img = styled.img`
    height: 200px;
    width: 200px;
`
  