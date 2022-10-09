import styled from 'styled-components';

export const ProductInfor = styled.div`
  margin: 10px 20px;
`
export const Category = styled.div`
color: grey;
font-size: 1.2em;
`
export const Title = styled.div`
color: rgb(221,153,51);
font-size: 2.1em;
font-weight: 700;
`
export const ProductPrice = styled.div`
  font-weight: 600;
  color: #000000;
  font-size: 25px;
  margin-top: 10px;
`
export const Discount = styled.div`
  display: flex;
  flex-direction: row;

`
export const OldPrice = styled.span`
  text-decoration: line-through;
  font-size:0.8em;
  opacity: 0.5;
  font-weight: lighter !important;
  margin: 0.3em 0;

`
export const DiscountPersent = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  font-size:0.7em;
  padding: 0.2em 0.3em;
  background-color: rgb(198,40,40);
  border-radius: 5px;
  color: white;
  margin: 0.3em 0.5em;

`
export const OutOfStock = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  color: white;
  font-weight: 700;
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 100;
  background-color: rgba(56, 51, 51, 0.3);
`
export const P = styled.p`
  color: rgb(138,62,62)
`
export const DescriptionTitle = styled.span`
  color: rgb(84,170,246)
`
export const Description = styled.span`
color: black;
text-transform: capitalize;
`

export const ActionBuy = styled.div`
`