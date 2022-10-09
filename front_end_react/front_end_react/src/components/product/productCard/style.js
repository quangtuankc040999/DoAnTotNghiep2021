import styled from 'styled-components';
export const ProductContainer = styled.div`
  margin: 0 auto;
  font-weight: 300;
  text-transform: uppercase;
  height: 450px;
  width: 350px;
  margin-bottom: 50px;
  position: relative;
  background-color: #fffafa;
  &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 6px -1px rgba(2, 2, 2, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`
export const ProductDetail = styled.div`
  height: 100%;
`
export const ProductInfor = styled.div`
  margin-top: 10px;
`
export const H6 = styled.h6`
  color: #a5a5a5;
  opacity: 0.9;
  font-size: 0.7em;
  text-align: center;
  margin: 10px;
`
export const H3 = styled.h3`
  font-weight: 600;
  color: #000000;
  font-size: 17px;
  text-align: center;
  cursor: pointer;
`
export const H4 = styled.h4`
  font-weight: 700;
  font-size: 1.1em;
  margin: 10px;
`
export const ProductPrice = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  margin: 0 auto;
`
export const Discount = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
`
export const OldPrice = styled.span`
  text-decoration: line-through;
  font-size:1em;
  opacity: 0.5;
  font-weight: lighter !important;
`
export const DiscountPersent = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
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
export const Span = styled.span`
  margin: auto; 
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
export const Image = styled.div`
  position: relative;
`